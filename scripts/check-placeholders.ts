import fs from "fs";
import path from "path";

const filesToCheck = [
  "src/config/cafe.config.ts",
  "src/content/menu.ts",
  "src/content/faq.ts",
  "src/content/copy.en.ts",
  "src/content/copy.hi.ts",
];

const isStrictProd = process.env.STRICT_PROD === "true" || process.argv.includes("--strict");

interface PlaceholderMatch {
  file: string;
  line: number;
  placeholder: string;
}

const matches: PlaceholderMatch[] = [];

for (const relPath of filesToCheck) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((lineText, idx) => {
    const regex = /\[\[([A-Z0-9_]+)\]\]/g;
    let match;
    while ((match = regex.exec(lineText)) !== null) {
      matches.push({
        file: relPath,
        line: idx + 1,
        placeholder: match[0],
      });
    }
  });
}

const uniquePlaceholders = Array.from(new Set(matches.map((m) => m.placeholder)));

console.log("\n=======================================================");
console.log("   A2 CAFE TEMPLATE: CONFIGURATION PLACEHOLDER AUDIT   ");
console.log("=======================================================\n");

if (matches.length === 0) {
  console.log("✓ Zero placeholders detected. Site is 100% production-ready for launch!\n");
} else {
  console.log(`Detected ${matches.length} placeholder occurrences (${uniquePlaceholders.length} unique keys):\n`);
  uniquePlaceholders.forEach((key) => {
    const occurrences = matches.filter((m) => m.placeholder === key);
    console.log(`  • ${key.padEnd(35)} (Found in ${occurrences.map((o) => `${o.file}:${o.line}`).join(", ")})`);
  });

  if (isStrictProd) {
    console.error("\n❌ [FAIL] Production build failed because unreplaced [[PLACEHOLDER]] values remain.");
    console.error("To launch a live cafe, replace all [[PLACEHOLDER]] keys in src/config/cafe.config.ts and content/.\n");
    process.exit(1);
  } else {
    console.warn("\n⚠️  [TEMPLATE MODE] Placeholders are allowed during development/preview.");
    console.warn("Run with STRICT_PROD=true when doing a strict production client deployment.\n");
  }
}
