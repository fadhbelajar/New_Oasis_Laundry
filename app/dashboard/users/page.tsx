"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "is_active", header: "Status" },
  ];

  const data = [
    { name: "Super Admin", email: "super@almawaddah.sch.id", role: "Super Admin", is_active: "Aktif" },
    { name: "Admin Koperasi", email: "admin@almawaddah.sch.id", role: "Admin Koperasi", is_active: "Aktif" },
    { name: "Operator Laundry", email: "laundry@almawaddah.sch.id", role: "Operator Laundry", is_active: "Aktif" },
    { name: "Petugas Gudang", email: "gudang@almawaddah.sch.id", role: "Petugas Gudang", is_active: "Aktif" },
    { name: "Bendahara", email: "bendahara@almawaddah.sch.id", role: "Bendahara", is_active: "Aktif" },
    { name: "Pimpinan", email: "pimpinan@almawaddah.sch.id", role: "Pimpinan", is_active: "Aktif" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Manajemen Pengguna</h1>
        <Button>Tambah Pengguna</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari pengguna..."
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