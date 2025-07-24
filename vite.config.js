import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,           // 👈 allow external devices on LAN
        port: 3000,           // 👈 or any port you prefer
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
