import { NextResponse } from "next/server";

import { RequestError } from "./http-errors";

export async function handleError(error: unknown) {
  console.error(error);

  if (error instanceof RequestError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          details: error.errors || {},
        },
      },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        message: "Internal Server Error",
      },
    },
    { status: 500 }
  );
}
