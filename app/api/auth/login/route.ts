import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const users = [
  {
    id: "1",
    name: "Super Admin",
    email: "super@almawaddah.sch.id",
    password: "admin123",
    role: "super_admin",
  },
  {
    id: "2",
    name: "Admin Koperasi",
    email: "admin@almawaddah.sch.id",
    password: "admin123",
    role: "admin_koperasi",
  },
  {
    id: "3",
    name: "Operator Laundry",
    email: "laundry@almawaddah.sch.id",
    password: "admin123",
    role: "operator_laundry",
  },
  {
    id: "4",
    name: "Petugas Gudang",
    email: "gudang@almawaddah.sch.id",
    password: "admin123",
    role: "petugas_gudang",
  },
  {
    id: "5",
    name: "Bendahara",
    email: "bendahara@almawaddah.sch.id",
    password: "admin123",
    role: "bendahara",
  },
  {
    id: "6",
    name: "Pimpinan",
    email: "pimpinan@almawaddah.sch.id",
    password: "admin123",
    role: "pimpinan",
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email, role: user.role, name: user.name })).toString("base64");

    return NextResponse.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}