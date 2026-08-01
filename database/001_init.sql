-- Al Mawaddah SmartPOS Database Migration
-- PostgreSQL

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_roles_name ON roles(name);

-- Profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'OPERATOR' REFERENCES roles(name),
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_deleted_at ON profiles(deleted_at);

-- Santri table
CREATE TABLE santri (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nis VARCHAR(50) NOT NULL UNIQUE,
    nama VARCHAR(255) NOT NULL,
    kamar VARCHAR(50),
    asrama VARCHAR(100),
    wali_santri VARCHAR(255),
    no_hp_wali VARCHAR(20),
    saldo DECIMAL(12, 2) NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_santri_nis ON santri(nis);
CREATE INDEX idx_santri_deleted_at ON santri(deleted_at);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_name ON categories(name);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kode_produk VARCHAR(50) NOT NULL UNIQUE,
    barcode VARCHAR(100) NOT NULL UNIQUE,
    nama_produk VARCHAR(255) NOT NULL,
    kategori_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    satuan VARCHAR(20) NOT NULL DEFAULT 'pcs',
    harga_beli DECIMAL(12, 2) NOT NULL DEFAULT 0,
    harga_jual DECIMAL(12, 2) NOT NULL DEFAULT 0,
    stok INT NOT NULL DEFAULT 0,
    stok_minimum INT NOT NULL DEFAULT 5,
    foto TEXT,
    status_aktif BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_products_kode ON products(kode_produk);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_kategori ON products(kategori_id);
CREATE INDEX idx_products_stok ON products(stok);
CREATE INDEX idx_products_deleted_at ON products(deleted_at);

-- Price history table
CREATE TABLE price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    old_price DECIMAL(12, 2) NOT NULL,
    new_price DECIMAL(12, 2) NOT NULL,
    changed_by VARCHAR(255),
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_price_history_product ON price_history(product_id);

-- Suppliers table
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(255) NOT NULL,
    alamat TEXT,
    no_hp VARCHAR(20),
    email VARCHAR(255),
    keterangan TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_suppliers_nama ON suppliers(nama);

-- Purchases table
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
    nomor_faktur VARCHAR(100) NOT NULL UNIQUE,
    tanggal TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    catatan TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_purchases_faktur ON purchases(nomor_faktur);
CREATE INDEX idx_purchases_supplier ON purchases(supplier_id);
CREATE INDEX idx_purchases_tanggal ON purchases(tanggal);

-- Purchase items table
CREATE TABLE purchase_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_id UUID NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    qty INT NOT NULL,
    harga_beli DECIMAL(12, 2) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL
);

CREATE INDEX idx_purchase_items_purchase ON purchase_items(purchase_id);
CREATE INDEX idx_purchase_items_product ON purchase_items(product_id);

-- Sales table
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nomor_invoice VARCHAR(100) NOT NULL UNIQUE,
    tanggal TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    diskon DECIMAL(12, 2) NOT NULL DEFAULT 0,
    pajak DECIMAL(12, 2) NOT NULL DEFAULT 0,
    total_bayar DECIMAL(12, 2) NOT NULL DEFAULT 0,
    metode_bayar VARCHAR(20) NOT NULL DEFAULT 'tunai',
    catatan TEXT,
    kasir_id UUID NOT NULL REFERENCES profiles(id),
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_sales_invoice ON sales(nomor_invoice);
CREATE INDEX idx_sales_kasir ON sales(kasir_id);
CREATE INDEX idx_sales_tanggal ON sales(tanggal);

-- Sale items table
CREATE TABLE sale_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    qty INT NOT NULL,
    harga DECIMAL(12, 2) NOT NULL,
    diskon DECIMAL(12, 2) NOT NULL DEFAULT 0,
    subtotal DECIMAL(12, 2) NOT NULL
);

CREATE INDEX idx_sale_items_sale ON sale_items(sale_id);
CREATE INDEX idx_sale_items_product ON sale_items(product_id);

-- Inventory transactions table
CREATE TABLE inventory_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    jenis VARCHAR(10) NOT NULL DEFAULT 'in',
    qty INT NOT NULL,
    harga_beli DECIMAL(12, 2) NOT NULL DEFAULT 0,
    reference VARCHAR(100),
    reference_type VARCHAR(50),
    keterangan TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inv_tx_product ON inventory_transactions(product_id);
CREATE INDEX idx_inv_tx_jenis ON inventory_transactions(jenis);

-- Laundry services table
CREATE TABLE laundry_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(100) NOT NULL UNIQUE,
    tarif_per_kg DECIMAL(12, 2) NOT NULL,
    tarif_potong DECIMAL(12, 2) NOT NULL DEFAULT 0,
    express_additional DECIMAL(12, 2) NOT NULL DEFAULT 0,
    deskripsi TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Laundry orders table
CREATE TABLE laundry_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kode_order VARCHAR(50) NOT NULL UNIQUE,
    santri_id UUID NOT NULL REFERENCES santri(id) ON DELETE RESTRICT,
    layanan_id UUID NOT NULL REFERENCES laundry_services(id) ON DELETE RESTRICT,
    berat DECIMAL(10, 2) NOT NULL,
    jumlah_potong INT NOT NULL DEFAULT 1,
    total_harga DECIMAL(12, 2) NOT NULL DEFAULT 0,
    hutang DECIMAL(12, 2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'DITERIMA',
    catatan TEXT,
    tanggal_masuk TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    estimasi_selesai TIMESTAMPTZ,
    tanggal_selesai TIMESTAMPTZ,
    diterima_oleh VARCHAR(255),
    diambil_oleh VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_laundry_kode ON laundry_orders(kode_order);
CREATE INDEX idx_laundry_santri ON laundry_orders(santri_id);
CREATE INDEX idx_laundry_status ON laundry_orders(status);
CREATE INDEX idx_laundry_tanggal ON laundry_orders(tanggal_masuk);

-- Laundry status logs table
CREATE TABLE laundry_status_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES laundry_orders(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    keterangan TEXT,
    changed_by VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_status_logs_order ON laundry_status_logs(order_id);

-- Cash transactions table
CREATE TABLE cash_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jenis VARCHAR(10) NOT NULL DEFAULT 'masuk',
    kategori VARCHAR(50) NOT NULL,
    jumlah DECIMAL(12, 2) NOT NULL,
    keterangan TEXT,
    referensi VARCHAR(100),
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cash_jenis ON cash_transactions(jenis);
CREATE INDEX idx_cash_kategori ON cash_transactions(kategori);
CREATE INDEX idx_cash_tanggal ON cash_transactions(created_at);

-- Settings table
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value JSONB NOT NULL,
    keterangan TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'info',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id VARCHAR(100),
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
    ('super_admin', 'Super Administrator with full access'),
    ('admin_koperasi', 'Admin for cooperative operations'),
    ('operator_laundry', 'Laundry operator'),
    ('petugas_gudang', 'Warehouse staff'),
    ('bendahara', 'Treasurer/Finance officer'),
    ('pimpinan', 'Management/President');

-- Insert default settings
INSERT INTO settings (key, value, keterangan) VALUES
    ('app_name', '"Al Mawaddah SmartPOS"', 'Application name'),
    ('app_phone', '"+62XXXXXXXXXX"', 'Contact phone'),
    ('app_address', '"Pondok Pesantren Tahfidz Al Mawaddah"', 'Address'),
    ('receipt_header', '"AL MAWADDAH SMARTPOS"', 'Receipt header text'),
    ('tax_enabled', 'false', 'Enable tax on POS'),
    ('tax_rate', '0.11', 'Tax rate (11%)');

-- Insert default laundry services
INSERT INTO laundry_services (nama, tarif_per_kg, tarif_potong, express_additional, deskripsi) VALUES
    ('Cuci Kering', 5000, 0, 0, 'Layanan cuci kering standar'),
    ('Cuci Setrika', 7000, 0, 0, 'Layanan cuci dan setrika'),
    ('Setrika Saja', 4000, 0, 0, 'Layanan setrika saja'),
    ('Express', 0, 0, 3000, 'Tambahan biaya express per kg'),
    ('Bedcover', 15000, 0, 5000, 'Tarif khusus bedcover'),
    ('Karpet', 25000, 0, 10000, 'Tarif khusus karpet');

-- Insert seed products
INSERT INTO categories (name, description) VALUES
    ('Makanan & Minuman', 'Kategori makanan dan minuman'),
    ('Alat Tulis', 'Kategori alat tulis'),
    ('Kebersihan', 'Kategori produk kebersihan'),
    ('Lainnya', 'Kategori lainnya');

INSERT INTO products (kode_produk, barcode, nama_produk, kategori_id, satuan, harga_beli, harga_jual, stok, stok_minimum) VALUES
    ('PRD-001', '8990000000001', 'Air Mineral 600ml', (SELECT id FROM categories WHERE name = 'Makanan & Minuman'), 'pcs', 2000, 3000, 100, 10),
    ('PRD-002', '8990000000002', 'Roti Premium', (SELECT id FROM categories WHERE name = 'Makanan & Minuman'), 'pcs', 3500, 5000, 50, 5),
    ('PRD-003', '8990000000003', 'Buku Tulis A5', (SELECT id FROM categories WHERE name = 'Alat Tulis'), 'pcs', 5000, 7500, 75, 10),
    ('PRD-004', '8990000000004', 'Pulpen Hitam', (SELECT id FROM categories WHERE name = 'Alat Tulis'), 'pcs', 1500, 2500, 200, 20),
    ('PRD-005', '8990000000005', 'Sabun Mandi', (SELECT id FROM categories WHERE name = 'Kebersihan'), 'pcs', 3000, 4500, 80, 10),
    ('PRD-006', '8990000000006', 'Pasta Gigi', (SELECT id FROM categories WHERE name = 'Kebersihan'), 'pcs', 4000, 5500, 60, 10);

-- Insert seed santri
INSERT INTO santri (nis, nama, kamar, asrama, wali_santri, no_hp_wali, saldo) VALUES
    ('SANTRI-001', 'Aisyah Rahmah', 'Kamar 1', 'Asrama Putri A', 'Ahmad Fauzi', '081234567890', 500000),
    ('SANTRI-002', 'Khadijah Zahra', 'Kamar 2', 'Asrama Putri A', 'Ummi Kulsum', '081234567891', 350000),
    ('SANTRI-003', 'Hafshah Nabila', 'Kamar 3', 'Asrama Putri B', 'Abdurrahman', '081234567892', 200000),
    ('SANTRI-004', 'Maryam Salsabila', 'Kamar 4', 'Asrama Putri B', 'Fatimah Zahra', '081234567893', 150000);

-- Insert seed laundry orders
INSERT INTO laundry_orders (kode_order, santri_id, layanan_id, berat, jumlah_potong, total_harga, hutang, status, tanggal_masuk, estimasi_selesai) VALUES
    ('LDR-2026-000001', (SELECT id FROM santri WHERE nis = 'SANTRI-001'), (SELECT id FROM laundry_services WHERE nama = 'Cuci Setrika'), 3.5, 1, 24500, 0, 'SIAP_DIAMBIL', '2026-01-15 08:00:00', '2026-01-16 08:00:00'),
    ('LDR-2026-000002', (SELECT id FROM santri WHERE nis = 'SANTRI-002'), (SELECT id FROM laundry_services WHERE nama = 'Cuci Kering'), 2.0, 1, 10000, 0, 'DICUCI', '2026-01-15 09:30:00', '2026-01-16 09:30:00'),
    ('LDR-2026-000003', (SELECT id FROM santri WHERE nis = 'SANTRI-003'), (SELECT id FROM laundry_services WHERE nama = 'Setrika Saja'), 1.5, 1, 6000, 5000, 'DIJEMUR', '2026-01-15 10:00:00', '2026-01-16 10:00:00'),
    ('LDR-2026-000004', (SELECT id FROM santri WHERE nis = 'SANTRI-004'), (SELECT id FROM laundry_services WHERE nama = 'Cuci Setrika'), 5.0, 1, 35000, 0, 'DILIPAT', '2026-01-15 11:00:00', '2026-01-16 11:00:00'),
    ('LDR-2026-000005', (SELECT id FROM santri WHERE nis = 'SANTRI-001'), (SELECT id FROM laundry_services WHERE nama = 'Bedcover'), 1.0, 1, 15000, 0, 'DITERIMA', '2026-01-16 08:00:00', '2026-01-17 08:00:00'),
    ('LDR-2026-000006', (SELECT id FROM santri WHERE nis = 'SANTRI-002'), (SELECT id FROM laundry_services WHERE nama = 'Karpet'), 2.0, 1, 50000, 0, 'DITIMBANG', '2026-01-16 09:00:00', '2026-01-17 09:00:00'),
    ('LDR-2026-000007', (SELECT id FROM santri WHERE nis = 'SANTRI-003'), (SELECT id FROM laundry_services WHERE nama = 'Cuci Kering'), 4.0, 2, 20000, 0, 'DICUCI', '2026-01-16 10:00:00', '2026-01-17 10:00:00'),
    ('LDR-2026-000008', (SELECT id FROM santri WHERE nis = 'SANTRI-004'), (SELECT id FROM laundry_services WHERE nama = 'Cuci Setrika'), 2.5, 1, 17500, 3000, 'SIAP_DIAMBIL', '2026-01-16 11:00:00', '2026-01-17 11:00:00'),
    ('LDR-2026-000009', (SELECT id FROM santri WHERE nis = 'SANTRI-001'), (SELECT id FROM laundry_services WHERE nama = 'Express'), 1.0, 1, 8000, 0, 'DILIPAT', '2026-01-17 08:00:00', '2026-01-17 14:00:00'),
    ('LDR-2026-000010', (SELECT id FROM santri WHERE nis = 'SANTRI-002'), (SELECT id FROM laundry_services WHERE nama = 'Cuci Setrika'), 3.0, 1, 21000, 0, 'SUDAH_DIAMBIL', '2026-01-17 09:00:00', '2026-01-18 09:00:00');