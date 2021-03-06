module.exports = {
	mode: "jit",
	content: [
		"./components/**/*.{js,jsx,ts,tsx}",
		"./pages/**/*.{js,jsx,ts,tsx}",
	],
	// darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"base-blue-100": "#005b96",
				"base-light-blue-100": "#f1fafe",
				"base-gray-100": "#f3f6f9",
				"base-gray-200": "#7e8299",
				"base-yellow-100": "#f6ca65",
				"base-black-100": "#011f4b",
				"base-green-100": "#1bc5bd",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
