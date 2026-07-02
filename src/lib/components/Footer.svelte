<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal';
	import { band, links } from '$lib/data';
	import Instagram from '$lib/components/Instagram.svelte';
	import Disc3 from '@lucide/svelte/icons/disc-3';
	import AudioLines from '@lucide/svelte/icons/audio-lines';
	import Radio from '@lucide/svelte/icons/radio';
	import Film from '@lucide/svelte/icons/film';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import Mail from '@lucide/svelte/icons/mail';

	// icon per streaming/social platform (Lucide dropped brand icons; Instagram uses our own glyph)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const socialIcon: Record<string, any> = {
		Bandcamp: Disc3,
		Spotify: AudioLines,
		Deezer: Radio,
		Instagram,
		YouTube: Film
	};

	// Build year for SSR/hydration parity (see Shows.svelte); onMount bumps it to
	// the real current year so the © line self-corrects on an aging deploy.
	let year = $state(Number(__BUILD_DATE__.slice(0, 4)));
	onMount(() => {
		year = new Date().getFullYear();
	});
</script>

<footer id="contact">
	<div class="wrap footer-inner">
		<div class="footer-cta reveal" use:reveal>
			<h2 class="section-title">Suivez la révolution</h2>
			<div class="socials">
				{#each links as l (l.url)}
					{@const Icon = socialIcon[l.label] ?? ExternalLink}
					<a class="social" href={l.url} target="_blank" rel="noopener">
						<Icon size={16} />
						{l.label}
						<ArrowUpRight class="social-arrow" size={14} />
					</a>
				{/each}
			</div>
			<a class="footer-mail" href="mailto:contact@smscr.fr">
				<Mail size={18} />
				contact@smscr.fr
			</a>
		</div>
		<div class="footer-meta reveal" use:reveal={{ delay: 120 }}>
			<p class="footer-band">{band.name}</p>
			<p class="footer-city">{band.city}</p>
			<p class="footer-thanks">Merci à Antonio Di Giovanesco.</p>
			<p class="footer-legal">
				© {year} SMSCR — Site fait avec ✦ et beaucoup de fusion.
			</p>
		</div>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid rgba(246, 241, 255, 0.14);
		padding: clamp(56px, 8vw, 104px) 0 clamp(40px, 5vw, 56px);
	}
	.footer-inner {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: clamp(2rem, 5vw, 3rem);
		align-items: end;
	}
	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 1.6rem;
	}
	.social {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		text-decoration: none;
		font-weight: 700;
		padding: 0.62em 1.15em;
		border: 1.5px solid rgba(246, 241, 255, 0.3);
		border-radius: 999px;
		transition:
			background 0.2s var(--ease),
			color 0.2s var(--ease),
			transform 0.2s var(--ease);
	}
	.social :global(.social-arrow) {
		color: var(--magenta);
		transition: transform 0.2s var(--ease);
	}
	.social:hover {
		background: var(--ink);
		color: #0a0410;
		transform: translateY(-2px);
	}
	.social:hover :global(.social-arrow) {
		color: #0a0410;
		transform: translate(2px, -2px);
	}
	.social:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
		border-radius: 6px;
	}
	.footer-mail {
		display: inline-flex;
		align-items: center;
		gap: 0.55em;
		margin-top: 1.3rem;
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(1.15rem, 2.6vw, 1.6rem);
		text-decoration: none;
		color: var(--ink);
		width: fit-content;
		border-bottom: 2px solid transparent;
		transition:
			color 0.2s var(--ease),
			border-color 0.2s var(--ease);
	}
	.footer-mail :global(svg) {
		color: var(--magenta);
	}
	.footer-mail:hover {
		color: var(--magenta);
		border-color: var(--magenta);
	}
	.footer-meta {
		text-align: right;
	}
	.footer-thanks {
		color: var(--ink-dim);
		font-size: 0.88rem;
		margin: 0 0 0.2rem;
	}
	.footer-band {
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.15rem;
		margin: 0;
	}
	.footer-city {
		color: var(--ink-dim);
		margin: 0.25rem 0;
	}
	.footer-legal {
		color: var(--ink-dim);
		font-size: 0.82rem;
		margin-top: 1.1rem;
	}

	@media (max-width: 820px) {
		.footer-inner {
			grid-template-columns: 1fr;
			align-items: start;
		}
		.footer-meta {
			text-align: left;
		}
	}
</style>
