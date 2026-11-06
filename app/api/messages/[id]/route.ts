import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { isAuthed } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json().catch(() => ({}));
    const update: any = {};
    if (typeof body.read === "boolean") update.read = body.read;
    const msg = await Message.findByIdAndUpdate(params.id, update, { new: true });
    if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(msg);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const msg = await Message.findByIdAndDelete(params.id);
    if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}