"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function POSProductsPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "kode_produk", header: "Kode" },
    { accessorKey: "nama_produk", header: "Nama Produk" },
    { accessorKey: "kategori", header: "Kategori" },
    { accessorKey: "harga_jual", header: "Harga Jual" },
    { accessorKey: "stok", header: "Stok" },
    { accessorKey: "status_aktif", header: "Status" },
  ];

  const data = [
    { kode_produk: "PRD-001", nama_produk: "Air Mineral 600ml", kategori: "Makanan & Minuman", harga_jual: "Rp 3.000", stok: 100, status_aktif: "Aktif" },
    { kode_produk: "PRD-002", nama_produk: "Roti Premium", kategori: "Makanan & Minuman", harga_jual: "Rp 5.000", stok: 50, status_aktif: "Aktif" },
    { kode_produk: "PRD-003", nama_produk: "Buku Tulis A5", kategori: "Alat Tulis", harga_jual: "Rp 7.500", stok: 75, status_aktif: "Aktif" },
    { kode_produk: "PRD-004", nama_produk: "Pulpen Hitam", kategori: "Alat Tulis", harga_jual: "Rp 2.500", stok: 200, status_aktif: "Aktif" },
    { kode_produk: "PRD-005", nama_produk: "Sabun Mandi", kategori: "Kebersihan", harga_jual: "Rp 4.500", stok: 80, status_aktif: "Aktif" },
    { kode_produk: "PRD-006", nama_produk: "Pasta Gigi", kategori: "Kebersihan", harga_jual: "Rp 5.500", stok: 60, status_aktif: "Aktif" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Manajemen Produk</h1>
        <Button>Tambah Produk</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}