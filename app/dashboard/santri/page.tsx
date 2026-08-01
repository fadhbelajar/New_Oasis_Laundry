"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SantriPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "nis", header: "NIS" },
    { accessorKey: "nama", header: "Nama" },
    { accessorKey: "kamar", header: "Kamar" },
    { accessorKey: "asrama", header: "Asrama" },
    { accessorKey: "saldo", header: "Saldo" },
    { accessorKey: "is_active", header: "Status" },
  ];

  const data = [
    { nis: "SANTRI-001", nama: "Aisyah Rahmah", kamar: "Kamar 1", asrama: "Asrama Putri A", saldo: "Rp 500.000", is_active: "Aktif" },
    { nis: "SANTRI-002", nama: "Khadijah Zahra", kamar: "Kamar 2", asrama: "Asrama Putri A", saldo: "Rp 350.000", is_active: "Aktif" },
    { nis: "SANTRI-003", nama: "Hafshah Nabila", kamar: "Kamar 3", asrama: "Asrama Putri B", saldo: "Rp 200.000", is_active: "Aktif" },
    { nis: "SANTRI-004", nama: "Maryam Salsabila", kamar: "Kamar 4", asrama: "Asrama Putri B", saldo: "Rp 150.000", is_active: "Aktif" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Data Santri</h1>
        <Button>Tambah Santri</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari santri..."
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