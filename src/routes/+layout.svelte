<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import favicon from '$lib/assets/favicon.svg';
	import { band } from '$lib/data';

	let { children } = $props();

	// Vercel Web Analytics
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	const title = `${band.name} — jazz psychédélique · Lyon`;
	const description = band.intro;

	// pointer-following spotlight glow (desktop only, motion-safe)
	onMount(() => {
		const fine = window.matchMedia('(pointer: fine)').matches;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!fine || reduce) return;

		const el = document.querySelector<HTMLElement>('.spotlight');
		const root = document.documentElement;
		let raf = 0;
		let x = 50;
		let y = 50;

		const apply = () => {
			raf = 0;
			root.style.setProperty('--mx', `${x}%`);
			root.style.setProperty('--my', `${y}%`);
			el?.classList.add('active');
		};
		const move = (e: PointerEvent) => {
			x = (e.clientX / window.innerWidth) * 100;
			y = (e.clientY / window.innerHeight) * 100;
			if (!raf) raf = requestAnimationFrame(apply);
		};

		window.addEventListener('pointermove', move, { passive: true });
		return () => {
			window.removeEventListener('pointermove', move);
			cancelAnimationFrame(raf);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<div class="aurora" aria-hidden="true"></div>
<div class="spotlight" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

{@render children()}
