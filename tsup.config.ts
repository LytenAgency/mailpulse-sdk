import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
  },
  {
    entry: ["src/react/index.ts"],
    outDir: "dist/react",
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    external: ["react"],
    esbuildOptions(options) {
      options.jsx = "automatic";
    },
  },
  {
    entry: ["src/vue/index.ts"],
    outDir: "dist/vue",
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    external: ["vue"],
  },
]);
