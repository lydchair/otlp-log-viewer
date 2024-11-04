import type { NextConfig } from "next"

/**
 * We import the environment variables file here so that the `next build`
 * or `next dev` command will notify us of environment variable validation errors.
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 */
import "./env.mjs"

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
