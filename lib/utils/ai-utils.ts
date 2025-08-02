// AI utility functions

export const AI_ENDPOINTS = {
  LOGIN: "https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev/login",
  CHAT: "https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev/chat",
  CONVERSATIONS:
    "https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev/conversations",
} as const;

export interface AIMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp?: Date;
}

export interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: Date;
}

// Helper function to format conversation title from first message
export function generateConversationTitle(firstMessage: string): string {
  const words = firstMessage.split(" ").slice(0, 5);
  return words.join(" ") + (firstMessage.split(" ").length > 5 ? "..." : "");
}

// Helper function to validate AI token
export function isValidAIToken(token: string | null): boolean {
  return token !== null && token.length > 0;
}

// Helper function to get stored AI token
export function getStoredAIToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ai_jwt_token");
}

// Helper function to store AI token
export function storeAIToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("ai_jwt_token", token);
}

// Helper function to clear AI token
export function clearAIToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("ai_jwt_token");
}
