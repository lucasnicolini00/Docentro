#!/usr/bin/env node
/**
 * i18n parity check script (multi-locale)
 * - Auto-detects all locale folders under /messages (e.g. en, es, fr, pt-BR)
 * - Compares namespace file presence and flattened key sets against a base locale (default: first alphabetically or --base)
 * - Supports JSON output via --json for CI pipelines
 * - Exit codes: 0 = OK, 1 = mismatches/errors
 */
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const wantJson = args.includes("--json");
const baseArgIndex = args.findIndex((a) => a.startsWith("--base="));
const baseOverride =
  baseArgIndex >= 0 ? args[baseArgIndex].split("=")[1] : null;

const localesDir = path.join(process.cwd(), "messages");
if (!fs.existsSync(localesDir)) {
  console.error("messages directory not found");
  process.exit(1);
}

const localeFolders = fs
  .readdirSync(localesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

if (localeFolders.length === 0) {
  console.error("No locale folders found under messages");
  process.exit(1);
}

const baseLocale =
  baseOverride && localeFolders.includes(baseOverride)
    ? baseOverride
    : localeFolders[0];

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function flattenKeys(obj, prefix = "", out = new Set()) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      const full = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object" && !Array.isArray(v)) {
        flattenKeys(v, full, out);
      } else {
        out.add(full);
      }
    }
  }
  return out;
}

function getNamespaceFiles(locale) {
  const dir = path.join(localesDir, locale);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort();
}

const baseFiles = getNamespaceFiles(baseLocale);
let hasErrors = false;
const reports = {
  baseLocale,
  locales: localeFolders,
  issues: [],
};

for (const locale of localeFolders) {
  if (locale === baseLocale) continue; // skip comparing base to itself
  const targetFiles = getNamespaceFiles(locale);
  const missingInTarget = baseFiles.filter((f) => !targetFiles.includes(f));
  const extraInTarget = targetFiles.filter((f) => !baseFiles.includes(f));
  if (missingInTarget.length || extraInTarget.length) {
    hasErrors = true;
    reports.issues.push({
      type: "file-mismatch",
      locale,
      missingInTarget,
      extraInTarget,
    });
  }

  const commonFiles = baseFiles.filter((f) => targetFiles.includes(f));
  for (const file of commonFiles) {
    const baseJson = readJson(path.join(localesDir, baseLocale, file));
    const targetJson = readJson(path.join(localesDir, locale, file));
    if (!baseJson || !targetJson) {
      hasErrors = true;
      reports.issues.push({ type: "parse-error", locale, file });
      continue;
    }
    const baseKeys = flattenKeys(baseJson);
    const targetKeys = flattenKeys(targetJson);
    const missingKeys = [...baseKeys].filter((k) => !targetKeys.has(k));
    const extraKeys = [...targetKeys].filter((k) => !baseKeys.has(k));
    if (missingKeys.length || extraKeys.length) {
      hasErrors = true;
      reports.issues.push({
        type: "key-mismatch",
        locale,
        file,
        missingKeys,
        extraKeys,
      });
    }
  }
}

if (wantJson) {
  console.log(JSON.stringify(reports, null, 2));
  process.exit(hasErrors ? 1 : 0);
}

if (!hasErrors) {
  console.log(
    `✅ i18n parity OK across locales. Base: ${baseLocale}. Locales: ${localeFolders.join(", ")}`
  );
  process.exit(0);
}

console.log("❌ i18n parity issues found");
console.log(`Base locale: ${baseLocale}`);
for (const issue of reports.issues) {
  if (issue.type === "file-mismatch") {
    console.log(` [${issue.locale}] File presence mismatch:`);
    if (issue.missingInTarget.length)
      console.log("   Missing:", issue.missingInTarget.join(", "));
    if (issue.extraInTarget.length)
      console.log("   Extra:", issue.extraInTarget.join(", "));
  } else if (issue.type === "parse-error") {
    console.log(` [${issue.locale}] Parse error in ${issue.file}`);
  } else if (issue.type === "key-mismatch") {
    console.log(` [${issue.locale}] Key mismatch in ${issue.file}:`);
    if (issue.missingKeys.length)
      console.log("   Missing keys:", issue.missingKeys.join(", "));
    if (issue.extraKeys.length)
      console.log("   Extra keys:", issue.extraKeys.join(", "));
  }
}
process.exit(1);
