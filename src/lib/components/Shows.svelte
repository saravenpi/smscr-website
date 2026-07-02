<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal';
	import { formatShowDate, type Show } from '$lib/data';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Ticket from '@lucide/svelte/icons/ticket';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	let {
		shows,
		pastLimit,
		moreHref
	}: { shows: Show[]; pastLimit?: number; moreHref?: string } = $props();

	// Start from the build date (inlined identically into the server and client
	// bundles) so the prerendered HTML and the hydrating client agree — reading
	// `new Date()` here would diverge once the build ages by a day and cause a
	// hydration mismatch. After hydration, onMount refreshes to the real "today"
	// so the upcoming/past split stays correct between deploys.
	let todayISO = $state(__BUILD_DATE__);
	onMount(() => {
		todayISO = new Date().toISOString().slice(0, 10);
	});

	const upcoming = $derived(
		shows.filter((s) => s.date >= todayISO).sort((a, b) => a.date.localeCompare(b.date))
	);
	const pastAll = $derived(
		shows.filter((s) => s.date < todayISO).sort((a, b) => b.date.localeCompare(a.date))
	);
	const past = $derived(pastLimit != null ? pastAll.slice(0, pastLimit) : pastAll);
	const hasMore = $derived(pastLimit != null && pastAll.length > pastLimit);
</script>

{#if upcoming.length}
	<h3 class="live-sub reveal" use:reveal>À venir</h3>
	<ul class="shows">
		{#each upcoming as s, i (s.date + s.venue)}
			<li class="show upcoming reveal" use:reveal={{ delay: i * 70 }}>
				<span class="show-date">{formatShowDate(s)}</span>
				<span class="show-venue">{s.venue}</span>
				<span class="show-city"><MapPin size={13} />{s.city}</span>
				<span class="show-tag"><Ticket size={13} />{s.free ? 'Gratuit' : 'Billetterie'}</span>
			</li>
		{/each}
	</ul>
{/if}

{#if past.length}
	<h3 class="live-sub muted reveal" use:reveal>Déjà joué</h3>
	<ul class="shows">
		{#each past as s, i (s.date + s.venue)}
			<li class="show reveal" use:reveal={{ delay: i * 70 }}>
				<span class="show-date">{formatShowDate(s)}</span>
				<span class="show-venue">{s.venue}</span>
				<span class="show-city"><MapPin size={13} />{s.city}</span>
			</li>
		{/each}
	</ul>
	{#if hasMore && moreHref}
		<a class="shows-more reveal" href={moreHref} use:reveal>
			Voir toutes les dates ({pastAll.length})
			<ArrowRight size={17} />
		</a>
	{/if}
{/if}

<style>
	.live-sub {
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.35rem;
		margin: 2.2rem 0 0.8rem;
	}
	.live-sub.muted {
		color: var(--ink-dim);
	}
	.shows {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.show {
		display: grid;
		grid-template-columns: 210px 1fr auto auto;
		gap: 1rem;
		align-items: center;
		padding: 1.2rem 0.4rem;
		border-bottom: 1px solid var(--hairline);
	}
	.show.upcoming {
		border-left: 3px solid var(--lime);
		padding-left: 1rem;
	}
	.show-date {
		font-weight: 700;
		font-family: var(--display);
	}
	.show-venue {
		font-size: 1.05rem;
	}
	.show-city {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		color: var(--ink-dim);
		font-size: 0.92rem;
	}
	.show-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		justify-self: end;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.32em 0.85em;
		border-radius: 999px;
		background: var(--lime);
		color: #0a0410;
		white-space: nowrap;
	}
	.shows-more {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		margin-top: 1.6rem;
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.05rem;
		text-decoration: none;
		color: var(--ink);
		border-bottom: 2px solid var(--magenta);
		padding-bottom: 0.15em;
		transition:
			color 0.2s var(--ease),
			gap 0.2s var(--ease);
	}
	.shows-more:hover {
		color: var(--magenta);
		gap: 0.8em;
	}
	.shows-more:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
		border-radius: 6px;
	}

	@media (max-width: 820px) {
		.show {
			grid-template-columns: 1fr auto;
			row-gap: 0.35rem;
			align-items: center;
		}
		.show-date {
			grid-column: 1;
		}
		.show-tag {
			grid-row: 1 / span 2;
			grid-column: 2;
			align-self: center;
		}
		.show-venue,
		.show-city {
			grid-column: 1;
		}
	}
</style>
