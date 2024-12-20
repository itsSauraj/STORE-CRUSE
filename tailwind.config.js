/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"paper": "#F0EDE4",
				"secondary": "#DAD1C4",
				"color-secondary": "#DAD1C4",
				"primary": "#2e2d2c",
				"color-primary": "#2e2d2c",

				"error": "#e3342f",
				"warn": "#f6993f",
				"success": "#38c172",
				"info": "#3490dc",

				// SVG Fills
				"fill-default": "#3a3a3a",
				"fill-primary": "#2e2d2c",
				"fill-secondary": "#DAD1C4",
			},
			backgroundImage: {
				"slant-lines-primary":
					"url('/src/assets/images/pattern-slant-lines.svg')",
				"slant-lines-secondary":
					"url('/src/assets/images/pattern-slant-lines-light.png')",
				"texture":
					"url('/src/assets/svg/noise.svg')",
			},
			backgroundSize: {
				size1: "100px 100px",
				size2: "256px 256px",
				size3: "512px 512px",
				size4: "1000px 1000px",
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
