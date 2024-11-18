import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  splitting: true,
  dts: true,
  outDir: 'dist',
  format: ['esm', 'cjs'],
  skipNodeModulesBundle: true,
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  clean: true
})
