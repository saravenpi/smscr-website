<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Camera from '@lucide/svelte/icons/camera';
	import X from '@lucide/svelte/icons/x';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import gal01 from '$lib/assets/photos/gal-01.jpg?enhanced';
	import gal02 from '$lib/assets/photos/gal-02.jpg?enhanced';
	import gal03 from '$lib/assets/photos/gal-03.jpg?enhanced';
	import gal04 from '$lib/assets/photos/gal-04.jpg?enhanced';
	import gal05 from '$lib/assets/photos/gal-05.jpg?enhanced';
	import gal06 from '$lib/assets/photos/gal-06.jpg?enhanced';
	import gal07 from '$lib/assets/photos/gal-07.jpg?enhanced';
	import gal08 from '$lib/assets/photos/gal-08.jpg?enhanced';
	import gal09 from '$lib/assets/photos/gal-09.jpg?enhanced';
	import gal10 from '$lib/assets/photos/gal-10.jpg?enhanced';
	import gal11 from '$lib/assets/photos/gal-11.jpg?enhanced';

	// Live & backstage gallery — mixed orientations. <enhanced:img> derives each
	// image's intrinsic ratio at build time, so portraits and landscapes sit flush
	// in the scroll carousel with no layout shift.
	const gallery = [
		{ src: gal01, credit: 'Grrrnd Zéro', alt: 'Les cinq membres de SMSCR passent la tête derrière le bar du Grrrnd Zéro' },
		{ src: gal02, credit: 'Mathieu Courtin', alt: 'SuperMegaSuperCool Révolution au complet sur scène' },
		{ src: gal03, credit: '', alt: 'Silhouettes du groupe dans une lumière orange psychédélique' },
		{ src: gal04, credit: 'Gilles Vugliano / Kim Kimstoical', alt: 'Les cinq membres de SMSCR en imperméables de détective' },
		{ src: gal05, credit: '', alt: 'Le trompettiste de SMSCR chante au micro en concert' },
		{ src: gal06, credit: 'Kim Kimstoical', alt: 'Deux membres du groupe cachés dans la végétation' },
		{ src: gal07, credit: 'Kim Kimstoical', alt: 'Le guitariste de SMSCR sous une lumière rouge' },
		{ src: gal08, credit: 'Mayli Bentoumia', alt: 'Le groupe en concert baigné de lumière violette' },
		{ src: gal09, credit: 'Norah Mons', alt: 'Le bassiste de SMSCR dans un faisceau de lumière' },
		{ src: gal10, credit: '', alt: 'Le batteur de SMSCR en plein solo' },
		{ src: gal11, credit: '', alt: 'Portrait noir et blanc d’un membre du groupe' }
	];

	// ---- Fullscreen gallery lightbox. Native <dialog> gives the top layer, focus
	// trap, Escape handling and focus restore for free. ----
	let dialogEl: HTMLDialogElement | undefined = $state();
	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);
	let swipeX = 0;

	function openLightbox(i: number) {
		lightboxIndex = i;
		lightboxOpen = true;
	}
	function closeLightbox() {
		lightboxOpen = false;
	}
	function nextShot() {
		lightboxIndex = (lightboxIndex + 1) % gallery.length;
	}
	function prevShot() {
		lightboxIndex = (lightboxIndex - 1 + gallery.length) % gallery.length;
	}
	function onLightboxKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') nextShot();
		else if (e.key === 'ArrowLeft') prevShot();
	}
	function onLightboxClick(e: MouseEvent) {
		// close on backdrop/blur clicks, but not on the image or a control
		if (!(e.target as HTMLElement).closest('.lb-img, button')) closeLightbox();
	}
	function onSwipeStart(e: PointerEvent) {
		swipeX = e.clientX;
	}
	function onSwipeEnd(e: PointerEvent) {
		const dx = e.clientX - swipeX;
		if (Math.abs(dx) > 50) (dx < 0 ? nextShot : prevShot)();
	}

	// drive the native dialog from state
	$effect(() => {
		if (!dialogEl) return;
		if (lightboxOpen && !dialogEl.open) dialogEl.showModal();
		else if (!lightboxOpen && dialogEl.open) dialogEl.close();
	});
	// lock background scroll while open
	$effect(() => {
		if (!lightboxOpen) return;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<!-- GALERIE -->
<section id="galerie" class="gallery-section">
	<div class="wrap">
		<div class="reveal" use:reveal>
			<p class="eyebrow"><Camera size={13} />En images</p>
			<h2 class="section-title">Sur scène &amp; en coulisses</h2>
		</div>
	</div>
	<ul class="gallery" aria-label="Galerie photo du groupe (défilement horizontal)">
		{#each gallery as ph, i (i)}
			<li class="shot">
				<button
					type="button"
					class="shot-btn"
					onclick={() => openLightbox(i)}
					aria-label="Agrandir : {ph.alt}"
				>
					<enhanced:img class="shot-img" src={ph.src} alt={ph.alt} sizes="auto" loading="lazy" />
					{#if ph.credit}<span class="shot-credit">© {ph.credit}</span>{/if}
				</button>
			</li>
		{/each}
	</ul>
	<div class="wrap">
		<p class="gallery-credits">
			Photos&nbsp;: Kim Kimstoical, Mathieu Courtin, Mayli Bentoumia, Norah Mons, Gilles Vugliano
			· live à Grrrnd Zéro &amp; ailleurs.
		</p>
	</div>
</section>

<!-- GALLERY LIGHTBOX -->
<dialog
	class="lightbox"
	bind:this={dialogEl}
	aria-label="Galerie en plein écran"
	onclose={() => (lightboxOpen = false)}
	onclick={onLightboxClick}
	onkeydown={onLightboxKeydown}
	onpointerdown={onSwipeStart}
	onpointerup={onSwipeEnd}
>
	{#if lightboxOpen}
		{@const ph = gallery[lightboxIndex]}
		<enhanced:img class="lb-bg" src={ph.src} alt="" aria-hidden="true" sizes="12vw" />
		<div class="lb-scrim"></div>
		<figure class="lb-stage">
			<enhanced:img class="lb-img" src={ph.src} alt={ph.alt} sizes="(max-width: 1400px) 94vw, 1400px" />
			{#if ph.credit}<figcaption class="lb-credit">© {ph.credit}</figcaption>{/if}
		</figure>
		<button class="lb-btn lb-close" type="button" onclick={closeLightbox} aria-label="Fermer">
			<X size={22} />
		</button>
		<button class="lb-btn lb-prev" type="button" onclick={prevShot} aria-label="Photo précédente">
			<ChevronLeft size={26} />
		</button>
		<button class="lb-btn lb-next" type="button" onclick={nextShot} aria-label="Photo suivante">
			<ChevronRight size={26} />
		</button>
		<p class="lb-counter">{lightboxIndex + 1} / {gallery.length}</p>
	{/if}
</dialog>

<style>
	/* ---------- GALERIE ---------- */
	.gallery-section {
		padding-bottom: clamp(40px, 7vw, 90px);
	}
	.gallery {
		list-style: none;
		margin: 2rem 0 1.4rem;
		/* full-bleed horizontal carousel with its own gutter padding */
		padding: 0.4rem var(--gutter);
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}
	.gallery::-webkit-scrollbar {
		display: none;
	}
	.shot {
		position: relative;
		flex: 0 0 auto;
		height: clamp(240px, 42vh, 420px);
		scroll-snap-align: center;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--hairline);
	}
	/* class (not `.shot img`): <enhanced:img> compiles to <picture><img>, and
	   Svelte prunes bare-element descendant selectors it can't see at compile
	   time — a class on the tag survives, like .hero-photo/.lb-img do. */
	.shot-img {
		display: block;
		height: 100%;
		width: auto;
		max-width: none;
		object-fit: cover;
		transition: transform 0.4s var(--ease);
	}
	.shot:hover .shot-img {
		transform: scale(1.04);
	}
	.shot-credit {
		position: absolute;
		inset: auto 0 0 0;
		padding: 1.4rem 0.7rem 0.55rem;
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		color: var(--ink);
		background: linear-gradient(transparent, rgba(10, 4, 16, 0.8));
		opacity: 0;
		transition: opacity 0.3s var(--ease);
	}
	.shot:hover .shot-credit,
	.shot:focus-within .shot-credit {
		opacity: 1;
	}
	.gallery-credits {
		color: var(--ink-dim);
		font-size: 0.85rem;
		margin: 0;
	}

	/* ---------- LIGHTBOX ---------- */
	.shot-btn {
		display: block;
		height: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
		border-radius: inherit;
	}
	.shot-btn:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
	}

	.lightbox {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		overflow: hidden;
	}
	.lightbox::backdrop {
		background: rgba(6, 2, 10, 0.72);
		backdrop-filter: blur(6px);
	}
	.lb-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: blur(44px) brightness(0.42) saturate(1.25);
		transform: scale(1.2);
	}
	.lb-scrim {
		position: absolute;
		inset: 0;
		background: radial-gradient(130% 130% at 50% 45%, transparent 30%, rgba(6, 2, 10, 0.62));
	}
	.lb-stage {
		position: absolute;
		inset: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
		/* extra top/bottom room reserved for the close button & counter */
		padding: clamp(3.4rem, 8vh, 4.5rem) clamp(1rem, 5vw, 3.5rem);
	}
	.lb-img {
		max-width: min(94vw, 1400px);
		max-height: 78vh;
		max-height: 78dvh;
		width: auto;
		height: auto;
		object-fit: contain;
		border-radius: 10px;
		box-shadow: 0 30px 90px rgba(0, 0, 0, 0.65);
	}
	.lb-credit {
		margin: 0;
		color: var(--ink-dim);
		font-size: 0.82rem;
		letter-spacing: 0.03em;
		text-align: center;
	}
	.lb-btn {
		position: absolute;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: clamp(40px, 10vw, 46px);
		height: clamp(40px, 10vw, 46px);
		border-radius: 999px;
		border: 1px solid rgba(246, 241, 255, 0.25);
		background: rgba(10, 4, 16, 0.5);
		backdrop-filter: blur(8px);
		color: var(--ink);
		cursor: pointer;
		transition:
			background 0.2s var(--ease),
			border-color 0.2s var(--ease),
			transform 0.15s var(--ease);
	}
	.lb-btn:hover {
		background: rgba(255, 46, 136, 0.25);
		border-color: var(--magenta);
	}
	.lb-btn:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
	}
	.lb-close {
		top: clamp(0.7rem, 2vw, 1.4rem);
		right: clamp(0.7rem, 2vw, 1.4rem);
	}
	.lb-prev,
	.lb-next {
		top: 50%;
		transform: translateY(-50%);
	}
	.lb-prev {
		left: clamp(0.5rem, 2vw, 1.6rem);
	}
	.lb-next {
		right: clamp(0.5rem, 2vw, 1.6rem);
	}
	.lb-prev:hover,
	.lb-next:hover {
		transform: translateY(-50%) scale(1.08);
	}
	.lb-counter {
		position: absolute;
		bottom: clamp(0.8rem, 2.5vw, 1.6rem);
		left: 50%;
		transform: translateX(-50%);
		margin: 0;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--ink);
		background: rgba(10, 4, 16, 0.5);
		border: 1px solid rgba(246, 241, 255, 0.18);
		padding: 0.3em 0.9em;
		border-radius: 999px;
		backdrop-filter: blur(8px);
	}
	.lightbox[open] {
		animation: lbFade 0.25s var(--ease);
	}
	.lightbox[open] .lb-img {
		animation: lbZoom 0.3s var(--ease);
	}
	@keyframes lbFade {
		from {
			opacity: 0;
		}
	}
	@keyframes lbZoom {
		from {
			transform: scale(0.94);
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.lightbox[open],
		.lightbox[open] .lb-img {
			animation: none;
		}
	}
</style>
