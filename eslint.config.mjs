import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
  {
    ignores: [".next/**", ".open-next/**", "node_modules/**", "dist/**"],
  },
  {
    extends: [...next],
  },
]);
