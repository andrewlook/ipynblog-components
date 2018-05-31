import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

var outputFile = 'dist/components.js';
if (!production) {
    outputFile = 'public/components.js';
}
console.log("writing to output file: " + outputFile);

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		file: outputFile,
		name: 'app'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,

			customElement: true,

			// this results in smaller CSS files
			cascade: false
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		// If we're building for production (npm run build
		// instead of npm run dev), transpile and minify
		production && buble({ exclude: 'node_modules/**' })
        
        //,
		//production && uglify()
	]
};
