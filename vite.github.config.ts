import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.GITHUB_PAGES_BASE || (repo ? `/${repo}/` : "/");

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true },
  },
  nitro: false,
  vite: {
    base,
  },
});
