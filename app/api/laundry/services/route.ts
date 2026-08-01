import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = [
    { id: "1", nama: "Cuci Kering", tarif_per_kg: 5000, tarif_potong: 0, express_additional: 0, deskripsi: "Layanan cuci kering standar", is_active: true },
    { id: "2", nama: "Cuci Setrika", tarif_per_kg: 7000, tarif_potong: 0, express_additional: 0, deskripsi: "Layanan cuci dan setrika", is_active: true },
    { id: "3", nama: "Setrika Saja", tarif_per_kg: 4000, tarif_potong: 0, express_additional: 0, deskripsi: "Layanan setrika saja", is_active: true },
    { id: "4", nama: "Express", tarif_per_kg: 0, tarif_potong: 0, express_additional: 3000, deskripsi: "Tambahan biaya express per kg", is_active: true },
    { id: "5", nama: "Bedcover", tarif_per_kg: 15000, tarif_potong: 0, express_additional: 5000, deskripsi: "Tarif khusus bedcover", is_active: true },
    { id: "6", nama: "Karpet", tarif_per_kg: 25000, tarif_potong: 0, express_additional: 10000, deskripsi: "Tarif khusus karpet", is_active: true },
  ];

  return NextResponse.json({ data, total: data.length });
}