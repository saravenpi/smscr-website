<script lang="ts">
	import Marquee from '$lib/components/Marquee.svelte';
	import { reveal } from '$lib/reveal';
	import { magnetic } from '$lib/magnetic';
	import { band, members, releases, shows, links, awards } from '$lib/data';
	import Play from '@lucide/svelte/icons/play';
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
	import Disc3 from '@lucide/svelte/icons/disc-3';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Users from '@lucide/svelte/icons/users';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Ticket from '@lucide/svelte/icons/ticket';
	import Radio from '@lucide/svelte/icons/radio';
	import AudioLines from '@lucide/svelte/icons/audio-lines';
	import Camera from '@lucide/svelte/icons/camera';
	import Film from '@lucide/svelte/icons/film';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import ExternalLink from '@lucide/svelte/icons/external-link';

	// rotating accent per member so the line-up reads like art, not a roster
	const accents = ['var(--magenta)', 'var(--cyan)', 'var(--lime)', 'var(--orange)', 'var(--purple)'];

	const bandcamp = links.find((l) => l.label === 'Bandcamp')?.url ?? '#';
	const instagram = links.find((l) => l.label === 'Instagram')?.url ?? '#';

	// icon per streaming/social platform (Lucide dropped brand icons, so these are thematic)
	const socialIcon: Record<string, typeof Play> = {
		Bandcamp: Disc3,
		Spotify: AudioLines,
		Deezer: Radio,
		Instagram: Camera,
		YouTube: Film
	};

	// split shows into upcoming / past relative to today
	const todayISO = new Date().toISOString().slice(0, 10);
	const upcoming = shows
		.filter((s) => s.date >= todayISO)
		.sort((a, b) => a.date.localeCompare(b.date));
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
		<a class="brand" href="#top">SMSCR</a>
		<nav class="nav-links" aria-label="Navigation principale">
			{#each nav as item (item.href)}
				<a href={item.href}>{item.label}</a>
			{/each}
		</nav>
		<div class="nav-actions">
			<a
				class="nav-ig"
				href={instagram}
				target="_blank"
				rel="noopener"
				aria-label="Instagram @supermegasupercoolrevolution"
				title="@supermegasupercoolrevolution"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
					<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
					<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
				</svg>
			</a>
			<a class="nav-cta" href={bandcamp} target="_blank" rel="noopener" use:magnetic>
				<Play size={15} strokeWidth={2.5} fill="currentColor" />
				Écouter
			</a>
		</div>
	</div>
</header>

<!-- HERO -->
<section id="top" class="hero">
	<div class="wrap hero-inner">
		<p class="eyebrow hero-anim" style="--hero-delay:0ms">
			<MapPin size={13} />{band.city} · {awards[0]}
		</p>
		<h1 class="hero-title">
			<span class="l1 hero-anim" style="--hero-delay:80ms">Super</span>
			<span class="l2 hero-anim" style="--hero-delay:170ms">Mega</span>
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
					<h3 class="member-name">
						{m.name}{#if m.nick}<span class="member-nick">“{m.nick}”</span>{/if}
					</h3>
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

<!-- MUSIC -->
<section id="musique">
	<div class="wrap">
		<div class="reveal" use:reveal>
			<p class="eyebrow"><Disc3 size={13} />Discographie</p>
			<h2 class="section-title">La musique</h2>
		</div>
		<div class="releases">
			{#each releases as r, i (r.title)}
				<article class="release reveal" use:reveal={{ delay: i * 100 }}>
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
							<Disc3 size={16} />
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
		<div class="reveal" use:reveal>
			<p class="eyebrow"><CalendarDays size={13} />Sur scène</p>
			<h2 class="section-title">Live</h2>
		</div>

		{#if upcoming.length}
			<h3 class="live-sub reveal" use:reveal>À venir</h3>
			<ul class="shows">
				{#each upcoming as s, i (s.date + s.venue)}
					<li class="show upcoming reveal" use:reveal={{ delay: i * 70 }}>
						<span class="show-date">{s.label}</span>
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
						<span class="show-date">{s.label}</span>
						<span class="show-venue">{s.venue}</span>
						<span class="show-city"><MapPin size={13} />{s.city}</span>
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
		</div>
		<div class="footer-meta reveal" use:reveal={{ delay: 120 }}>
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
		backdrop-filter: blur(14px);
		background: rgba(10, 4, 16, 0.6);
		border-bottom: 1px solid rgba(246, 241, 255, 0.1);
	}
	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 64px;
	}
	.brand {
		font-family: var(--display);
		font-weight: 800;
		font-size: 1.5rem;
		text-decoration: none;
		letter-spacing: 0.02em;
	}
	.nav-links {
		display: flex;
		gap: clamp(1rem, 2.4vw, 1.8rem);
	}
	.nav-links a {
		position: relative;
		text-decoration: none;
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--ink-dim);
		transition: color 0.2s var(--ease);
	}
	.nav-links a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -6px;
		width: 100%;
		height: 2px;
		background: var(--magenta);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.25s var(--ease);
	}
	.nav-links a:hover {
		color: var(--ink);
	}
	.nav-links a:hover::after {
		transform: scaleX(1);
	}
	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.nav-ig {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 999px;
		color: var(--ink);
		border: 1.5px solid rgba(246, 241, 255, 0.28);
		transition:
			color 0.2s var(--ease),
			border-color 0.2s var(--ease),
			transform 0.15s var(--ease);
	}
	.nav-ig:hover {
		color: var(--magenta);
		border-color: var(--magenta);
		transform: translateY(-2px);
	}
	.nav-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.45em;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9rem;
		padding: 0.5em 1.15em;
		border-radius: 999px;
		background: var(--lime);
		color: #0a0410;
		transition: transform 0.15s var(--ease);
	}
	.nav-cta:hover {
		transform: translateY(-2px);
	}

	/* ---------- HERO ---------- */
	.hero {
		padding-top: clamp(48px, 8vw, 96px);
		padding-bottom: clamp(40px, 6vw, 72px);
	}
	.hero-title {
		font-weight: 800;
		text-transform: uppercase;
		font-size: clamp(1.6rem, 8.4vw, 7rem);
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

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.55em;
		text-decoration: none;
		font-weight: 700;
		padding: 0.8em 1.6em;
		border-radius: 999px;
		transition:
			transform 0.15s var(--ease),
			box-shadow 0.15s var(--ease),
			background 0.2s var(--ease);
	}
	.btn.sm {
		padding: 0.65em 1.25em;
		font-size: 0.9rem;
	}
	.btn:hover {
		transform: translateY(-2px);
	}
	.btn:active {
		transform: translateY(0);
	}
	.btn-primary {
		background: var(--magenta);
		color: #0a0410;
		box-shadow: 0 6px 0 rgba(255, 46, 136, 0.35);
	}
	.btn-primary:hover {
		box-shadow: 0 9px 0 rgba(255, 46, 136, 0.3);
	}
	.btn-ghost {
		border: 2px solid rgba(246, 241, 255, 0.4);
		color: var(--ink);
	}
	.btn-ghost:hover {
		border-color: var(--ink);
	}

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
		border-top: 1px solid rgba(246, 241, 255, 0.14);
	}
	.member {
		position: relative;
		padding: clamp(1.4rem, 4vw, 2.8rem) 0;
		border-bottom: 1px solid rgba(246, 241, 255, 0.14);
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
	.member-nick {
		font-family: var(--body);
		font-size: clamp(0.85rem, 1.6vw, 1.05rem);
		color: var(--ink-dim);
		font-weight: 500;
		text-transform: none;
		letter-spacing: 0;
		vertical-align: middle;
		margin-left: 0.4em;
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

	/* ---------- MUSIC ---------- */
	.releases {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		align-items: start;
		gap: 1.5rem;
		margin-top: 2rem;
	}
	.release {
		border: 1px solid rgba(246, 241, 255, 0.16);
		border-radius: var(--radius);
		padding: clamp(1.4rem, 3vw, 2rem);
		background: linear-gradient(160deg, rgba(139, 47, 255, 0.14), rgba(10, 4, 16, 0.2));
		transition:
			transform 0.25s var(--ease),
			border-color 0.25s var(--ease);
	}
	.release:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 46, 136, 0.5);
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
	.tracklist {
		margin: 0.7rem 0 1.4rem;
		padding-left: 1.4rem;
		color: var(--ink-dim);
		font-size: 0.92rem;
	}
	.tracklist li {
		padding: 0.14rem 0;
	}
	.tracklist li::marker {
		color: var(--lime);
		font-variant-numeric: tabular-nums;
	}

	/* ---------- LIVE ---------- */
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
	.show-tag.past {
		background: transparent;
		border: 1px solid rgba(246, 241, 255, 0.3);
		color: var(--ink-dim);
	}

	/* ---------- FOOTER ---------- */
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
	.footer-meta {
		text-align: right;
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

	/* keyboard accessibility */
	.nav a:focus-visible,
	.btn:focus-visible,
	.social:focus-visible,
	.chip:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
		border-radius: 6px;
	}

	/* ---------- RESPONSIVE ---------- */
	@media (max-width: 1024px) {
		.about {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 820px) {
		.nav-links {
			display: none;
		}
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
		.footer-inner {
			grid-template-columns: 1fr;
			align-items: start;
		}
		.footer-meta {
			text-align: left;
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
		.nav-cta {
			padding: 0.5em 0.95em;
		}
	}
</style>
