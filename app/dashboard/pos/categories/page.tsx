"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function POSCategoriesPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "name", header: "Nama Kategori" },
    { accessorKey: "description", header: "Deskripsi" },
    { accessorKey: "is_active", header: "Status" },
  ];

  const data = [
    { name: "Makanan & Minuman", description: "Kategori makanan dan minuman", is_active: "Aktif" },
    { name: "Alat Tulis", description: "Kategori alat tulis", is_active: "Aktif" },
    { name: "Kebersihan", description: "Kategori produk kebersihan", is_active: "Aktif" },
    { name: "Lainnya", description: "Kategori lainnya", is_active: "Aktif" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Kategori Produk</h1>
        <Button>Tambah Kategori</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari kategori..."
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