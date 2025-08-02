import { NextRequest, NextResponse } from "next/server";

import { auth } from "../../../../auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get AI token from request headers
    const aiToken = request.headers.get("x-ai-token");

    if (!aiToken) {
      return NextResponse.json({ error: "AI token required" }, { status: 401 });
    }

    console.log(
      "Fetching conversations with token:",
      aiToken ? `${aiToken.slice(0, 10)}...` : "null"
    );

    const response = await fetch(
      "https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev/conversations",
      {
        headers: {
          Authorization: `Bearer ${aiToken}`,
        },
      }
    );

    console.log(
      "Conversations response status:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Conversations API error:", errorText);

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
    console.error("Fetch conversations error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch conversations",
      },
      { status: 500 }
    );
  }
}
