import { NextRequest, NextResponse } from "next/server";

import { auth } from "../../../../../../auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const conversationId = params.id;
    const aiToken = request.headers.get("x-ai-token");

    if (!aiToken) {
      return NextResponse.json({ error: "AI token required" }, { status: 401 });
    }

    console.log("Fetching messages for conversation:", conversationId);

    // Try to fetch messages from the external AI service
    const response = await fetch(
      `https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev/conversations/${conversationId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${aiToken}`,
        },
      }
    );

    console.log(
      "Messages response status:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Messages API error:", errorText);

      // If the endpoint doesn't exist, return empty messages
      if (response.status === 404) {
        console.log("Messages endpoint not found, returning empty array");
        return NextResponse.json({ messages: [] });
      }

      return NextResponse.json(
        {
          error: `AI service error: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Fetched messages:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch messages error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch messages",
      },
      { status: 500 }
    );
  }
}
