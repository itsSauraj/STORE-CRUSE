import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			devOptions: {
				enabled: true,
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === "image",
						handler: "CacheFirst",
						options: {
							cacheName: "images-cache",
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
							},
						},
					},
				],
			},
		}),
	],
	assetsInclude: [
		"**/*.svg",
		"**/*.png",
		"**/*.jpg",
		"**/*.gif",
		"**/*.webp",
		"**/*.bmp",
	],
});
