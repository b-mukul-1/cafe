# A2 Cafe — 3D Scroll-Driven Static Website & Reusable Cafe Template

A high-performance, static export, 3D scroll-driven website built for **A2 Cafe**, engineered as a turnkey, white-label commercial template for specialty coffee shops, roasteries, and artisanal culinary lounges.

---

## 🚀 Launch a New Cafe in Under 1 Hour (Step-by-Step Guide)

You can launch a completely branded, technical-SEO-optimized site for a new cafe client without touching any React code or CSS:

### Step 1: Clone & Configure Environment
```bash
git clone <your-repo-url> new-cafe
cd new-cafe
npm install
cp .env.example .env.local
```
Set your client's production domain in `.env.local`:
```env
SITE_URL=https://newcafename.com
NEXT_PUBLIC_SITE_URL=https://newcafename.com
```

### Step 2: Fill Client Details in `src/config/cafe.config.ts`
All cafe specifics are centralized in `src/config/cafe.config.ts` (validated via Zod):
- **Brand**: Name, legal name, tagline, description, established year.
- **Brand Colors**: Update hex values for `bgPrimary`, `accentPrimary`, `borderSubtle`, etc.
- **NAP & Local SEO**:
  - `address`: Street, city, state, postal code.
  - `geo`: Exact latitude & longitude coordinates.
  - `phone`, `whatsappNumber`, `email`.
  - `googleBusinessUrl`, `googleMapsDirectionsUrl`, `googleMapsEmbedUrl`.
  - `transitDetails`, `parkingDetails`.
- **Opening Hours**: Daily opening and closing times.
- **Price Range & Cuisine**: Average cost per person and culinary categories.
- **AI Crawlers**: Set `allowAll: true` or customize permitted user-agents.

### Step 3: Populate Menu and FAQs in `src/content/`
1. `src/content/menu.ts`: Add your categories and menu items with prices, FSSAI veg/non-veg flags, and dietary markers (`isVegan`, `isGlutenFree`, `isSignature`).
2. `src/content/faq.ts`: Review or add direct-answer FAQ items (schema automatically syncs 1-to-1).
3. `src/content/copy.en.ts` & `copy.hi.ts`: Update story narrative, neighbourhood landmarks, and localized copy.

### Step 4: Add Visual Assets in `public/`
- **Logo**: Place vector logos at `public/images/logo-light.svg` and `logo-dark.svg`.
- **Hero Poster**: Provide a WebP hero image at `public/images/hero-poster.webp`.
- **OpenGraph Card**: Provide a 1200x630 JPEG at `public/images/og-image.jpg`.
- **3D Models (Optional)**: Drop custom `.glb` files into `public/models/` (`cup.glb`, `bean.glb`, `burger.glb`, `dessert.glb`). If omitted, procedural 3D models render automatically!

### Step 5: Test and Build
```bash
# Audit placeholders
npm run check:placeholders

# Verify JSON-LD Schema
npm run validate:schema

# Build static export & validate all pages
npm run build
```
Deploy the generated `out/` folder to GitHub Pages, Cloudflare Pages, Netlify, Vercel, AWS S3, or any static host.

---

## 🎨 3D GLB Model Requirements

The site works out of the box with procedural 3D models. When supplying production `.glb` assets:

| Model File | Target Subject | Triangle Budget | Max File Size | Animation / Hierarchy |
| :--- | :--- | :--- | :--- | :--- |
| `cup.glb` | Ceramic Coffee Cup / Mug | 3,000 – 12,000 | < 3 MB | Center origin `(0, 0, 0)` |
| `bean.glb` | Single Roasted Coffee Bean | 300 – 1,500 | < 1 MB | Center origin `(0, 0, 0)` |
| `burger.glb` | Gourmet Brioche Burger | 8,000 – 25,000 | < 3 MB | Separable layers: `bun_top`, `lettuce`, `tomato`, `cheese`, `patty`, `bun_bottom` |
| `dessert.glb` | Artisanal Patisserie / Cake | 5,000 – 15,000 | < 3 MB | Center origin `(0, 0, 0)` |

- **Compression**: Draco or Meshopt compression enabled (`gltf-transform optimize`).
- **Textures**: 1K or 2K max embedded PBR textures (Roughness/Metallic).

---

## 📦 Deploying Static Export & Headers

### Netlify / Cloudflare Pages / Vercel
The included `public/_headers` file applies security headers and immutable caching automatically for static hosting.

### Caddy Server
Use the provided `Caddyfile.snippet`:
```caddy
{$SITE_URL:http://localhost:3000} {
    root * /var/www/a2cafe/out
    file_server
    try_files {path} {path}/ {path}.html =404
}
```

---

## 🧭 Transitioning to Future Backend & Dashboard

When you are ready to introduce the live ordering system or administrative dashboard:
1. Open `next.config.ts`.
2. Toggle `output: 'export'` off (or run with `NEXT_OUTPUT_MODE=standalone`).
3. Connect your database/auth in `src/app/(dashboard)/dashboard/` and `src/app/order/`.
4. Configure your backend endpoint in `process.env.NEXT_PUBLIC_API_URL` (connected via `src/lib/api/client.ts`).
# cafe
