# Al Mawaddah SmartPOS

A comprehensive Point of Sale, Inventory Management, and Laundry Management system for Pondok Pesantren Tahfidz Al Mawaddah. Built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, PostgreSQL, and Prisma ORM.

## Features

- **Multi-Role Authentication** - Super Admin, Admin Koperasi, Operator Laundry, Petugas Gudang, Bendahara, Pimpinan
- **POS System** - Cashier with barcode scanning, shopping cart, payment methods (Tunai, Transfer, QRIS, Saldo Santri), thermal receipt printing, QR Code invoice
- **Inventory Management** - Barang masuk/keluar, stock opname, supplier management, stock alerts
- **Laundry Management** - Order tracking with 8 statuses, kanban board, QR code labels, pickup system
- **Finance** - Cash flow tracking, daily/monthly reports, PDF/Excel export
- **Dashboard** - Real-time statistics, charts, recent transactions
- **PWA Support** - Installable on Android, offline fallback, splash screen, auto-install prompt for 20 seconds
- **Responsive Design** - Works on mobile, tablet, and desktop

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (Strict Mode)
- **Tailwind CSS**
- **Shadcn UI**
- **PostgreSQL**
- **Prisma ORM**
- **Zod** (Validation)
- **React Hook Form**
- **TanStack Table**
- **Recharts** (Charts)
- **QR Code** (Generator)
- **JsBarcode** (Barcode Generator)
- **PDF-lib** (PDF Export)
- **ExcelJS** (Excel Export)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- PostgreSQL 15+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd al-mawaddah-smartpos

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database URL
# DATABASE_URL="postgresql://user:password@localhost:5432/al_mawaddah_smartpos"

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with demo data
npm run db:seed

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | super@almawaddah.sch.id | admin123 |
| Admin Koperasi | admin@almawaddah.sch.id | admin123 |
| Operator Laundry | laundry@almawaddah.sch.id | admin123 |
| Petugas Gudang | gudang@almawaddah.sch.id | admin123 |
| Bendahara | bendahara@almawaddah.sch.id | admin123 |
| Pimpinan | pimpinan@almawaddah.sch.id | admin123 |

## Database Setup

### PostgreSQL

1. Install PostgreSQL 15+
2. Create a database:
   ```sql
   CREATE DATABASE al_mawaddah_smartpos;
   ```
3. Update `DATABASE_URL` in `.env`
4. Run migrations:
   ```bash
   npm run db:migrate
   ```

### SQL Migration

Alternatively, you can use the SQL migration file at `database/001_init.sql`:

```bash
psql -U postgres -d al_mawaddah_smartpos -f database/001_init.sql
```

## Deployment to Vercel

### Prerequisites

- Vercel account
- PostgreSQL database (Vercel Postgres or external)

### Steps

1. Push code to GitHub
2. Import project on Vercel
3. Set environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
4. Deploy

### Vercel Configuration

The `vercel.json` file is included for deployment configuration.

## Project Structure

```
al-mawaddah-smartpos/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Redirect to login
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── dashboard/
│   │   ├── layout.tsx      # Dashboard layout
│   │   ├── page.tsx        # Dashboard home
│   │   ├── pos/
│   │   │   ├── page.tsx    # POS checkout
│   │   │   ├── history/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   └── categories/
│   │   │       └── page.tsx
│   │   ├── inventory/
│   │   │   ├── page.tsx
│   │   │   ├── in/
│   │   │   │   └── page.tsx
│   │   │   ├── out/
│   │   │   │   └── page.tsx
│   │   │   ├── opname/
│   │   │   │   └── page.tsx
│   │   │   └── suppliers/
│   │   │       └── page.tsx
│   │   ├── laundry/
│   │   │   ├── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   ├── tracking/
│   │   │   │   └── page.tsx
│   │   │   ├── pickup/
│   │   │   │   └── page.tsx
│   │   │   └── services/
│   │   │       └── page.tsx
│   │   ├── finance/
│   │   │   ├── page.tsx
│   │   │   └── reports/
│   │   │       └── page.tsx
│   │   ├── santri/
│   │   │   └── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   └── api/
│       ├── auth/
│       │   └── login/
│       │       └── route.ts
│       ├── pos/
│       │   ├── checkout/
│       │   │   └── route.ts
│       ├── inventory/
│       │   ├── in/
│       │   │   └── route.ts
│       │   ├── out/
│       │   │   └── route.ts
│       │   └── opname/
│       │       └── route.ts
│       ├── laundry/
│       │   └── orders/
│       │       ├── route.ts
│       │       └── [id]/
│       │           ├── status/
│       │           │   └── route.ts
│       │           ├── label/
│       │           │   └── route.ts
│       │           └── pickup/
│       │               └── route.ts
│       └── reports/
│           ├── sales/
│           │   └── route.ts
│           ├── laundry/
│           │   └── route.ts
│           └── finance/
│               └── route.ts
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   └── topbar.tsx
│   ├── stats-card.tsx
│   ├── data-table.tsx
│   ├── qr-code.tsx
│   ├── barcode-display.tsx
│   ├── thermal-receipt.tsx
│   ├── laundry-status-badge.tsx
│   ├── confirm-dialog.tsx
│   ├── export-buttons.tsx
│   ├── loading-skeleton.tsx
│   ├── empty-state.tsx
│   ├── charts/
│   │   └── index.ts
│   ├── providers/
│   │   ├── theme-provider.tsx
│   │   └── sidebar-provider.tsx
│   └── ui/                  # Shadcn UI components
├── lib/
│   ├── prisma/
│   │   └── index.ts         # Prisma client singleton
│   ├── utils/
│   │   └── helpers.ts       # Utility functions
│   ├── constants/
│   │   └── index.ts         # Constants and configs
│   ├── hooks/               # Custom hooks
│   └── types/
│       └── index.ts         # TypeScript types
├── prisma/
│   └── schema.prisma        # Prisma schema
├── database/
│   └── 001_init.sql         # SQL migration
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── sw.js                # Service worker
│   └── icons/               # App icons
├── middleware.ts            # Auth middleware
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind config
├── tsconfig.json            # TypeScript config
├── postcss.config.mjs       # PostCSS config
├── eslint.config.mjs        # ESLint config
├── package.json
├── .env.example
└── README.md
```

## License

MIT