import { defineConfig } from "vitest/config";
import type { UserConfig } from "vite";
import { mergeConfig } from "vite";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig as UserConfig,
  defineConfig({
    test: {
      globals: true,
      setupFiles: ["@vitest/web-worker", "./app/tests/setup.js"],
      environment: "jsdom",
      passWithNoTests: true,
      // vitest-canvas-mock config
      deps: {
        inline: ["vitest-canvas-mock"],
      },
      threads: false,
      environmentOptions: {
        jsdom: {
          resources: "usable",
        },
      },
    },
  })
);
