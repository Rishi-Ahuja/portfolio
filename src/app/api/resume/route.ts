import { NextResponse } from "next/server";
import { resumeData } from "@/lib/resumeData";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, data: resumeData });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "parse error" }, { status: 500 });
  }
}


