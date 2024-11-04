/** @type {import("prettier").Config} */
const config = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrder: [
    "^react$",
    "^next$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/env/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/(.*)$",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
}

export default config
