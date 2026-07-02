<script lang="ts">
	let {
		items,
		reverse = false,
		accent = 'var(--magenta)'
	}: { items: string[]; reverse?: boolean; accent?: string } = $props();

	// duplicate the content so the scroll loops seamlessly
	const loop = $derived([...items, ...items]);
</script>

<div class="marquee" style="--accent:{accent}">
	<div class="track" class:reverse aria-hidden="true">
		{#each loop as item, i (i)}
			<span class="item">{item}</span>
			<span class="dot">✦</span>
		{/each}
	</div>
	<span class="sr-only">{items.join(' · ')}</span>
</div>

<style>
	.marquee {
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		border-block: 2px solid var(--hairline);
		padding: 0.55em 0;
		background: rgba(10, 4, 16, 0.35);
		/* fade the edges so text dissolves rather than clips */
		-webkit-mask-image: linear-gradient(
			90deg,
			transparent,
			#000 8%,
			#000 92%,
			transparent
		);
		mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
	}

	.track {
		display: inline-flex;
		align-items: center;
		gap: 1.6rem;
		padding-left: 1.6rem;
		will-change: transform;
		animation: scroll 30s linear infinite;
	}

	.track.reverse {
		animation-direction: reverse;
	}

	.item {
		font-family: var(--display);
		font-weight: 800;
		font-size: clamp(1.4rem, 4vw, 2.6rem);
		text-transform: uppercase;
		letter-spacing: -0.01em;
		color: color-mix(in srgb, var(--ink) 88%, transparent);
	}

	.dot {
		color: var(--accent);
		font-size: clamp(1rem, 3vw, 1.8rem);
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
	}

	/* Pinned to the marquee's origin (which is now position:relative) so the
	   marquee's overflow:hidden clips it — otherwise this absolute span lands at
	   the far end of the very wide scrolling track and pushes the page width out,
	   causing horizontal scroll on browsers where html{overflow-x:clip} is weaker. */
	.sr-only {
		position: absolute;
		top: 0;
		left: 0;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}
</style>
