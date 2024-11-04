import path from "node:path"
import { fileURLToPath } from "node:url"
import { fixupConfigRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import queryPlugin from "@tanstack/eslint-plugin-query"
import prettierConfigRecommended from "eslint-plugin-prettier/recommended"
import tailwindPlugin from "eslint-plugin-tailwindcss"
import ts from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const patchedConfig = fixupConfigRules([...compat.extends("next/core-web-vitals")])

const config = [
  ...patchedConfig,
  ...ts.configs.recommended,
  ...tailwindPlugin.configs["flat/recommended"],
  ...queryPlugin.configs["flat/recommended"],
  prettierConfigRecommended,
  {
    ignores: [".next/*"],
    rules: {
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-custom-classname": "error",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/no-contradicting-classname": "error",
    },
  },
]

export default config
