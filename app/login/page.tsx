"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Login berhasil!");
        router.push("/dashboard");
        router.refresh();
      } else {
        const error = await res.json();
        toast.error(error.message || "Login gagal");
      }
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-poppins">
            AL MAWADDAH
          </h1>
          <p className="text-navy-200 mt-2 text-sm">
            SmartPOS - Pondok Pesantren Tahfidz
          </p>
        </div>
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-navy-600">
              Masuk
            </CardTitle>
            <p className="text-center text-sm text-gray-500">
              Masukkan email dan password Anda
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="operator@almawaddah.sch.id"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memuat..." : "Masuk"}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>super_admin / admin123</p>
              <p>admin_koperasi / admin123</p>
              <p>operator_laundry / admin123</p>
              <p>petugas_gudang / admin123</p>
              <p>bendahara / admin123</p>
              <p>pimpinan / admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}