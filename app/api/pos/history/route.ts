import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search") || "";

  const data = [
    { id: "1", kode_produk: "PRD-001", barcode: "8990000000001", nama_produk: "Air Mineral 600ml", kategori: "Makanan & Minuman", satuan: "pcs", harga_beli: 2000, harga_jual: 3000, stok: 100, stok_minimum: 10, foto: null, status_aktif: true },
    { id: "2", kode_produk: "PRD-002", barcode: "8990000000002", nama_produk: "Roti Premium", kategori: "Makanan & Minuman", satuan: "pcs", harga_beli: 3500, harga_jual: 5000, stok: 50, stok_minimum: 5, foto: null, status_aktif: true },
    { id: "3", kode_produk: "PRD-003", barcode: "8990000000003", nama_produk: "Buku Tulis A5", kategori: "Alat Tulis", satuan: "pcs", harga_beli: 5000, harga_jual: 7500, stok: 75, stok_minimum: 10, foto: null, status_aktif: true },
    { id: "4", kode_produk: "PRD-004", barcode: "8990000000004", nama_produk: "Pulpen Hitam", kategori: "Alat Tulis", satuan: "pcs", harga_beli: 1500, harga_jual: 2500, stok: 200, stok_minimum: 20, foto: null, status_aktif: true },
    { id: "5", kode_produk: "PRD-005", barcode: "8990000000005", nama_produk: "Sabun Mandi", kategori: "Kebersihan", satuan: "pcs", harga_beli: 3000, harga_jual: 4500, stok: 80, stok_minimum: 10, foto: null, status_aktif: true },
    { id: "6", kode_produk: "PRD-006", barcode: "8990000000006", nama_produk: "Pasta Gigi", kategori: "Kebersihan", satuan: "pcs", harga_beli: 4000, harga_jual: 5500, stok: 60, stok_minimum: 10, foto: null, status_aktif: true },
  ];

  const filtered = search
    ? data.filter(
        (item) =>
          item.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
          item.kode_produk.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    data: paginated,
    pagination: {
      page,
      pageSize,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / pageSize),
    },
  });
}