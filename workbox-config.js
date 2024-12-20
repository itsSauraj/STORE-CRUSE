module.exports = {
	globDirectory: "dist/",
	globPatterns: ["**/*.{html,js,css,png,jpg,svg}"],
	swDest: "dist/service-worker.js",
	runtimeCaching: [
		{
			urlPattern: ({ request }) => request.destination === "image",
			handler: "CacheFirst",
			options: {
				cacheName: "images-cache",
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 30 * 24 * 60 * 60 * 12,
				},
			},
		},
	],
};
