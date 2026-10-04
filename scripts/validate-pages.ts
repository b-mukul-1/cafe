import fs from "fs";
import path from "path";

const outDir = path.resolve(process.cwd(), "out");

if (!fs.existsSync(outDir)) {
  console.error("Error: Static export directory 'out/' does not exist. Run 'next build' first.");
  process.exit(1);
}

// Recursively find all .html files
function getHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith(".html")) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(outDir);
let hasErrors = false;

console.log("\n=======================================================");
console.log("   A2 CAFE: STATIC PAGES SEO & HEADING AUDIT CHECK     ");
console.log("=======================================================\n");

for (const filePath of htmlFiles) {
  const relPath = path.relative(outDir, filePath);
  const html = fs.readFileSync(filePath, "utf-8");

  const is404 = relPath.includes("404") || relPath.includes("not-found");

  // 1. Check <title>
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const hasTitle = Boolean(titleMatch && titleMatch[1].trim());

  // 2. Check <meta name="description">
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const hasDesc = Boolean(descMatch && descMatch[1].trim());

  // 3. Check canonical tag (mandatory for indexable pages)
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                         html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const hasCanonical = Boolean(canonicalMatch && canonicalMatch[1].trim());

  // 4. Check <h1> count: must be EXACTLY ONE
  const h1Matches = html.match(/<h1(\s|>)/gi);
  const h1Count = h1Matches ? h1Matches.length : 0;

  const pageErrors: string[] = [];
  if (!hasTitle) pageErrors.push("Missing <title>");
  if (!hasDesc && !is404) pageErrors.push("Missing <meta name=\"description\">");
  if (!hasCanonical && !is404) pageErrors.push("Missing <link rel=\"canonical\">");
  if (h1Count !== 1) pageErrors.push(`Expected exactly 1 <h1>, but found ${h1Count}`);

  if (pageErrors.length > 0) {
    hasErrors = true;
    console.error(`❌ [FAIL] ${relPath}:`);
    pageErrors.forEach((err) => console.error(`    - ${err}`));
  } else {
    console.log(`✓ [PASS] ${relPath} (H1 count: 1, Title: "${titleMatch ? titleMatch[1].slice(0, 30) : ""}...", Canonical: OK)`);
  }
}

console.log("\n-------------------------------------------------------");
if (hasErrors) {
  console.error("❌ Static HTML validation failed. Please fix the heading or metadata errors above.\n");
  process.exit(1);
} else {
  console.log(`✓ All ${htmlFiles.length} static HTML pages passed technical SEO and accessibility checks!\n`);
}
