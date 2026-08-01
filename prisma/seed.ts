import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.roles.createMany({
    data: [
      { name: "super_admin", description: "Super Administrator with full access" },
      { name: "admin_koperasi", description: "Admin for cooperative operations" },
      { name: "operator_laundry", description: "Laundry operator" },
      { name: "petugas_gudang", description: "Warehouse staff" },
      { name: "bendahara", description: "Treasurer/Finance officer" },
      { name: "pimpinan", description: "Management/President" },
    ],
    skipDuplicates: true,
  });

  const superAdmin = await prisma.profiles.upsert({
    where: { email: "super@almawaddah.sch.id" },
    update: {},
    create: { name: "Super Admin", email: "super@almawaddah.sch.id", password_hash: "$2a$10$hashedpassword", role: "super_admin" },
  });

  const adminKoperasi = await prisma.profiles.upsert({
    where: { email: "admin@almawaddah.sch.id" },
    update: {},
    create: { name: "Admin Koperasi", email: "admin@almawaddah.sch.id", password_hash: "$2a$10$hashedpassword", role: "admin_koperasi" },
  });

  const operatorLaundry = await prisma.profiles.upsert({
    where: { email: "laundry@almawaddah.sch.id" },
    update: {},
    create: { name: "Operator Laundry", email: "laundry@almawaddah.sch.id", password_hash: "$2a$10$hashedpassword", role: "operator_laundry" },
  });

  const petugasGudang = await prisma.profiles.upsert({
    where: { email: "gudang@almawaddah.sch.id" },
    update: {},
    create: { name: "Petugas Gudang", email: "gudang@almawaddah.sch.id", password_hash: "$2a$10$hashedpassword", role: "petugas_gudang" },
  });

  const bendahara = await prisma.profiles.upsert({
    where: { email: "bendahara@almawaddah.sch.id" },
    update: {},
    create: { name: "Bendahara", email: "bendahara@almawaddah.sch.id", password_hash: "$2a$10$hashedpassword", role: "bendahara" },
  });

  const pimpinan = await prisma.profiles.upsert({
    where: { email: "pimpinan@almawaddah.sch.id" },
    update: {},
    create: { name: "Pimpinan", email: "pimpinan@almawaddah.sch.id", password_hash: "$2a$10$hashedpassword", role: "pimpinan" },
  });

  const categories = await prisma.categories.createMany({
    data: [
      { name: "Makanan & Minuman", description: "Kategori makanan dan minuman" },
      { name: "Alat Tulis", description: "Kategori alat tulis" },
      { name: "Kebersihan", description: "Kategori produk kebersihan" },
      { name: "Lainnya", description: "Kategori lainnya" },
    ],
    skipDuplicates: true,
  });

  const makananCategory = await prisma.categories.findFirst({ where: { name: "Makanan & Minuman" } });
  const alatTulisCategory = await prisma.categories.findFirst({ where: { name: "Alat Tulis" } });
  const kebersihanCategory = await prisma.categories.findFirst({ where: { name: "Kebersihan" } });

  await prisma.products.createMany({
    data: [
      { kode_produk: "PRD-001", barcode: "8990000000001", nama_produk: "Air Mineral 600ml", kategori_id: makananCategory!.id, satuan: "pcs", harga_beli: 2000, harga_jual: 3000, stok: 100, stok_minimum: 10 },
      { kode_produk: "PRD-002", barcode: "8990000000002", nama_produk: "Roti Premium", kategori_id: makananCategory!.id, satuan: "pcs", harga_beli: 3500, harga_jual: 5000, stok: 50, stok_minimum: 5 },
      { kode_produk: "PRD-003", barcode: "8990000000003", nama_produk: "Buku Tulis A5", kategori_id: alatTulisCategory!.id, satuan: "pcs", harga_beli: 5000, harga_jual: 7500, stok: 75, stok_minimum: 10 },
      { kode_produk: "PRD-004", barcode: "8990000000004", nama_produk: "Pulpen Hitam", kategori_id: alatTulisCategory!.id, satuan: "pcs", harga_beli: 1500, harga_jual: 2500, stok: 200, stok_minimum: 20 },
      { kode_produk: "PRD-005", barcode: "8990000000005", nama_produk: "Sabun Mandi", kategori_id: kebersihanCategory!.id, satuan: "pcs", harga_beli: 3000, harga_jual: 4500, stok: 80, stok_minimum: 10 },
      { kode_produk: "PRD-006", barcode: "8990000000006", nama_produk: "Pasta Gigi", kategori_id: kebersihanCategory!.id, satuan: "pcs", harga_beli: 4000, harga_jual: 5500, stok: 60, stok_minimum: 10 },
    ],
    skipDuplicates: true,
  });

  const santri = await prisma.santri.createMany({
    data: [
      { nis: "SANTRI-001", nama: "Aisyah Rahmah", kamar: "Kamar 1", asrama: "Asrama Putri A", wali_santri: "Ahmad Fauzi", no_hp_wali: "081234567890", saldo: 500000 },
      { nis: "SANTRI-002", nama: "Khadijah Zahra", kamar: "Kamar 2", asrama: "Asrama Putri A", wali_santri: "Ummi Kulsum", no_hp_wali: "081234567891", saldo: 350000 },
      { nis: "SANTRI-003", nama: "Hafshah Nabila", kamar: "Kamar 3", asrama: "Asrama Putri B", wali_santri: "Abdurrahman", no_hp_wali: "081234567892", saldo: 200000 },
      { nis: "SANTRI-004", nama: "Maryam Salsabila", kamar: "Kamar 4", asrama: "Asrama Putri B", wali_santri: "Fatimah Zahra", no_hp_wali: "081234567893", saldo: 150000 },
    ],
    skipDuplicates: true,
  });

  const firstSantri = await prisma.santri.findFirst({ where: { nis: "SANTRI-001" } });
  const secondSantri = await prisma.santri.findFirst({ where: { nis: "SANTRI-002" } });
  const thirdSantri = await prisma.santri.findFirst({ where: { nis: "SANTRI-003" } });
  const fourthSantri = await prisma.santri.findFirst({ where: { nis: "SANTRI-004" } });

  const laundryServices = await prisma.laundry_services.createMany({
    data: [
      { nama: "Cuci Kering", tarif_per_kg: 5000, tarif_potong: 0, express_additional: 0, deskripsi: "Layanan cuci kering standar" },
      { nama: "Cuci Setrika", tarif_per_kg: 7000, tarif_potong: 0, express_additional: 0, deskripsi: "Layanan cuci dan setrika" },
      { nama: "Setrika Saja", tarif_per_kg: 4000, tarif_potong: 0, express_additional: 0, deskripsi: "Layanan setrika saja" },
      { nama: "Express", tarif_per_kg: 0, tarif_potong: 0, express_additional: 3000, deskripsi: "Tambahan biaya express per kg" },
      { nama: "Bedcover", tarif_per_kg: 15000, tarif_potong: 0, express_additional: 5000, deskripsi: "Tarif khusus bedcover" },
      { nama: "Karpet", tarif_per_kg: 25000, tarif_potong: 0, express_additional: 10000, deskripsi: "Tarif khusus karpet" },
    ],
    skipDuplicates: true,
  });

  const cuciSetrika = await prisma.laundry_services.findFirst({ where: { nama: "Cuci Setrika" } });
  const cuciKering = await prisma.laundry_services.findFirst({ where: { nama: "Cuci Kering" } });
  const setrikaSaja = await prisma.laundry_services.findFirst({ where: { nama: "Setrika Saja" } });
  const bedcover = await prisma.laundry_services.findFirst({ where: { nama: "Bedcover" } });
  const karpet = await prisma.laundry_services.findFirst({ where: { nama: "Karpet" } });
  const express = await prisma.laundry_services.findFirst({ where: { nama: "Express" } });

  await prisma.laundry_orders.createMany({
    data: [
      { kode_order: "LDR-2026-000001", santri_id: firstSantri!.id, layanan_id: cuciSetrika!.id, berat: 3.5, jumlah_potong: 1, total_harga: 24500, hutang: 0, status: "SIAP_DIAMBIL", tanggal_masuk: new Date("2026-01-15"), estimasi_selesai: new Date("2026-01-16") },
      { kode_order: "LDR-2026-000002", santri_id: secondSantri!.id, layanan_id: cuciKering!.id, berat: 2.0, jumlah_potong: 1, total_harga: 10000, hutang: 0, status: "DICUCI", tanggal_masuk: new Date("2026-01-15"), estimasi_selesai: new Date("2026-01-16") },
      { kode_order: "LDR-2026-000003", santri_id: thirdSantri!.id, layanan_id: setrikaSaja!.id, berat: 1.5, jumlah_potong: 1, total_harga: 6000, hutang: 5000, status: "DIJEMUR", tanggal_masuk: new Date("2026-01-15"), estimasi_selesai: new Date("2026-01-16") },
      { kode_order: "LDR-2026-000004", santri_id: fourthSantri!.id, layanan_id: cuciSetrika!.id, berat: 5.0, jumlah_potong: 1, total_harga: 35000, hutang: 0, status: "DILIPAT", tanggal_masuk: new Date("2026-01-15"), estimasi_selesai: new Date("2026-01-16") },
      { kode_order: "LDR-2026-000005", santri_id: firstSantri!.id, layanan_id: bedcover!.id, berat: 1.0, jumlah_potong: 1, total_harga: 15000, hutang: 0, status: "DITERIMA", tanggal_masuk: new Date("2026-01-16"), estimasi_selesai: new Date("2026-01-17") },
      { kode_order: "LDR-2026-000006", santri_id: secondSantri!.id, layanan_id: karpet!.id, berat: 2.0, jumlah_potong: 1, total_harga: 50000, hutang: 0, status: "DITIMBANG", tanggal_masuk: new Date("2026-01-16"), estimasi_selesai: new Date("2026-01-17") },
      { kode_order: "LDR-2026-000007", santri_id: thirdSantri!.id, layanan_id: cuciKering!.id, berat: 4.0, jumlah_potong: 2, total_harga: 20000, hutang: 0, status: "DICUCI", tanggal_masuk: new Date("2026-01-16"), estimasi_selesai: new Date("2026-01-17") },
      { kode_order: "LDR-2026-000008", santri_id: fourthSantri!.id, layanan_id: cuciSetrika!.id, berat: 2.5, jumlah_potong: 1, total_harga: 17500, hutang: 3000, status: "SIAP_DIAMBIL", tanggal_masuk: new Date("2026-01-16"), estimasi_selesai: new Date("2026-01-17") },
      { kode_order: "LDR-2026-000009", santri_id: firstSantri!.id, layanan_id: express!.id, berat: 1.0, jumlah_potong: 1, total_harga: 8000, hutang: 0, status: "DILIPAT", tanggal_masuk: new Date("2026-01-17"), estimasi_selesai: new Date("2026-01-17") },
      { kode_order: "LDR-2026-000010", santri_id: secondSantri!.id, layanan_id: cuciSetrika!.id, berat: 3.0, jumlah_potong: 1, total_harga: 21000, hutang: 0, status: "SUDAH_DIAMBIL", tanggal_masuk: new Date("2026-01-17"), estimasi_selesai: new Date("2026-01-18") },
    ],
    skipDuplicates: true,
  });

  await prisma.cash_transactions.createMany({
    data: [
      { jenis: "masuk", kategori: "Penjualan POS", jumlah: 15000, keterangan: "Transaksi #INV-001", created_by: superAdmin.id },
      { jenis: "masuk", kategori: "Pembayaran Laundry", jumlah: 24500, keterangan: "LDR-2026-000001", created_by: operatorLaundry.id },
      { jenis: "keluar", kategori: "Pembelian Barang", jumlah: 500000, keterangan: "FKT-2026-000001", created_by: petugasGudang.id },
      { jenis: "masuk", kategori: "Penjualan POS", jumlah: 8500, keterangan: "Transaksi #INV-002", created_by: operatorLaundry.id },
      { jenis: "keluar", kategori: "Pembelian Deterjen", jumlah: 150000, keterangan: "Pembelian deterjen", created_by: petugasGudang.id },
      { jenis: "masuk", kategori: "Deposit Saldo", jumlah: 100000, keterangan: "Deposit santri", created_by: superAdmin.id },
      { jenis: "keluar", kategori: "Listrik & Air", jumlah: 75000, keterangan: "Tagihan listrik", created_by: bendahara.id },
      { jenis: "masuk", kategori: "Penjualan POS", jumlah: 22000, keterangan: "Transaksi #INV-003", created_by: superAdmin.id },
    ],
  });

  await prisma.settings.createMany({
    data: [
      { key: "app_name", value: { value: "Al Mawaddah SmartPOS" }, keterangan: "Application name" },
      { key: "app_phone", value: { value: "+62XXXXXXXXXX" }, keterangan: "Contact phone" },
      { key: "app_address", value: { value: "Pondok Pesantren Tahfidz Al Mawaddah" }, keterangan: "Address" },
      { key: "receipt_header", value: { value: "AL MAWADDAH SMARTPOS" }, keterangan: "Receipt header text" },
      { key: "tax_enabled", value: { value: false }, keterangan: "Enable tax on POS" },
      { key: "tax_rate", value: { value: 0.11 }, keterangan: "Tax rate (11%)" },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });