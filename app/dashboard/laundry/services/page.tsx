"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LaundryServicesPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "nama", header: "Nama Layanan" },
    { accessorKey: "tarif_per_kg", header: "Tarif/kg" },
    { accessorKey: "express_additional", header: "Tambahan Express" },
    { accessorKey: "is_active", header: "Status" },
  ];

  const data = [
    { nama: "Cuci Kering", tarif_per_kg: "Rp 5.000", express_additional: "Rp 0", is_active: "Aktif" },
    { nama: "Cuci Setrika", tarif_per_kg: "Rp 7.000", express_additional: "Rp 0", is_active: "Aktif" },
    { nama: "Setrika Saja", tarif_per_kg: "Rp 4.000", express_additional: "Rp 0", is_active: "Aktif" },
    { nama: "Express", tarif_per_kg: "Rp 0", express_additional: "Rp 3.000", is_active: "Aktif" },
    { nama: "Bedcover", tarif_per_kg: "Rp 15.000", express_additional: "Rp 5.000", is_active: "Aktif" },
    { nama: "Karpet", tarif_per_kg: "Rp 25.000", express_additional: "Rp 10.000", is_active: "Aktif" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Tarif Laundry</h1>
        <Button>Tambah Layanan</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari layanan..."
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