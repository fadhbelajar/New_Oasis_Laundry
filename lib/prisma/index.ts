import { prisma } from "./client";

export async function getStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [omzet, transaksi, laundryMasuk, cucianDiproses, cucianSiap, stokMenipis, kasMasuk, kasKeluar] = await Promise.all([
    prisma.sales.aggregate({ where: { tanggal: { gte: today }, total_bayar: { _sum: true } } }),
    prisma.sales.count({ where: { tanggal: { gte: today } } }),
    prisma.laundry_orders.count({ where: { tanggal_masuk: { gte: today } } }),
    prisma.laundry_orders.count({ where: { status: { in: ["DITERIMA", "DITIMBANG", "DICUCI", "DIJEMUR", "DISETRIKA", "DILIPAT"] } } }),
    prisma.laundry_orders.count({ where: { status: "SIAP_DIAMBIL" } }),
    prisma.products.count({ where: { stok: { lte: prisma.products.fields.stok_minimum } } }),
    prisma.cash_transactions.aggregate({ where: { jenis: "masuk", created_at: { gte: today } } }),
    prisma.cash_transactions.aggregate({ where: { jenis: "keluar", created_at: { gte: today } } }),
  ]);

  return {
    omzet: omzet._sum.total_bayar ?? 0,
    transaksi,
    laundryMasuk,
    cucianDiproses,
    cucianSiap,
    stokMenipis,
    kasMasuk: kasMasuk._sum.jumlah ?? 0,
    kasKeluar: kasKeluar._sum.jumlah ?? 0,
  };
}

export async function getRecentSales(limit = 5) {
  return prisma.sales.findMany({
    take: limit,
    orderBy: { tanggal: "desc" },
    include: { sale_items: { include: { product: true } } },
  });
}

export async function getRecentLaundryOrders(limit = 5) {
  return prisma.laundry_orders.findMany({
    take: limit,
    orderBy: { tanggal_masuk: "desc" },
    include: { santri: true, layanan: true },
  });
}