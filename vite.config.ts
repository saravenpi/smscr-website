import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Root-domain hosts (Vercel at smscr.fr) need no base path. Only set BASE_PATH
// if you ever serve from a sub-path (e.g. https://<user>.github.io/<repo>).
const base = process.env.BASE_PATH ?? '';

// Frozen at build time and inlined into BOTH the server (prerender) and client
// bundles, so date-dependent logic (upcoming/past gig split, © year, JSON-LD)
// renders identically on the server and during hydration — no mismatch. A
// client-side onMount() then refreshes to the real "today" after hydration.
const buildDate = new Date().toISOString().slice(0, 10);

export default defineConfig({
	define: {
		__BUILD_DATE__: JSON.stringify(buildDate)
	},
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({
				fallback: '404.html'
			}),
			paths: {
				base
			}
		})
	],
	ssr: {
		// @lucide/svelte ships raw .svelte icon files; force Vite to compile them
		// for SSR (dev + prerender) instead of letting Node import them directly,
		// which throws "Unknown file extension .svelte".
		noExternal: ['@lucide/svelte']
	}
});
