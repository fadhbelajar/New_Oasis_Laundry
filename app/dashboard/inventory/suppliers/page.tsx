"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventorySuppliersPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "nama", header: "Nama Supplier" },
    { accessorKey: "alamat", header: "Alamat" },
    { accessorKey: "no_hp", header: "No. HP" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "is_active", header: "Status" },
  ];

  const data = [
    { nama: "CV Indo Makmur", alamat: "Jl. Merdeka No. 10", no_hp: "081234567890", email: "info@indomakmur.co.id", is_active: "Aktif" },
    { nama: "Toko Abadi", alamat: "Jl. Pasar No. 5", no_hp: "081234567891", email: "tokoabadi@example.com", is_active: "Aktif" },
    { nama: "Distributor Sejahtera", alamat: "Jl. Industri No. 20", no_hp: "081234567892", email: "sales@distributor-sejahtera.co.id", is_active: "Aktif" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Supplier</h1>
        <Button>Tambah Supplier</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari supplier..."
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