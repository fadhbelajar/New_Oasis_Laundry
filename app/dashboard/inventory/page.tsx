"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "kode_produk", header: "Kode" },
    { accessorKey: "nama_produk", header: "Nama Produk" },
    { accessorKey: "kategori", header: "Kategori" },
    { accessorKey: "stok", header: "Stok" },
    { accessorKey: "stok_minimum", header: "Stok Min" },
    { accessorKey: "status", header: "Status" },
  ];

  const data = [
    { kode_produk: "PRD-001", nama_produk: "Air Mineral 600ml", kategori: "Makanan & Minuman", stok: 100, stok_minimum: 10, status: "Tersedia" },
    { kode_produk: "PRD-002", nama_produk: "Roti Premium", kategori: "Makanan & Minuman", stok: 50, stok_minimum: 5, status: "Tersedia" },
    { kode_produk: "PRD-003", nama_produk: "Buku Tulis A5", kategori: "Alat Tulis", stok: 75, stok_minimum: 10, status: "Tersedia" },
    { kode_produk: "PRD-004", nama_produk: "Pulpen Hitam", kategori: "Alat Tulis", stok: 200, stok_minimum: 20, status: "Tersedia" },
    { kode_produk: "PRD-005", nama_produk: "Sabun Mandi", kategori: "Kebersihan", stok: 80, stok_minimum: 10, status: "Tersedia" },
    { kode_produk: "PRD-006", nama_produk: "Pasta Gigi", kategori: "Kebersihan", stok: 60, stok_minimum: 10, status: "Tersedia" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-600 font-poppins">Inventory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Produk</p>
            <p className="text-2xl font-bold text-navy-600">6</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Stok Menipis</p>
            <p className="text-2xl font-bold text-amber-600">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Stok Habis</p>
            <p className="text-2xl font-bold text-red-600">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Button variant="outline">Stok Habis</Button>
              <Button variant="outline">Stok Menipis</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}