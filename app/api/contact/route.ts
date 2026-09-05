import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/schemas/contact";

export async function POST(req: Request) {
  try {
    const body = contactSchema.parse(await req.json());
    console.log("New estimate request:", body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof z.ZodError
        ? error.issues[0]?.message
        : "Something went wrong";
    return NextResponse.json(
      { error: message ?? "Something went wrong" },
      { status: 400 },
    );
  }
}
