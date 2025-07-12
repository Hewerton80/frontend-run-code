import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), tailwindcss()],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
  },
});
