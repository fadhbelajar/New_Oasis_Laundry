"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar as SidebarIcon,
  LayoutDashboard,
  ShoppingCart,
  Package,
  RefreshCw,
  DollarSign,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
  FileText,
  Barcode3,
  QrCode,
  Receipt,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils/helpers";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["super_admin", "admin_koperasi", "operator_laundry", "petugas_gudang", "bendahara", "pimpinan"],
  },
  {
    label: "POS",
    href: "/dashboard/pos",
    icon: ShoppingCart,
    roles: ["super_admin", "admin_koperasi"],
    children: [
      { label: "Kasir", href: "/dashboard/pos" },
      { label: "Riwayat", href: "/dashboard/pos/history" },
      { label: "Produk", href: "/dashboard/pos/products" },
      { label: "Kategori", href: "/dashboard/pos/categories" },
    ],
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
    roles: ["super_admin", "admin_koperasi", "petugas_gudang"],
    children: [
      { label: "Dashboard", href: "/dashboard/inventory" },
      { label: "Barang Masuk", href: "/dashboard/inventory/in" },
      { label: "Barang Keluar", href: "/dashboard/inventory/out" },
      { label: "Stok Opname", href: "/dashboard/inventory/opname" },
      { label: "Supplier", href: "/dashboard/inventory/suppliers" },
    ],
  },
  {
    label: "Laundry",
    href: "/dashboard/laundry",
    icon: RefreshCw,
    roles: ["super_admin", "admin_koperasi", "operator_laundry"],
    children: [
      { label: "Dashboard", href: "/dashboard/laundry" },
      { label: "Semua Order", href: "/dashboard/laundry/orders" },
      { label: "Order Baru", href: "/dashboard/laundry/orders/new" },
      { label: "Tracking", href: "/dashboard/laundry/tracking" },
      { label: "Pengambilan", href: "/dashboard/laundry/pickup" },
      { label: "Tarif", href: "/dashboard/laundry/services" },
    ],
  },
  {
    label: "Keuangan",
    href: "/dashboard/finance",
    icon: DollarSign,
    roles: ["super_admin", "admin_koperasi", "bendahara", "pimpinan"],
    children: [
      { label: "Kas Harian", href: "/dashboard/finance" },
      { label: "Laporan", href: "/dashboard/finance/reports" },
    ],
  },
  {
    label: "Data Master",
    href: "/dashboard/santri",
    icon: Users,
    roles: ["super_admin", "admin_koperasi", "pimpinan"],
    children: [
      { label: "Santri", href: "/dashboard/santri" },
      { label: "Pengguna", href: "/dashboard/users" },
      { label: "Pengaturan", href: "/dashboard/settings" },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-navy-600 text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-navy-500">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6" />
            <div>
              <h1 className="text-sm font-bold font-poppins">AL MAWADDAH</h1>
              <p className="text-[10px] text-navy-200">SmartPOS</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-navy-500 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <div key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "sidebar-link group",
                  isActive && "active"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </a>
              {!collapsed && item.children && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <a
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-4 py-1.5 text-xs rounded-lg text-navy-200 hover:text-white hover:bg-navy-500 transition-colors",
                          isChildActive && "text-white bg-navy-500"
                        )}
                      >
                        {child.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-navy-500">
          <p className="text-[10px] text-navy-300 text-center">
            Al Mawaddah SmartPOS v1.0
          </p>
        </div>
      )}
    </aside>
  );
}