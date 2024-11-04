import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {},
  client: {},
  runtimeEnv: {},
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
