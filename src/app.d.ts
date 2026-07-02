// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	// Injected by Vite `define` (see vite.config.ts): the date the site was built,
	// as an ISO "YYYY-MM-DD" string. Used for SSR/hydration-stable date logic.
	const __BUILD_DATE__: string;

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
