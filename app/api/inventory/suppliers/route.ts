import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = [
    { id: "1", nama: "CV Indo Makmur", alamat: "Jl. Merdeka No. 10", no_hp: "081234567890", email: "info@indomakmur.co.id", keterangan: "Supplier utama", is_active: true },
    { id: "2", nama: "Toko Abadi", alamat: "Jl. Pasar No. 5", no_hp: "081234567891", email: "tokoabadi@example.com", keterangan: "Supplier alat tulis", is_active: true },
    { id: "3", nama: "Distributor Sejahtera", alamat: "Jl. Industri No. 20", no_hp: "081234567892", email: "sales@distributor-sejahtera.co.id", keterangan: "Supplier deterjen", is_active: true },
  ];

  return NextResponse.json({ data, total: data.length });
}