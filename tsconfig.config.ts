import { defineConfig } from "cypress";

export default defineConfig({
  compilerOptions: {
    target: "es5",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    incremental: true,
    plugins: [
      {
        name: "next",
      },
    ],
    paths: {
      "@/*": ["./src/*"],
    },
  },

  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  exclude: ["node_modules"],

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
