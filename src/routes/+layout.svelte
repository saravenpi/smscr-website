<script lang="ts">
	import '../app.css';
	// Self-hosted fonts (no third-party request, no FOUT from Google Fonts).
	// Weights match app.css: Syne 600/700/800 (display), Space Grotesk 400/500/700 (body).
	import '@fontsource/syne/600.css';
	import '@fontsource/syne/700.css';
	import '@fontsource/syne/800.css';
	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/700.css';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import favicon from '$lib/assets/favicon.svg';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import {
		band,
		members,
		releases,
		shows,
		links,
		awards,
		siteUrl,
		contactEmail,
		metaDescription
	} from '$lib/data';

	let { children } = $props();

	// Vercel Web Analytics
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	const title = `${band.name} (SMSCR) — jazz psychédélique · Lyon`;
	const description = metaDescription;
	const canonical = `${siteUrl}/`;
	const ogImage = `${siteUrl}/og.jpg`;

	// Structured data (schema.org @graph): the band + its discography + its gigs.
	const bandId = `${canonical}#band`;

	const albumReleaseType: Record<string, string> = {
		Album: 'https://schema.org/AlbumRelease',
		EP: 'https://schema.org/EPRelease',
		Single: 'https://schema.org/SingleRelease'
	};

	const bandNode = {
		'@type': 'MusicGroup',
		'@id': bandId,
		name: band.name,
		alternateName: band.short,
		url: canonical,
		email: contactEmail,
		description: band.intro,
		image: ogImage,
		genre: ['Jazz', 'Progressive fusion', 'Jazz psychédélique', 'Funk', 'Punk'],
		foundingLocation: { '@type': 'Place', name: band.city },
		award: awards,
		member: members.map((m) => ({ '@type': 'Person', name: m.name })),
		sameAs: links.map((l) => l.url),
		album: releases.map((r) => ({
			'@type': 'MusicAlbum',
			name: r.title,
			datePublished: r.year,
			albumReleaseType: albumReleaseType[r.type],
			byArtist: { '@id': bandId },
			...(r.link ? { url: r.link } : {}),
			...(r.tracks
				? {
						numTracks: r.tracks.length,
						track: r.tracks.map((t, i) => ({
							'@type': 'MusicRecording',
							position: i + 1,
							name: t
						}))
					}
				: {})
		}))
	};

	// One MusicEvent per gig so Google can surface them as event rich results.
	// `endDate` (multi-day festivals) and `offers` are what Google needs for the
	// rich result — but only for gigs that haven't happened yet: asserting an
	// available/in-stock offer on a show we already played is false. We compare
	// against the build date (inlined identically server- and client-side, so the
	// <head> JSON-LD doesn't diverge on hydration) and only emit what we know
	// (link + availability; price 0 for free gigs), never a fabricated price.
	const eventNodes = shows.map((s) => {
		const isPast = (s.endDate ?? s.date) < __BUILD_DATE__;
		return {
			'@type': 'MusicEvent',
			name: `${band.name} · ${s.venue}`,
			startDate: s.date,
			...(s.endDate ? { endDate: s.endDate } : {}),
			eventStatus: 'https://schema.org/EventScheduled',
			eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
			location: { '@type': 'Place', name: s.venue, address: s.city },
			performer: { '@id': bandId },
			url: s.link ?? canonical,
			...(s.free ? { isAccessibleForFree: true } : {}),
			...(isPast
				? {}
				: {
						offers: {
							'@type': 'Offer',
							url: s.link ?? canonical,
							availability: 'https://schema.org/InStock',
							...(s.free ? { price: '0', priceCurrency: 'EUR' } : {})
						}
					})
		};
	});

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [bandNode, ...eventNodes]
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

	// back-to-top button: show after scrolling down, smooth-scroll to top
	let showTop = $state(false);
	onMount(() => {
		const onScroll = () => (showTop = window.scrollY > 500);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
	function scrollToTop() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<link rel="canonical" href={canonical} />

	<title>{title}</title>
	<meta name="description" content={description} />
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

<button
	class="to-top"
	class:show={showTop}
	type="button"
	onclick={scrollToTop}
	aria-label="Remonter en haut de la page"
>
	<ArrowUp size={22} strokeWidth={2.5} />
</button>

<style>
	.to-top {
		position: fixed;
		bottom: clamp(1rem, 3vw, 2rem);
		right: clamp(1rem, 3vw, 2rem);
		z-index: 45;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 999px;
		border: 1px solid rgba(246, 241, 255, 0.25);
		background: rgba(10, 4, 16, 0.6);
		backdrop-filter: blur(10px);
		color: var(--ink);
		cursor: pointer;
		opacity: 0;
		transform: translateY(12px);
		pointer-events: none;
		transition:
			opacity 0.3s var(--ease),
			transform 0.3s var(--ease),
			background 0.2s var(--ease),
			border-color 0.2s var(--ease);
	}
	.to-top.show {
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}
	.to-top:hover {
		background: var(--magenta);
		border-color: var(--magenta);
		color: #0a0410;
	}
	.to-top:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
	}
	@media (prefers-reduced-motion: reduce) {
		.to-top {
			transition: opacity 0.3s var(--ease);
			transform: none;
		}
	}
</style>
