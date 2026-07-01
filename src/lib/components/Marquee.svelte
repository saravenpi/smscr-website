<script lang="ts">
	let {
		items,
		reverse = false,
		accent = 'var(--magenta)'
	}: { items: string[]; reverse?: boolean; accent?: string } = $props();

	// duplicate the content so the scroll loops seamlessly
	const loop = [...items, ...items];
</script>

<div class="marquee" style="--accent:{accent}">
	<div class="track" class:reverse aria-hidden="true">
		{#each loop as item, i (i)}
			<span class="item">{item}</span>
			<span class="dot">✦</span>
		{/each}
	</div>
</div>

<style>
	.marquee {
		overflow: hidden;
		white-space: nowrap;
		border-block: 2px solid rgba(246, 241, 255, 0.16);
		padding: 0.5em 0;
		background: rgba(10, 4, 16, 0.35);
	}

	.track {
		display: inline-flex;
		align-items: center;
		gap: 1.4rem;
		padding-left: 1.4rem;
		will-change: transform;
		animation: scroll 26s linear infinite;
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
</style>
