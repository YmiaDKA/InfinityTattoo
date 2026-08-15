import { NextResponse } from "next/server";
import { z } from "zod";

import { createReferenceUpload } from "@/lib/booking-server";

export const runtime = "nodejs";
export const maxDuration = 15;

const uploadSchema = z.object({
  draftId: z.string().uuid(),
  fileName: z.string().trim().min(1).max(160),
  contentType: z.string().regex(/^image\/[a-zA-Z0-9.+-]+$/),
  size: z.number().int().positive().max(8 * 1024 * 1024),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = uploadSchema.parse(body);
    const upload = await createReferenceUpload(
      input.draftId,
      input.fileName,
      input.contentType
    );

    return NextResponse.json(upload, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid reference image." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Reference image uploads are not configured yet." },
      { status: 503 }
    );
  }
}
