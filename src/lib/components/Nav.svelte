<script lang="ts">
	import { base } from '$app/paths';
	import { magnetic } from '$lib/magnetic';
	import { links } from '$lib/data';
	import Play from '@lucide/svelte/icons/play';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';

	const bandcamp = links.find((l) => l.label === 'Bandcamp')?.url ?? '#';

	// Absolute (home-anchored) links so the nav works identically on every route.
	const nav = [
		{ href: `${base}/#groupe`, label: 'Le groupe' },
		{ href: `${base}/#membres`, label: 'Membres' },
		{ href: `${base}/#musique`, label: 'Musique' },
		{ href: `${base}/#live`, label: 'Live' },
		{ href: `${base}/dates`, label: 'Dates' },
		{ href: `${base}/#presse`, label: 'Presse' },
		{ href: `${base}/#contact`, label: 'Contact' }
	];

	let menuOpen = $state(false);
	let headerEl: HTMLElement;

	// Close the mobile menu on Escape or a click/tap outside the header
	// (WAI-ARIA disclosure pattern: dismissible, not a focus-trapped modal).
	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) menuOpen = false;
	}
	function onOutsidePointer(e: PointerEvent) {
		if (menuOpen && headerEl && !headerEl.contains(e.target as Node)) menuOpen = false;
	}
</script>

<svelte:window onkeydown={onKeydown} onpointerdown={onOutsidePointer} />

<header class="nav" bind:this={headerEl}>
	<div class="wrap nav-inner">
		<a class="brand" href="{base}/" onclick={() => (menuOpen = false)}>SMSCR</a>
		<nav id="primary-nav" class="nav-links" class:open={menuOpen} aria-label="Navigation principale">
			{#each nav as item (item.href)}
				<a href={item.href} onclick={() => (menuOpen = false)}>{item.label}</a>
			{/each}
		</nav>
		<div class="nav-actions">
			<a class="nav-cta" href={bandcamp} target="_blank" rel="noopener" use:magnetic>
				<Play size={15} strokeWidth={2.5} fill="currentColor" />
				Écouter
			</a>
			<button
				type="button"
				class="nav-toggle"
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={menuOpen}
				aria-controls="primary-nav"
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}<X size={22} />{:else}<Menu size={22} />{/if}
			</button>
		</div>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 50;
		backdrop-filter: blur(14px);
		background: rgba(10, 4, 16, 0.6);
		border-bottom: 1px solid rgba(246, 241, 255, 0.1);
	}
	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 64px;
	}
	.brand {
		font-family: var(--display);
		font-weight: 800;
		font-size: 1.5rem;
		text-decoration: none;
		letter-spacing: 0.02em;
	}
	.nav-links {
		display: flex;
		gap: clamp(1rem, 2.4vw, 1.8rem);
	}
	.nav-links a {
		position: relative;
		text-decoration: none;
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--ink-dim);
		transition: color 0.2s var(--ease);
	}
	.nav-links a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -6px;
		width: 100%;
		height: 2px;
		background: var(--magenta);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.25s var(--ease);
	}
	.nav-links a:hover {
		color: var(--ink);
	}
	.nav-links a:hover::after {
		transform: scaleX(1);
	}
	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.nav-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.45em;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9rem;
		padding: 0.5em 1.15em;
		border-radius: 999px;
		background: var(--lime);
		color: #0a0410;
		transition: transform 0.15s var(--ease);
	}
	.nav-cta:hover {
		transform: translateY(-2px);
	}
	.nav-toggle {
		display: none;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 999px;
		background: transparent;
		color: var(--ink);
		border: 1.5px solid rgba(246, 241, 255, 0.28);
		cursor: pointer;
		transition:
			color 0.2s var(--ease),
			border-color 0.2s var(--ease);
	}
	.nav-toggle:hover {
		color: var(--magenta);
		border-color: var(--magenta);
	}

	.nav a:focus-visible,
	.nav-toggle:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
		border-radius: 6px;
	}

	@media (max-width: 900px) {
		.nav-toggle {
			display: inline-flex;
		}
		.nav-links {
			position: absolute;
			top: 64px;
			left: 0;
			right: 0;
			flex-direction: column;
			gap: 0.4rem;
			padding: 0.8rem var(--gutter) 1.2rem;
			background: rgba(10, 4, 16, 0.96);
			backdrop-filter: blur(14px);
			border-bottom: 1px solid rgba(246, 241, 255, 0.12);
			transform: translateY(-8px);
			opacity: 0;
			pointer-events: none;
			transition:
				opacity 0.2s var(--ease),
				transform 0.2s var(--ease);
		}
		.nav-links.open {
			opacity: 1;
			transform: none;
			pointer-events: auto;
		}
		.nav-links a {
			padding: 0.55rem 0;
			font-size: 1.05rem;
		}
	}

	@media (max-width: 520px) {
		.nav-cta {
			padding: 0.5em 0.95em;
		}
	}

	/* very small phones (≤360px, e.g. iPhone SE): shrink the brand + CTA so the
	   sticky bar's brand + actions fit the row without pushing horizontal scroll */
	@media (max-width: 380px) {
		.nav-inner {
			gap: 0.5rem;
		}
		.brand {
			font-size: 1.25rem;
		}
		.nav-cta {
			padding: 0.45em 0.8em;
			font-size: 0.82rem;
		}
	}
</style>
