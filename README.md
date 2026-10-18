# Chokaa Works

Scaffold for a custom Kenyan construction portfolio. Next.js 14 (App Router), Tailwind CSS, Drizzle, and Neon. Pages, forms, and the admin are not built yet.

The firm name, registration numbers, phone, and address in `content/site.ts` are placeholders.

## Scripts

```bash
npm run dev
npm run build
npm run db:generate   # writes SQL from src/db/schema.ts
npm run db:migrate    # applies SQL with DATABASE_URL_UNPOOLED
```

Copy `.env.example` to `.env.local` before migrating or running database queries.
# Chokaa
