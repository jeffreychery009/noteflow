import { useSession } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";

import {
  AIMessage,
  AIConversation,
  getStoredAIToken,
  storeAIToken,
} from "../lib/utils/ai-utils";

export function useAIChat() {
  const { data: session } = useSession();
  const [aiToken, setAiToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get AI token after successful OAuth login
  const getAIToken = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/ai/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get AI token");
      }

      const data = await response.json();
      console.log("Login successful, token received");

      const { access_token } = data;
      setAiToken(access_token);

      // Store token in localStorage for persistence
      storeAIToken(access_token);

      return access_token;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to authenticate with AI service"
      );
      console.error("AI token error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  // Create new conversation
  const createNewConversation = useCallback(() => {
    setMessages([]);
    setCurrentConversationId(null);
    setError(null);
  }, []);

  // Load conversation from history
  const loadConversation = useCallback(
    async (conversationId: string) => {
      console.log("Loading conversation:", conversationId);

      if (!aiToken) {
        console.log("No AI token available");
        setError("No AI token available");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // First try to get messages from the conversation object
        const conversation = conversations.find(
          (conv) => conv.id === conversationId
        );

        if (
          conversation &&
          conversation.messages &&
          conversation.messages.length > 0
        ) {
          console.log("Loading messages from conversation object");
          setMessages(conversation.messages);
          setCurrentConversationId(conversationId);
          return;
        }

        // If no messages in conversation object, fetch from API
        console.log("Fetching messages from API");
        const response = await fetch(
          `/api/ai/conversations/${conversationId}/messages`,
          {
            headers: { "x-ai-token": aiToken },
          }
        );

        if (!response.ok) {
          // If unauthorized, try to refresh the token
          if (response.status === 401) {
            console.log("Token expired, refreshing...");
            const newToken = await getAIToken();
            if (newToken) {
              const retryResponse = await fetch(
                `/api/ai/conversations/${conversationId}/messages`,
                {
                  headers: { "x-ai-token": newToken },
                }
              );

              if (!retryResponse.ok) {
                const errorData = await retryResponse.json().catch(() => ({}));
                throw new Error(
                  errorData.error ||
                    "Failed to load conversation after token refresh"
                );
              }

              const data = await retryResponse.json();
              const messages = data.messages || data || [];
              setMessages(messages);
              setCurrentConversationId(conversationId);
              return;
            }
          }

          // If 404, the messages endpoint doesn't exist, so we'll use the conversation object
          if (response.status === 404) {
            console.log(
              "Messages endpoint not found, using conversation object"
            );
            if (conversation) {
              const messages =
                conversation.messages ||
                (conversation as any).chat_messages ||
                [];
              setMessages(messages);
              setCurrentConversationId(conversationId);
              return;
            } else {
              setMessages([]);
              setCurrentConversationId(conversationId);
              return;
            }
          }

          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to load conversation");
        }

        const data = await response.json();
        const messages = data.messages || data || [];
        console.log("Loaded messages:", messages);

        setMessages(messages);
        setCurrentConversationId(conversationId);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load conversation";
        setError(errorMessage);
        console.error("Load conversation error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [conversations, aiToken, getAIToken]
  );

  // Send chat message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !aiToken) return;

      const userMessage: AIMessage = {
        id: Date.now().toString(),
        content: content.trim(),
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-ai-token": aiToken,
          },
          body: JSON.stringify({
            content: content.trim(),
            role: "user",
            conversationId: currentConversationId,
          }),
        });

        if (!response.ok) {
          // If unauthorized, try to refresh the token
          if (response.status === 401) {
            console.log("Token expired, refreshing...");
            const newToken = await getAIToken();
            if (newToken) {
              // Retry the request with new token
              const retryResponse = await fetch("/api/ai/chat", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-ai-token": newToken,
                },
                body: JSON.stringify({
                  content: content.trim(),
                  role: "user",
                  conversationId: currentConversationId,
                }),
              });

              if (!retryResponse.ok) {
                throw new Error("Failed to send message after token refresh");
              }

              const data = await retryResponse.json();
              const assistantMessage: AIMessage = {
                id: (Date.now() + 1).toString(),
                content:
                  data.response ||
                  data.content ||
                  "Sorry, I couldn't process your request.",
                role: "assistant",
                timestamp: new Date(),
              };

              setMessages((prev) => [...prev, assistantMessage]);

              if (!currentConversationId && data.conversationId) {
                setCurrentConversationId(data.conversationId);
              }
              return;
            }
          }
          throw new Error("Failed to send message");
        }

        const data = await response.json();

        const assistantMessage: AIMessage = {
          id: (Date.now() + 1).toString(),
          content:
            data.response ||
            data.content ||
            "Sorry, I couldn't process your request.",
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // If this is the first message in a new conversation, set the conversation ID
        if (!currentConversationId && data.conversationId) {
          setCurrentConversationId(data.conversationId);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message");
        console.error("Send message error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [aiToken, currentConversationId, getAIToken]
  );

  // Get conversations
  const fetchConversations = useCallback(async () => {
    if (!aiToken) {
      console.log("No AI token available, skipping conversation fetch");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log(
        "Fetching conversations with token:",
        `${aiToken.slice(0, 10)}...`
      );

      const response = await fetch("/api/ai/conversations", {
        headers: { "x-ai-token": aiToken },
      });

      console.log("Conversations response status:", response.status);

      if (!response.ok) {
        // If unauthorized, try to refresh the token
        if (response.status === 401) {
          console.log("Token expired, refreshing...");
          const newToken = await getAIToken();
          if (newToken) {
            // Retry the request with new token
            const retryResponse = await fetch("/api/ai/conversations", {
              headers: { "x-ai-token": newToken },
            });

            if (!retryResponse.ok) {
              const errorData = await retryResponse.json().catch(() => ({}));
              throw new Error(
                errorData.error ||
                  "Failed to fetch conversations after token refresh"
              );
            }

            let data;
            try {
              data = await retryResponse.json();
            } catch (parseError) {
              console.log("Retry response is not JSON, treating as empty");
              setConversations([]);
              return;
            }
            console.log("Fetched conversations:", data);

            // Handle different possible response structures
            let conversations = [];
            if (data && typeof data === "object") {
              if (Array.isArray(data)) {
                conversations = data;
              } else if (
                data.conversations &&
                Array.isArray(data.conversations)
              ) {
                conversations = data.conversations;
              } else if (data.chats && Array.isArray(data.chats)) {
                conversations = data.chats;
              } else {
                console.log("Unexpected response structure:", data);
                conversations = [];
              }
            }

            setConversations(conversations);
            return;
          }
        }

        // Handle other error status codes
        if (response.status === 404) {
          console.log("No conversations found (404)");
          setConversations([]);
          return;
        }

        // Get the actual error message from the response
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch conversations: ${response.status} ${response.statusText}`
        );
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.log("Response is not JSON, treating as empty");
        setConversations([]);
        return;
      }

      console.log("Fetched conversations:", data);

      // Handle different possible response structures
      let conversations = [];
      if (data && typeof data === "object") {
        if (Array.isArray(data)) {
          conversations = data;
        } else if (data.conversations && Array.isArray(data.conversations)) {
          conversations = data.conversations;
        } else if (data.chats && Array.isArray(data.chats)) {
          conversations = data.chats;
        } else {
          console.log("Unexpected response structure:", data);
          conversations = [];
        }
      }

      setConversations(conversations);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch conversations"
      );
      console.error("Fetch conversations error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [aiToken, getAIToken]);

  // Initialize AI token on mount
  useEffect(() => {
    if (session?.user?.id) {
      // Try to get token from localStorage first
      const storedToken = getStoredAIToken();
      if (storedToken) {
        console.log("Using stored token:", `${storedToken.slice(0, 10)}...`);
        setAiToken(storedToken);
      } else {
        console.log("No stored token, requesting new one...");
        getAIToken();
      }
    }
  }, [session?.user?.id, getAIToken]);

  // Fetch conversations when token is available
  useEffect(() => {
    if (aiToken && session?.user?.id) {
      console.log("Token available, fetching conversations...");
      // Add a small delay to ensure token is properly set
      setTimeout(() => {
        fetchConversations();
      }, 100);
    }
  }, [aiToken, fetchConversations, session?.user?.id]);

  return {
    messages,
    conversations,
    currentConversationId,
    isLoading,
    error,
    sendMessage,
    createNewConversation,
    loadConversation,
    fetchConversations,
    getAIToken,
    aiToken,
    refreshConversations: fetchConversations,
  };
}
