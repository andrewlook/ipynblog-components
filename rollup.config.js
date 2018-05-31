import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const componentsES6 = {
	input: 'src/components.js',
	output: {
		sourcemap: true,
		format: 'umd', // usable by both browsers and Node.js
		file: 'dist/components.js',
		name: 'components'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			customElement: true,
			// this results in smaller CSS files
			cascade: false
		}),
		resolve(),
		commonjs(),
		production && terser(),
	]
};

const componentsES5 = {
    input: 'src/components.js',
    output: {
        sourcemap: true,
        format: 'umd', // usable by both browsers and Node.js
        file: 'dist/components.es5.js',
        name: 'components'
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            customElement: true,
            // this results in smaller CSS files
            cascade: false
        }),
        resolve(),
        commonjs(),
        // If we're building for production (npm run build
        // instead of npm run dev), transpile and minify
        production && buble({
            exclude: 'node_modules/**',
        }),
        production && terser(),
    ]
};

const exampleES5 = {
	input: 'bundles/example.js',
	output: {
		sourcemap: true,
		format: 'iife',
		file: 'public/exampleBundle.js',
		name: 'example'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			customElement: true,
			// this results in smaller CSS files
			cascade: false
		}),
		resolve(),
		commonjs(),
        // If we're building for production (npm run build
        // instead of npm run dev), transpile and minify
        production && buble({
			exclude: 'node_modules/**',
			transforms: {
				forOf: false,
			}
		}),
        production && terser(),
	]
};

const distillLocal = {
    input: 'bundles/distill.js',
    output: {
        sourcemap: true,
        format: 'iife',
        file: 'public/distillBundle.js',
        name: 'distillBundle'
    },
    plugins: [
        resolve(),
        commonjs(),

    ]
};

export default [
    componentsES6,
	componentsES5,
    exampleES5,
	distillLocal,
]
