<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { band } from '$lib/data';

	let { children } = $props();

	const title = `${band.name} — jazz psychédélique · Lyon`;
	const description = band.intro;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<div class="aurora" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

{@render children()}
