<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { band } from '$lib/data';
	import Home from '@lucide/svelte/icons/house';
	import CalendarDays from '@lucide/svelte/icons/calendar-days';

	const status = $derived(page.status);
	const message = $derived(page.error?.message ?? 'Page introuvable');
</script>

<svelte:head>
	<title>{status} — {band.name} (SMSCR)</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<a class="skip-link" href="#error-main">Aller au contenu</a>

<Nav />

<main id="error-main" tabindex="-1">
	<section>
		<div class="wrap error-inner">
			<p class="eyebrow">Erreur {status}</p>
			<h1 class="error-code">{status}</h1>
			<p class="error-msg">{message}</p>
			<p class="error-sub">
				Cette page s'est perdue dans un solo de fusion. On te ramène en lieu sûr&nbsp;:
			</p>
			<div class="error-cta">
				<a class="btn btn-primary" href="{base}/">
					<Home size={18} strokeWidth={2.5} />
					Retour à l'accueil
				</a>
				<a class="btn btn-ghost" href="{base}/dates">
					<CalendarDays size={18} />
					Voir les dates
				</a>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	main:focus {
		outline: none;
	}
	.error-inner {
		text-align: center;
		max-width: 40ch;
		margin-inline: auto;
	}
	.error-code {
		font-family: var(--display);
		font-weight: 800;
		font-size: clamp(5rem, 24vw, 14rem);
		line-height: 0.9;
		letter-spacing: -0.04em;
		background: linear-gradient(120deg, var(--magenta), var(--cyan), var(--lime));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		margin: 0.1em 0 0.2em;
	}
	.error-msg {
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		margin: 0 0 0.6rem;
	}
	.error-sub {
		color: var(--ink-dim);
		margin: 0 0 2rem;
	}
	.error-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		justify-content: center;
	}
	/* button styles are shared and live in app.css */

	@media (max-width: 520px) {
		.error-cta {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
