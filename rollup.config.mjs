import commonjs from "@rollup/plugin-commonjs";

import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };

import sass from "node-sass";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";
import url from "postcss-url";

export default {
	input: "index.js",
	output: [
		{
			name: "configer",
			file: pkg.browser,
			format: "umd",
		},
		{
			file: pkg.module,
			format: "es",
		},
	],
	plugins: [
		postcss({
			preprocessor: (content, id) =>
				new Promise((resolve, reject) => {
					const result = sass.renderSync({ file: id });
					resolve({ code: result.css.toString() });
				}),
			plugins: [
				autoprefixer,
				url({
					url: "inline",
					maxSize: 200,
					fallback: "copy",
				}),
			],
			extract: "style.css",
			extensions: [".scss", ".sass", ".css"],
		}),
		commonjs(),
		terser({
			format: {
				comments: false,
			},
		}),

		// scss({
		// 	url
		// 	fileName: "style.css",
		// 	failOnError: true,
		// 	runtime: sass,
		// 	outputStyle: "",
		// 	outputStyle: "compressed",
		// }),
	],
};
