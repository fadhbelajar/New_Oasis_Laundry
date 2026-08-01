"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate save
      setTimeout(() => {
        setIsSaving(false);
        toast.success("Pengaturan berhasil disimpan");
      }, 1000);
    } catch {
      setIsSaving(false);
      toast.error("Gagal menyimpan pengaturan");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-600 font-poppins">Pengaturan</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Aplikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="app_name">Nama Aplikasi</Label>
            <Input id="app_name" defaultValue="Al Mawaddah SmartPOS" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="app_phone">Nomor Telepon</Label>
            <Input id="app_phone" defaultValue="+62XXXXXXXXXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="app_address">Alamat</Label>
            <Input id="app_address" defaultValue="Pondok Pesantren Tahfidz Al Mawaddah" />
          </div>
          <Separator />
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Menyimpan..." : "Simpan Pengaturan"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}