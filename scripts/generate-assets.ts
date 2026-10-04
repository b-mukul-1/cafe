import fs from "fs";
import path from "path";
import sharp from "sharp";

const publicDir = path.resolve(process.cwd(), "public");
const imagesDir = path.join(publicDir, "images");
const modelsDir = path.join(publicDir, "models");

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

// 1. Create crisp vector Logo (light and dark)
const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5B070"/>
      <stop offset="100%" stop-color="#C98A4C"/>
    </linearGradient>
  </defs>
  <!-- Minimalist Artisanal Cup Icon -->
  <g transform="translate(10, 14)">
    <circle cx="26" cy="26" r="24" fill="none" stroke="url(#goldGrad)" stroke-width="2.5"/>
    <path d="M16 22 C16 32, 22 36, 26 36 C30 36, 36 32, 36 22 Z" fill="url(#goldGrad)"/>
    <path d="M36 24 C40 24, 42 27, 41 30 C40 33, 36 33, 35 32" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
    <path d="M22 14 Q24 10 26 14 Q28 18 30 14" fill="none" stroke="#FAF6F0" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
  </g>
  <!-- Typography -->
  <text x="76" y="44" font-family="'Playfair Display', Georgia, serif" font-size="34" font-weight="700" fill="#FAF6F0" letter-spacing="4">A2 CAFE</text>
  <text x="78" y="62" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="600" fill="#C98A4C" letter-spacing="3">ROASTERY &amp; CULINARY LOUNGE</text>
</svg>`;

const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <defs>
    <linearGradient id="goldGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5B070"/>
      <stop offset="100%" stop-color="#C98A4C"/>
    </linearGradient>
  </defs>
  <g transform="translate(10, 14)">
    <circle cx="26" cy="26" r="24" fill="none" stroke="url(#goldGradDark)" stroke-width="2.5"/>
    <path d="M16 22 C16 32, 22 36, 26 36 C30 36, 36 32, 36 22 Z" fill="url(#goldGradDark)"/>
    <path d="M36 24 C40 24, 42 27, 41 30 C40 33, 36 33, 35 32" fill="none" stroke="url(#goldGradDark)" stroke-width="2"/>
    <path d="M22 14 Q24 10 26 14 Q28 18 30 14" fill="none" stroke="#16100B" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
  </g>
  <text x="76" y="44" font-family="'Playfair Display', Georgia, serif" font-size="34" font-weight="700" fill="#16100B" letter-spacing="4">A2 CAFE</text>
  <text x="78" y="62" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="600" fill="#C98A4C" letter-spacing="3">ROASTERY &amp; CULINARY LOUNGE</text>
</svg>`;

fs.writeFileSync(path.join(imagesDir, "logo-light.svg"), logoLightSvg);
fs.writeFileSync(path.join(imagesDir, "logo-dark.svg"), logoDarkSvg);

// 2. Generate Hero Poster WebP image using sharp (rich obsidian espresso gradient, glowing cup silhouette)
async function generateHeroPoster() {
  const width = 1920;
  const height = 1080;
  const posterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <radialGradient id="espressoGlow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#24180F"/>
        <stop offset="40%" stop-color="#140D08"/>
        <stop offset="100%" stop-color="#080504"/>
      </radialGradient>
      <radialGradient id="centerWarmth" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stop-color="#C98A4C" stop-opacity="0.3"/>
        <stop offset="70%" stop-color="#C98A4C" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="goldCup" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5B070"/>
        <stop offset="100%" stop-color="#8C531E"/>
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#espressoGlow)"/>
    <circle cx="${width / 2}" cy="${height / 2}" r="500" fill="url(#centerWarmth)"/>

    <!-- Subtle artisanal grid lines -->
    <line x1="0" y1="${height - 200}" x2="${width}" y2="${height - 200}" stroke="#2C2018" stroke-width="1" opacity="0.3"/>
    
    <!-- Stylized Coffee Cup Silhouette in Center -->
    <g transform="translate(${width / 2 - 120}, ${height / 2 - 100}) scale(3.5)">
      <!-- Saucer -->
      <ellipse cx="35" cy="55" rx="32" ry="6" fill="#1C140E" stroke="#3F2F23" stroke-width="1.5"/>
      <!-- Cup Base -->
      <path d="M12 20 C14 42, 22 48, 35 48 C48 48, 56 42, 58 20 Z" fill="#1E1610" stroke="url(#goldCup)" stroke-width="2"/>
      <!-- Inner Coffee Surface -->
      <ellipse cx="35" cy="20" rx="23" ry="5.5" fill="#3D2010" stroke="#7A451C" stroke-width="1"/>
      <ellipse cx="33" cy="20" rx="16" ry="3.5" fill="#C98A4C" opacity="0.4"/>
      <!-- Handle -->
      <path d="M57 24 C67 24, 70 36, 56 40" fill="none" stroke="url(#goldCup)" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Steam Wisps -->
      <path d="M28 14 Q24 6 30 0 Q36 -6 32 -14" fill="none" stroke="#E5B070" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <path d="M38 15 Q44 7 38 1 Q32 -5 36 -12" fill="none" stroke="#E5B070" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(posterSvg))
    .webp({ quality: 85 })
    .toFile(path.join(imagesDir, "hero-poster.webp"));

  // Also write 1200x630 OpenGraph card
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <radialGradient id="ogBg" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stop-color="#22170E"/>
        <stop offset="60%" stop-color="#120B07"/>
        <stop offset="100%" stop-color="#080503"/>
      </radialGradient>
      <linearGradient id="ogGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5B070"/>
        <stop offset="100%" stop-color="#C98A4C"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#ogBg)"/>
    <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#332418" stroke-width="1.5"/>
    <rect x="50" y="50" width="1100" height="530" fill="none" stroke="#221810" stroke-width="1"/>

    <text x="120" y="240" font-family="Georgia, serif" font-size="76" font-weight="700" fill="#FAF6F0" letter-spacing="6">A2 CAFE</text>
    <text x="124" y="290" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#C98A4C" letter-spacing="4">ROASTERY &amp; ARTISANAL CULINARY LOUNGE</text>
    
    <text x="124" y="380" font-family="system-ui, sans-serif" font-size="24" fill="#D5C8BA">Specialty Pour-Overs • Handcrafted Brioche Burgers • Small-Batch Patisserie</text>
    <text x="124" y="425" font-family="system-ui, sans-serif" font-size="18" fill="#9E8E7E">Open Daily • Single-Origin Arabica Roasts • Ambient Sanctuary</text>

    <g transform="translate(900, 240) scale(2.2)">
      <ellipse cx="35" cy="55" rx="32" ry="6" fill="#1C140E" stroke="#3F2F23" stroke-width="1.5"/>
      <path d="M12 20 C14 42, 22 48, 35 48 C48 48, 56 42, 58 20 Z" fill="#1E1610" stroke="url(#ogGold)" stroke-width="2"/>
      <ellipse cx="35" cy="20" rx="23" ry="5.5" fill="#3D2010" stroke="#7A451C" stroke-width="1"/>
      <ellipse cx="33" cy="20" rx="16" ry="3.5" fill="#C98A4C" opacity="0.4"/>
      <path d="M57 24 C67 24, 70 36, 56 40" fill="none" stroke="url(#ogGold)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M28 14 Q24 6 30 0 Q36 -6 32 -14" fill="none" stroke="#E5B070" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <path d="M38 15 Q44 7 38 1 Q32 -5 36 -12" fill="none" stroke="#E5B070" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 90 })
    .toFile(path.join(imagesDir, "og-image.jpg"));

  console.log("✓ Generated logo-light.svg, logo-dark.svg, hero-poster.webp, og-image.jpg");
}

generateHeroPoster().catch((err) => {
  console.error("Asset generation error:", err);
  process.exit(1);
});
