import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

//import typescript from '@rollup/plugin-typescript';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
		server: {
			hmr: {
				clientPort: 5173,
				port: 5173,
				 path: "/vite-hmr"
			},
			port: 5173,
			strictPort: true,
			watch: {
				usePolling: false //process.env.USE_POLLING,
			},
			host: '0.0.0.0',
		}
	
});
