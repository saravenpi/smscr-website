<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { band, releases, links, featuredVideoId } from '$lib/data';
	import Disc3 from '@lucide/svelte/icons/disc-3';

	// Spotify artist id parsed from the links list so the player stays in sync
	// with data.ts. YouTube uses an explicit featured-video id (the YouTube link
	// is a profile URL for `sameAs`, not necessarily an embeddable video).
	const spotifyId = links
		.find((l) => l.label === 'Spotify')
		?.url.match(/artist\/([A-Za-z0-9]+)/)?.[1];
	const ytId = featuredVideoId;
</script>

<!-- MUSIC -->
<section id="musique">
	<div class="wrap">
		<div class="reveal" use:reveal>
			<p class="eyebrow"><Disc3 size={13} />Discographie</p>
			<h2 class="section-title">La musique</h2>
		</div>
		{#if spotifyId || ytId}
			<div class="players reveal" use:reveal={{ delay: 80 }}>
				{#if spotifyId}
					<iframe
						class="player player-spotify"
						title="{band.name} sur Spotify"
						src="https://open.spotify.com/embed/artist/{spotifyId}?theme=0"
						loading="lazy"
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						allowfullscreen
					></iframe>
				{/if}
				{#if ytId}
					<div class="player player-video">
						<iframe
							title="{band.name} sur YouTube"
							src="https://www.youtube-nocookie.com/embed/{ytId}"
							loading="lazy"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				{/if}
			</div>
		{/if}
		<div class="releases">
			{#each releases as r, i (r.title)}
				<article class="release card reveal" use:reveal={{ delay: i * 100 }}>
					{#if r.cover}
						<img
							class="release-cover"
							src={r.cover}
							alt="Pochette de « {r.title} »"
							loading="lazy"
							width="700"
							height="700"
						/>
					{/if}
					<div class="release-meta">
						<span class="release-type">{r.type}</span>
						<span class="release-year">{r.year}</span>
					</div>
					<h3 class="release-title">{r.title}</h3>
					{#if r.label}<p class="release-label">Label · {r.label}</p>{/if}
					{#if r.note}<p class="release-note">{r.note}</p>{/if}
					{#if r.link}
						<a class="btn btn-primary sm" href={r.link} target="_blank" rel="noopener">
							<Disc3 size={16} />
							Écouter sur Bandcamp
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	/* ---------- MUSIC ---------- */
	.players {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin: 2rem 0 2.6rem;
		align-items: start;
	}
	.player {
		width: 100%;
		border: 0;
		border-radius: var(--radius);
	}
	.player-spotify {
		height: 352px;
	}
	.player-video {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
	}
	.player-video iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
	/* Side-by-side (2-col) layout: pin the video to the Spotify embed's fixed
	   352px so the grid row is even — otherwise the shorter 16:9 video leaves a
	   gap beneath it. Stacked on narrow screens, the video keeps its 16:9 ratio. */
	@media (min-width: 700px) {
		.player-video {
			aspect-ratio: auto;
			height: 352px;
		}
	}
	.releases {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}
	.release {
		display: flex;
		flex-direction: column;
		padding: clamp(1.4rem, 3vw, 2rem);
	}
	/* push the CTA to the bottom so buttons align across a row of equal-height cards */
	.release .btn {
		margin-top: auto;
		align-self: flex-start;
	}
	.release-cover {
		display: block;
		width: 100%;
		/* height:auto overrides the width/height="700" presentation hint, so the
		   image keeps its square ratio instead of being forced to 700px tall */
		height: auto;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: calc(var(--radius) - 6px);
		margin-bottom: 1.1rem;
	}
	.release-meta {
		display: flex;
		justify-content: space-between;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: 1rem;
	}
	.release-type {
		color: var(--magenta);
	}
	.release-year {
		color: var(--ink-dim);
	}
	.release-title {
		font-size: clamp(1.3rem, 2.5vw, 1.6rem);
		font-weight: 700;
		margin-bottom: 0.5rem;
	}
	.release-label {
		color: var(--cyan);
		font-size: 0.85rem;
		margin: 0 0 0.7rem;
	}
	.release-note {
		color: var(--ink-dim);
		font-style: italic;
		margin: 0 0 1rem;
	}
</style>
