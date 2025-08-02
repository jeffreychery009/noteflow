import { NextRequest, NextResponse } from "next/server";

import { auth } from "../../../../auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, role = "user", conversationId } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Get AI token from session or request
    const aiToken = request.headers.get("x-ai-token");

    if (!aiToken) {
      return NextResponse.json({ error: "AI token required" }, { status: 401 });
    }

    console.log(
      "Sending chat message with token:",
      aiToken ? `${aiToken.slice(0, 10)}...` : "null"
    );
    console.log("Chat request body:", { content, role, conversationId });

    const response = await fetch(
      "https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aiToken}`,
        },
        body: JSON.stringify({ content, role, conversationId }),
      }
    );

    console.log("Chat response status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Chat API error:", errorText);

      // Return the actual error from the external service
      return NextResponse.json(
        {
          error: `AI service error: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send message to AI service",
      },
      { status: 500 }
    );
  }
}
