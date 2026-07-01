<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import favicon from '$lib/assets/favicon.svg';
	import { band, members, links, awards, siteUrl, contactEmail, seoKeywords } from '$lib/data';

	let { children } = $props();

	// Vercel Web Analytics
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	const title = `${band.name} (SMSCR) — jazz psychédélique · Lyon`;
	const description = band.intro;
	const canonical = `${siteUrl}/`;
	const ogImage = `${siteUrl}/og.png`;

	// Structured data for rich results (schema.org MusicGroup)
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'MusicGroup',
		name: band.name,
		alternateName: band.short,
		url: canonical,
		email: contactEmail,
		description: band.intro,
		image: ogImage,
		genre: ['Jazz', 'Progressive fusion', 'Jazz psychédélique', 'Funk', 'Punk'],
		foundingLocation: { '@type': 'Place', name: band.city },
		award: awards[0],
		member: members.map((m) => ({ '@type': 'Person', name: m.name })),
		sameAs: links.map((l) => l.url)
	});

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
	<link rel="apple-touch-icon" href={favicon} />
	<link rel="canonical" href={canonical} />

	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={seoKeywords.join(', ')} />
	<meta name="author" content={band.name} />
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<meta name="theme-color" content="#0a0410" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={band.name} />
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="SuperMegaSuperCool Révolution" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content="SuperMegaSuperCool Révolution" />

	<!-- Structured data -->
	{@html `<script type="application/ld+json">${jsonLd}</${'script'}>`}
</svelte:head>

<div class="aurora" aria-hidden="true"></div>
<div class="spotlight" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

{@render children()}
