import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const messages = await Message.find({}).sort({ createdAt: -1 });
  return NextResponse.json(messages);
}
