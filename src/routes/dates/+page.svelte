<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Shows from '$lib/components/Shows.svelte';
	import { reveal } from '$lib/reveal';
	import { shows, band } from '$lib/data';
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
</script>

<svelte:head>
	<title>Toutes les dates — {band.name} (SMSCR)</title>
	<meta
		name="description"
		content="L'agenda complet de SuperMegaSuperCool Révolution : concerts à venir et historique des dates jouées."
	/>
</svelte:head>

<a class="skip-link" href="#dates-main">Aller au contenu</a>

<Nav />

<main id="dates-main" tabindex="-1">
	<section>
		<div class="wrap">
			<div class="reveal" use:reveal>
				<p class="eyebrow"><CalendarDays size={13} />Sur scène</p>
				<h1 class="section-title">Toutes les dates</h1>
			</div>
			<Shows {shows} />
		</div>
	</section>
</main>

<Footer />

<style>
	main:focus {
		outline: none;
	}
</style>
