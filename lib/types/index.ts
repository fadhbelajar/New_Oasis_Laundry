export interface Product {
  id: string;
  kode_produk: string;
  barcode: string;
  nama_produk: string;
  kategori_id: string;
  satuan: string;
  harga_beli: number;
  harga_jual: number;
  stok: number;
  stok_minimum: number;
  foto: string | null;
  status_aktif: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Sale {
  id: string;
  nomor_invoice: string;
  tanggal: Date;
  total_amount: number;
  diskon: number;
  pajak: number;
  total_bayar: number;
  metode_bayar: string;
  catatan: string | null;
  kasir_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface LaundryOrder {
  id: string;
  kode_order: string;
  santri_id: string;
  layanan_id: string;
  berat: number;
  jumlah_potong: number;
  total_harga: number;
  hutang: number;
  status: string;
  catatan: string | null;
  tanggal_masuk: Date;
  estimasi_selesai: Date | null;
  tanggal_selesai: Date | null;
  diterima_oleh: string | null;
  diambil_oleh: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface CashTransaction {
  id: string;
  jenis: string;
  kategori: string;
  jumlah: number;
  keterangan: string | null;
  referensi: string | null;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}