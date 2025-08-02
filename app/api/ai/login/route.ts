import { NextRequest, NextResponse } from "next/server";

import { auth } from "../../../../auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Requesting AI token for user:", session.user.id);

    const response = await fetch(
      "https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: session.user.id }),
      }
    );

    console.log("Login response status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login API error:", errorText);
      throw new Error(
        `AI service login failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Login response data:", {
      access_token: data.access_token
        ? `${data.access_token.slice(0, 10)}...`
        : "null",
    });
    const { access_token } = data;

    return NextResponse.json({ access_token });
  } catch (error) {
    console.error("AI login error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate with AI service" },
      { status: 500 }
    );
  }
}
