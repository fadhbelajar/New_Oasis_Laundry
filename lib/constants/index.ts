export const ROLES = ["super_admin", "admin_koperasi", "operator_laundry", "petugas_gudang", "bendahara", "pimpinan"] as const;

export const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin_koperasi: "Admin Koperasi",
  operator_laundry: "Operator Laundry",
  petugas_gudang: "Petugas Gudang",
  bendahara: "Bendahara",
  pimpinan: "Pimpinan",
};

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  super_admin: ["dashboard", "pos", "inventory", "laundry", "finance", "santri", "users", "settings"],
  admin_koperasi: ["dashboard", "pos", "inventory", "laundry", "finance"],
  operator_laundry: ["dashboard", "laundry"],
  petugas_gudang: ["dashboard", "inventory"],
  bendahara: ["dashboard", "finance"],
  pimpinan: ["dashboard", "finance", "reports"],
};

export const LAUNDRY_STATUSES = [
  "DITERIMA",
  "DITIMBANG",
  "DICUCI",
  "DIJEMUR",
  "DISETRIKA",
  "DILIPAT",
  "SIAP_DIAMBIL",
  "SUDAH_DIAMBIL",
] as const;

export const PAYMENT_METHODS = ["tunai", "transfer", "qris", "saldo_santri"] as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  tunai: "Tunai",
  transfer: "Transfer",
  qris: "QRIS",
  saldo_santri: "Saldo Santri",
};