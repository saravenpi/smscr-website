<script lang="ts">
	import { base } from '$app/paths';
	import Marquee from '$lib/components/Marquee.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Shows from '$lib/components/Shows.svelte';
	import Music from '$lib/components/Music.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import Press from '$lib/components/Press.svelte';
	import { reveal } from '$lib/reveal';
	import { magnetic } from '$lib/magnetic';
	import bandPhoto from '$lib/assets/band.jpg?enhanced';
	import { band, members, shows, awards, heroAward } from '$lib/data';
	import Play from '@lucide/svelte/icons/play';
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Users from '@lucide/svelte/icons/users';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Award from '@lucide/svelte/icons/award';
	import laundromatPhoto from '$lib/assets/photos/band-laundromat.jpg?enhanced';

	// rotating accent per member so the line-up reads like art, not a roster
	const accents = ['var(--magenta)', 'var(--cyan)', 'var(--lime)', 'var(--orange)', 'var(--purple)'];
</script>

<a class="skip-link" href="#top">Aller au contenu</a>

<Nav />

<!-- HERO -->
<section id="top" class="hero" tabindex="-1">
	<div class="wrap hero-inner">
		<p class="eyebrow hero-anim" style="--hero-delay:0ms">
			<MapPin size={13} />{band.city} · {heroAward}
		</p>
		<h1 class="hero-title">
			<span class="hline">
				<span class="l1 hero-anim" style="--hero-delay:80ms">Super</span>
				<span class="l2 hero-anim" style="--hero-delay:170ms">Mega</span>
			</span>
			<span class="l3 hero-anim" style="--hero-delay:260ms">Super Cool</span>
			<span class="l4 hero-anim" style="--hero-delay:350ms">Révolution</span>
		</h1>
		<p class="hero-tag hero-anim" style="--hero-delay:470ms">{band.tagline}</p>
		<p class="hero-intro hero-anim" style="--hero-delay:560ms">{band.intro}</p>
		<div class="hero-cta hero-anim" style="--hero-delay:650ms">
			<a class="btn btn-primary" href="#musique" use:magnetic>
				<Play size={18} strokeWidth={2.5} fill="currentColor" />
				Écouter le groupe
			</a>
			<a class="btn btn-ghost" href="#live" use:magnetic>
				<CalendarDays size={18} />
				Voir les dates
			</a>
		</div>
		<div class="genres hero-anim" style="--hero-delay:740ms">
			{#each band.genres as g (g)}<span class="chip">{g}</span>{/each}
		</div>
	</div>
</section>

<div class="wrap">
	<enhanced:img
		class="hero-photo"
		src={bandPhoto}
		alt="Le groupe SuperMegaSuperCool Révolution"
		sizes="(max-width: 1264px) 100vw, 1200px"
	/>
</div>

<Marquee items={[band.name, 'PROG · FUSION · CHAOS']} accent="var(--lime)" />

<!-- ABOUT -->
<section id="groupe">
	<div class="wrap about">
		<div class="about-head reveal" use:reveal>
			<p class="eyebrow"><Sparkles size={13} />Le groupe</p>
			<h2 class="section-title">Cinq copains,<br />zéro frontière</h2>
		</div>
		<div class="about-body reveal" use:reveal={{ delay: 120 }}>
			<p>
				Un quintette électrique biberonné à la drum & bass et à la synthèse analogique, où
				trompette, guitare, basse, batterie et claviers inventent ensemble une musique qui
				refuse de choisir son camp.
			</p>
			<p>
				Entre funk-fusion des seventies, musique électronique et punk rock, SMSCR balance
				<strong>délires harmoniques</strong>, <strong>dynamiques surchargées</strong> et
				<strong>atmosphères bruitistes</strong> — toujours avec une bonne dose d'autodérision.
			</p>
			<div class="influences">
				<span class="influences-label">Influences&nbsp;:</span>
				{#each band.influences as inf (inf)}<span class="chip">{inf}</span>{/each}
			</div>
			<div class="distinctions reveal" use:reveal={{ delay: 60 }}>
				<p class="eyebrow"><Award size={13} />Distinctions</p>
				<div class="distinction-list">
					{#each awards as a (a)}<span class="distinction"><Award size={16} />{a}</span>{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="wrap">
		<figure class="band-fig reveal" use:reveal>
			<enhanced:img
				class="band-photo"
				src={laundromatPhoto}
				alt="Les cinq membres de SuperMegaSuperCool Révolution assis sur les machines d’une laverie"
				sizes="(max-width: 1264px) 100vw, 1200px"
			/>
			<figcaption class="band-credit">© Kim Kimstoical</figcaption>
		</figure>
	</div>

	<div class="wrap">
		<blockquote class="manifesto reveal" use:reveal>
			On ne joue pas de la musique.<br />
			On peint des univers sonores <em>encore inexistants</em>.
		</blockquote>
	</div>
</section>

<!-- MEMBERS -->
<section id="membres" class="members-section">
	<div class="wrap">
		<div class="reveal" use:reveal>
			<p class="eyebrow"><Users size={13} />Le line-up</p>
			<h2 class="section-title">Les révolutionnaires</h2>
		</div>
		<div class="members">
			{#each members as m, i (m.name)}
				<article
					class="member reveal"
					use:reveal={{ delay: i * 70 }}
					style="--c:{accents[i % accents.length]}"
				>
					<span class="member-role">{m.role}</span>
					<h3 class="member-name">{m.name}</h3>
					<p class="member-blurb">{m.blurb}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<Marquee
	items={['NEW EP 2026', "L'INSPECTEUR INSPEKTHER", 'CONTRE LE GANG DES CHATS']}
	reverse
	accent="var(--cyan)"
/>

<Music />

<Gallery />

<!-- LIVE -->
<section id="live" class="live-section">
	<div class="wrap">
		<div class="reveal" use:reveal>
			<p class="eyebrow"><CalendarDays size={13} />Sur scène</p>
			<h2 class="section-title">Live</h2>
		</div>
		<Shows {shows} pastLimit={4} moreHref="{base}/dates" />
	</div>
</section>

<Press />

<Footer />

<style>
	/* ---------- HERO ---------- */
	.hero {
		padding-top: clamp(48px, 8vw, 96px);
		padding-bottom: clamp(40px, 6vw, 72px);
	}
	/* skip-link target: focusable region, but no ring around the whole section */
	.hero:focus {
		outline: none;
	}
	.hero-title {
		font-weight: 800;
		text-transform: uppercase;
		font-size: clamp(1.5rem, 7vw, 7rem);
		letter-spacing: -0.03em;
		line-height: 0.92;
		display: flex;
		flex-direction: column;
		gap: 0.02em;
		margin: 0.18em 0 0.45em;
		max-width: 100%;
	}
	.hero-title span {
		display: block;
		white-space: nowrap;
	}
	.hero-title .hline {
		display: flex;
		gap: 0.3em;
	}
	.hero-title .l1 {
		color: var(--ink);
	}
	.hero-title .l2 {
		color: var(--magenta);
	}
	.hero-title .l3 {
		color: var(--cyan);
	}
	.hero-title .l4 {
		color: var(--lime);
	}
	.hero-tag {
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(1.15rem, 3vw, 1.8rem);
		margin: 0 0 0.7em;
	}
	.hero-intro {
		max-width: 60ch;
		color: var(--ink-dim);
		margin: 0 0 2rem;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		margin-bottom: 2rem;
	}
	.genres {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	/* button styles are shared and live in app.css */

	/* ---------- ABOUT ---------- */
	.about {
		display: grid;
		grid-template-columns: 1fr 1.25fr;
		gap: clamp(2rem, 6vw, 5rem);
		align-items: start;
		margin-bottom: clamp(3rem, 7vw, 6rem);
	}
	.about-body p {
		margin: 0 0 1.3em;
		font-size: 1.1rem;
		max-width: 62ch;
	}
	.about-body strong {
		color: var(--lime);
		font-weight: 700;
	}
	/* This heading sits in the narrow left column of the about grid, so the global
	   .section-title size (up to 4.4rem) overflowed and hyphenated mid-word
	   (« co-pains », « fron-tière »). Size it to its column and disable
	   hyphenation — the <br> then gives the intended clean two-line reading. */
	.about-head .section-title {
		font-size: clamp(2rem, 3.8vw, 3.4rem);
		hyphens: none;
	}
	.influences {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.8rem;
	}
	.influences-label {
		font-weight: 700;
		color: var(--cyan);
		margin-right: 0.4rem;
	}

	/* ---------- DISTINCTIONS ---------- */
	.distinctions {
		margin-top: 2.2rem;
	}
	.distinction-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 0.9rem;
	}
	.distinction {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		padding: 0.62em 1.2em;
		border: 1.5px solid rgba(182, 255, 26, 0.5);
		border-radius: 999px;
		background: linear-gradient(135deg, rgba(182, 255, 26, 0.16), rgba(34, 224, 255, 0.06));
		color: var(--ink);
		font-weight: 700;
		font-size: 0.95rem;
	}
	.distinction :global(svg) {
		color: var(--lime);
		flex-shrink: 0;
	}

	/* ---------- BAND PHOTO ---------- */
	.band-fig {
		margin: clamp(1rem, 3vw, 2.5rem) 0 clamp(2.5rem, 6vw, 5rem);
	}
	.band-photo {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--radius);
		border: 1px solid var(--hairline);
	}
	.band-credit {
		margin: 0.5rem 0 0;
		text-align: right;
		color: var(--ink-dim);
		font-size: 0.78rem;
		letter-spacing: 0.03em;
	}

	/* ---------- MANIFESTO ---------- */
	.manifesto {
		margin: 0;
		font-family: var(--display);
		font-weight: 800;
		text-transform: uppercase;
		font-size: clamp(1.7rem, 5.4vw, 4.2rem);
		line-height: 1.02;
		letter-spacing: -0.025em;
		max-width: 18ch;
	}
	.manifesto em {
		font-style: normal;
		color: var(--lime);
	}

	/* ---------- MEMBERS ---------- */
	.members {
		display: grid;
		gap: 0;
		margin-top: 2.4rem;
		border-top: 1px solid var(--hairline);
	}
	.member {
		position: relative;
		padding: clamp(1.4rem, 4vw, 2.8rem) 0;
		border-bottom: 1px solid var(--hairline);
		transition: padding-left 0.35s var(--ease);
	}
	.member-role {
		display: block;
		text-transform: uppercase;
		letter-spacing: 0.24em;
		font-size: 0.74rem;
		font-weight: 700;
		color: var(--ink-dim);
		margin-bottom: 0.55rem;
		transition: color 0.3s var(--ease);
	}
	.member-name {
		font-family: var(--display);
		font-weight: 800;
		text-transform: uppercase;
		font-size: clamp(2.3rem, 8.5vw, 5.8rem);
		line-height: 0.92;
		letter-spacing: -0.03em;
		color: var(--c);
		margin: 0 0 0.7rem;
	}
	.member-blurb {
		margin: 0;
		color: var(--ink-dim);
		max-width: 54ch;
	}
	.member:hover {
		padding-left: clamp(0.5rem, 2vw, 1.6rem);
	}
	.member:hover .member-role {
		color: var(--c);
	}

	/* ---------- HERO PHOTO ---------- */
	.hero-photo {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1400 / 933;
		object-fit: cover;
		border-radius: var(--radius);
		border: 1px solid var(--hairline);
		/* breathing room below the hero photo before the scrolling marquee */
		margin: clamp(1rem, 3vw, 2rem) 0 clamp(2.5rem, 6vw, 4.5rem);
	}

	/* ---------- RESPONSIVE ---------- */
	@media (max-width: 1024px) {
		.about {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.hero-cta {
			flex-direction: column;
			align-items: stretch;
		}
		.hero-cta .btn {
			text-align: center;
		}
	}
</style>
