<script lang="ts">
	import Marquee from '$lib/components/Marquee.svelte';
	import { band, members, releases, shows, links, awards } from '$lib/data';

	const bandcamp = links.find((l) => l.label === 'Bandcamp')?.url ?? '#';

	// split shows into upcoming / past relative to today
	const todayISO = new Date().toISOString().slice(0, 10);
	const upcoming = shows.filter((s) => s.date >= todayISO).sort((a, b) => a.date.localeCompare(b.date));
	const past = shows.filter((s) => s.date < todayISO).sort((a, b) => b.date.localeCompare(a.date));

	const nav = [
		{ href: '#groupe', label: 'Le groupe' },
		{ href: '#membres', label: 'Membres' },
		{ href: '#musique', label: 'Musique' },
		{ href: '#live', label: 'Live' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<header class="nav">
	<div class="wrap nav-inner">
		<a class="brand" href="#top">SMSCR<span>✦</span></a>
		<nav class="nav-links">
			{#each nav as item (item.href)}
				<a href={item.href}>{item.label}</a>
			{/each}
		</nav>
		<a class="nav-cta" href={bandcamp} target="_blank" rel="noopener">Écouter</a>
	</div>
</header>

<!-- HERO -->
<section id="top" class="hero">
	<div class="wrap hero-inner">
		<p class="eyebrow">{band.city} · {awards[0]}</p>
		<h1 class="hero-title">
			<span class="l1">Super</span>
			<span class="l2">Mega</span>
			<span class="l3">Super Cool</span>
			<span class="l4">Révolution</span>
		</h1>
		<p class="hero-tag">{band.tagline}</p>
		<p class="hero-intro">{band.intro}</p>
		<div class="hero-cta">
			<a class="btn btn-primary" href="#musique">Écouter le groupe</a>
			<a class="btn btn-ghost" href="#live">Voir les dates</a>
		</div>
		<div class="genres">
			{#each band.genres as g (g)}<span class="chip">{g}</span>{/each}
		</div>
	</div>
</section>

<Marquee items={[band.name, 'PROG · FUSION · CHAOS']} accent="var(--lime)" />

<!-- ABOUT -->
<section id="groupe">
	<div class="wrap about">
		<div class="about-head">
			<p class="eyebrow">Le groupe</p>
			<h2 class="section-title">Cinq copains,<br />zéro frontière</h2>
		</div>
		<div class="about-body">
			<p>
				Né d'un trio trompette / basse / guitare, le combo s'est mué en quintette électrique
				avec l'arrivée d'un batteur biberonné à la drum & bass et d'un claviériste féru de
				synthèse analogique. Ensemble, ils peignent des univers sonores encore inexistants.
			</p>
			<p>
				Entre funk-fusion des seventies, musique électronique et punk rock, SMSCR balance
				<strong>délires harmoniques</strong>, <strong>dynamiques surchargées</strong> et
				<strong>atmosphères bruitistes</strong> — toujours avec une bonne dose d'autodérision.
			</p>
			<div class="influences">
				<span class="influences-label">Dans le rétro&nbsp;:</span>
				{#each band.influences as inf (inf)}<span class="chip">{inf}</span>{/each}
			</div>
		</div>
	</div>
</section>

<!-- MEMBERS -->
<section id="membres" class="members-section">
	<div class="wrap">
		<p class="eyebrow">Le line-up</p>
		<h2 class="section-title">Les révolutionnaires</h2>
		<div class="members">
			{#each members as m, i (m.name)}
				<article class="member" style="--i:{i}">
					<div class="member-index">0{i + 1}</div>
					<div class="member-body">
						<h3 class="member-name">
							{m.name}
							{#if m.nick}<span class="member-nick">« {m.nick} »</span>{/if}
						</h3>
						<p class="member-role">{m.role}</p>
						<p class="member-blurb">{m.blurb}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<Marquee items={['NEW EP 2026', "L'INSPECTEUR INSPEKTHER", 'CONTRE LE GANG DES CHATS']} reverse accent="var(--cyan)" />

<!-- MUSIC -->
<section id="musique">
	<div class="wrap">
		<p class="eyebrow">Discographie</p>
		<h2 class="section-title">La musique</h2>
		<div class="releases">
			{#each releases as r (r.title)}
				<article class="release">
					<div class="release-meta">
						<span class="release-type">{r.type}</span>
						<span class="release-year">{r.year}</span>
					</div>
					<h3 class="release-title">{r.title}</h3>
					{#if r.label}<p class="release-label">Label · {r.label}</p>{/if}
					{#if r.note}<p class="release-note">{r.note}</p>{/if}
					{#if r.tracks}
						<ol class="tracklist">
							{#each r.tracks as t (t)}<li>{t}</li>{/each}
						</ol>
					{/if}
					{#if r.link}
						<a class="btn btn-primary sm" href={r.link} target="_blank" rel="noopener">
							Écouter sur Bandcamp
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- LIVE -->
<section id="live" class="live-section">
	<div class="wrap">
		<p class="eyebrow">Sur scène</p>
		<h2 class="section-title">Live</h2>

		{#if upcoming.length}
			<h3 class="live-sub">À venir</h3>
			<ul class="shows">
				{#each upcoming as s (s.date + s.venue)}
					<li class="show upcoming">
						<span class="show-date">{s.label}</span>
						<span class="show-venue">{s.venue}</span>
						<span class="show-city">{s.city}</span>
						<span class="show-tag">{s.free ? 'Gratuit' : 'Billetterie'}</span>
					</li>
				{/each}
			</ul>
		{/if}

		{#if past.length}
			<h3 class="live-sub muted">Déjà joué</h3>
			<ul class="shows">
				{#each past as s (s.date + s.venue)}
					<li class="show">
						<span class="show-date">{s.label}</span>
						<span class="show-venue">{s.venue}</span>
						<span class="show-city">{s.city}</span>
						<span class="show-tag past">Archivé</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<!-- CONTACT / FOOTER -->
<footer id="contact">
	<div class="wrap footer-inner">
		<div class="footer-cta">
			<h2 class="section-title">Suivez la révolution</h2>
			<div class="socials">
				{#each links as l (l.url)}
					<a class="social" href={l.url} target="_blank" rel="noopener">{l.label} <span>↗</span></a>
				{/each}
			</div>
		</div>
		<div class="footer-meta">
			<p class="footer-band">{band.name}</p>
			<p class="footer-city">{band.city}</p>
			<p class="footer-legal">
				© {new Date().getFullYear()} SMSCR — Site fait avec ✦ et beaucoup de fusion.
			</p>
		</div>
	</div>
</footer>

<style>
	/* ---------- NAV ---------- */
	.nav {
		position: sticky;
		top: 0;
		z-index: 50;
		backdrop-filter: blur(12px);
		background: rgba(10, 4, 16, 0.55);
		border-bottom: 1px solid rgba(246, 241, 255, 0.1);
	}
	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 66px;
	}
	.brand {
		font-family: var(--display);
		font-weight: 800;
		font-size: 1.5rem;
		text-decoration: none;
		letter-spacing: -0.02em;
	}
	.brand span {
		color: var(--magenta);
	}
	.nav-links {
		display: flex;
		gap: 1.6rem;
	}
	.nav-links a {
		text-decoration: none;
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--ink-dim);
		transition: color 0.2s;
	}
	.nav-links a:hover {
		color: var(--ink);
	}
	.nav-cta {
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9rem;
		padding: 0.5em 1.1em;
		border-radius: 999px;
		background: var(--lime);
		color: #0a0410;
	}

	/* ---------- HERO ---------- */
	.hero {
		padding-top: clamp(48px, 8vw, 90px);
		padding-bottom: clamp(40px, 6vw, 70px);
	}
	.hero-title {
		font-weight: 800;
		text-transform: uppercase;
		font-size: clamp(3rem, 13vw, 9rem);
		display: flex;
		flex-direction: column;
		margin: 0.15em 0 0.35em;
	}
	.hero-title span {
		display: block;
	}
	.hero-title .l1 {
		color: var(--ink);
	}
	.hero-title .l2 {
		color: var(--magenta);
		margin-left: 0.6em;
	}
	.hero-title .l3 {
		color: var(--cyan);
	}
	.hero-title .l4 {
		color: var(--lime);
		margin-left: 0.9em;
		-webkit-text-stroke: 2px var(--lime);
		color: transparent;
	}
	.hero-tag {
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(1.1rem, 3vw, 1.7rem);
		margin: 0 0 0.6em;
	}
	.hero-intro {
		max-width: 620px;
		color: var(--ink-dim);
		margin: 0 0 1.6em;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin-bottom: 1.8rem;
	}
	.genres {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.btn {
		display: inline-block;
		text-decoration: none;
		font-weight: 700;
		padding: 0.75em 1.5em;
		border-radius: 999px;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}
	.btn.sm {
		padding: 0.6em 1.2em;
		font-size: 0.9rem;
	}
	.btn:hover {
		transform: translateY(-2px);
	}
	.btn-primary {
		background: var(--magenta);
		color: #0a0410;
		box-shadow: 0 6px 0 rgba(255, 46, 136, 0.35);
	}
	.btn-ghost {
		border: 2px solid rgba(246, 241, 255, 0.4);
		color: var(--ink);
	}

	/* ---------- ABOUT ---------- */
	.about {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: clamp(2rem, 6vw, 5rem);
		align-items: start;
	}
	.about-body p {
		margin: 0 0 1.2em;
		font-size: 1.1rem;
	}
	.about-body strong {
		color: var(--lime);
		font-weight: 700;
	}
	.influences {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.6rem;
	}
	.influences-label {
		font-weight: 700;
		color: var(--cyan);
		margin-right: 0.4rem;
	}

	/* ---------- MEMBERS ---------- */
	.members {
		display: grid;
		gap: 0;
		margin-top: 1.5rem;
		border-top: 1px solid rgba(246, 241, 255, 0.14);
	}
	.member {
		display: flex;
		gap: clamp(1rem, 4vw, 3rem);
		align-items: baseline;
		padding: clamp(1.2rem, 3vw, 2rem) 0;
		border-bottom: 1px solid rgba(246, 241, 255, 0.14);
		transition: background 0.25s;
	}
	.member:hover {
		background: rgba(246, 241, 255, 0.03);
	}
	.member-index {
		font-family: var(--display);
		font-weight: 800;
		font-size: clamp(1.4rem, 4vw, 2.2rem);
		color: var(--magenta);
		min-width: 2.2ch;
	}
	.member-name {
		font-size: clamp(1.4rem, 4vw, 2.4rem);
		font-weight: 700;
		display: inline-flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem;
	}
	.member-nick {
		font-family: var(--body);
		font-size: 0.95rem;
		color: var(--cyan);
		font-weight: 500;
	}
	.member-role {
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--lime);
		margin: 0.5rem 0 0.4rem;
	}
	.member-blurb {
		margin: 0;
		color: var(--ink-dim);
		max-width: 52ch;
	}

	/* ---------- MUSIC ---------- */
	.releases {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.4rem;
		margin-top: 1.5rem;
	}
	.release {
		border: 1px solid rgba(246, 241, 255, 0.16);
		border-radius: var(--radius);
		padding: 1.6rem;
		background: linear-gradient(160deg, rgba(139, 47, 255, 0.14), rgba(10, 4, 16, 0.2));
	}
	.release-meta {
		display: flex;
		justify-content: space-between;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: 0.8rem;
	}
	.release-type {
		color: var(--magenta);
	}
	.release-year {
		color: var(--ink-dim);
	}
	.release-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.4rem;
	}
	.release-label {
		color: var(--cyan);
		font-size: 0.85rem;
		margin: 0 0 0.6rem;
	}
	.release-note {
		color: var(--ink-dim);
		font-style: italic;
		margin: 0 0 0.8rem;
	}
	.tracklist {
		margin: 0.6rem 0 1.2rem;
		padding-left: 1.4rem;
		color: var(--ink-dim);
		font-size: 0.92rem;
	}
	.tracklist li {
		padding: 0.12rem 0;
	}
	.tracklist li::marker {
		color: var(--lime);
		font-variant-numeric: tabular-nums;
	}

	/* ---------- LIVE ---------- */
	.live-sub {
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.3rem;
		margin: 1.8rem 0 0.6rem;
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
		grid-template-columns: 200px 1fr auto auto;
		gap: 1rem;
		align-items: center;
		padding: 1.1rem 0.4rem;
		border-bottom: 1px solid rgba(246, 241, 255, 0.14);
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
		color: var(--ink-dim);
		font-size: 0.92rem;
	}
	.show-tag {
		justify-self: end;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.3em 0.8em;
		border-radius: 999px;
		background: var(--lime);
		color: #0a0410;
	}
	.show-tag.past {
		background: transparent;
		border: 1px solid rgba(246, 241, 255, 0.3);
		color: var(--ink-dim);
	}

	/* ---------- FOOTER ---------- */
	footer {
		border-top: 1px solid rgba(246, 241, 255, 0.14);
		padding: clamp(56px, 8vw, 96px) 0 48px;
	}
	.footer-inner {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 3rem;
		align-items: end;
	}
	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 1.4rem;
	}
	.social {
		text-decoration: none;
		font-weight: 700;
		padding: 0.6em 1.1em;
		border: 1.5px solid rgba(246, 241, 255, 0.3);
		border-radius: 999px;
		transition:
			background 0.2s,
			color 0.2s;
	}
	.social span {
		color: var(--magenta);
	}
	.social:hover {
		background: var(--ink);
		color: #0a0410;
	}
	.social:hover span {
		color: #0a0410;
	}
	.footer-meta {
		text-align: right;
	}
	.footer-band {
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.1rem;
		margin: 0;
	}
	.footer-city {
		color: var(--ink-dim);
		margin: 0.2rem 0;
	}
	.footer-legal {
		color: var(--ink-dim);
		font-size: 0.82rem;
		margin-top: 1rem;
	}

	/* ---------- RESPONSIVE ---------- */
	@media (max-width: 820px) {
		.nav-links {
			display: none;
		}
		.about {
			grid-template-columns: 1fr;
		}
		.hero-title .l2,
		.hero-title .l4 {
			margin-left: 0;
		}
		.show {
			grid-template-columns: 1fr auto;
			row-gap: 0.3rem;
		}
		.show-venue {
			grid-column: 1;
		}
		.show-city {
			grid-column: 1;
		}
		.footer-inner {
			grid-template-columns: 1fr;
			align-items: start;
		}
		.footer-meta {
			text-align: left;
		}
	}
</style>
