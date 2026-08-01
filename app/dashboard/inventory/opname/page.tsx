"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryOpnamePage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "produk", header: "Produk" },
    { accessorKey: "stok_sistem", header: "Stok Sistem" },
    { accessorKey: "stok_fisik", header: "Stok Fisik" },
    { accessorKey: "selisih", header: "Selisih" },
    { accessorKey: "status", header: "Status" },
  ];

  const data = [
    { tanggal: "2026-01-17", produk: "Air Mineral 600ml", stok_sistem: 100, stok_fisik: 98, selisih: -2, status: "Menunggu Approval" },
    { tanggal: "2026-01-17", produk: "Roti Premium", stok_sistem: 50, stok_fisik: 50, selisih: 0, status: "Disetujui" },
    { tanggal: "2026-01-16", produk: "Buku Tulis A5", stok_sistem: 75, stok_fisik: 77, selisih: 2, status: "Disetujui" },
    { tanggal: "2026-01-16", produk: "Pulpen Hitam", stok_sistem: 200, stok_fisik: 198, selisih: -2, status: "Menunggu Approval" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Stok Opname</h1>
        <Button>Mulai Opname</Button>
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