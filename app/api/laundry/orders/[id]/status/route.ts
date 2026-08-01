import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const statusSchema = z.object({
  status: z.string(),
  keterangan: z.string().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { status, keterangan } = parsed.data;

    return NextResponse.json({
      message: "Status laundry berhasil diperbarui",
      order: {
        id,
        kode_order: `LDR-2026-000001`,
        status,
        keterangan,
        updated_at: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}