import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	files: {
		assets: 'static',
		routes: 'src/routes',
		template: 'src/app.html'
	},
	kit: {
		adapter: adapter(),
		target: '#app'
	}
};

export default config;
