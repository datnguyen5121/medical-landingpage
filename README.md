# MediWellness – Landing page

Next.js 15 (Pages Router) + Tailwind + Sanity CMS. Tiếng Việt.

## Chạy cục bộ

```bash
cp .env.example .env.local   # điền giá trị Sanity
npm install
npm run dev                  # http://localhost:3000, Studio tại /studio
```

## Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm test` | Vitest (validate form liên hệ, rate-limit) |
| `npm run studio` | Sanity Studio độc lập (cổng 3333) |

## Kiến trúc

- `pages/` – trang và API (`/api/submit-contact` lưu lead vào Sanity; `/api/revalidate` webhook làm mới ISR).
- `lib/config.ts` – hotline, Zalo, tên site, `NEXT_PUBLIC_SITE_URL`.
- `lib/sanity/` – client, env, truy vấn GROQ.
- `sanity/schemas/` – schema product, article, contact.
- SEO: canonical/og/JSON-LD trong `components/Layout.tsx`, `/sitemap.xml`, `/robots.txt`.

## Webhook làm mới nội dung

Trong Sanity manage tạo webhook `POST https://<site>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`,
projection `{ "_type": _type, "slug": slug.current }`.

## Lưu ý bảo mật

- Token ghi (`SANITY_API_TOKEN`) chỉ dùng phía server. Dataset chứa lead (`contact`) nên để **private**.
- Rate-limit của form là trong bộ nhớ từng instance; môi trường serverless nên dùng store dùng chung.
