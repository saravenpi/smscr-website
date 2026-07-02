<script lang="ts">
	import { base } from '$app/paths';
	import { reveal } from '$lib/reveal';
	import { pressQuotes, pressDocs, contactEmail } from '$lib/data';
	import FileText from '@lucide/svelte/icons/file-text';
	import Download from '@lucide/svelte/icons/download';
	import Mail from '@lucide/svelte/icons/mail';
	import Quote from '@lucide/svelte/icons/quote';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
</script>

<!-- PRESSE & BOOKING -->
<section id="presse" class="press-section">
	<div class="wrap">
		<div class="reveal" use:reveal>
			<p class="eyebrow"><FileText size={13} />Espace pro</p>
			<h2 class="section-title">Presse &amp; booking</h2>
			<p class="press-lead">
				Programmateur·rice ou journaliste&nbsp;? Le dossier de presse réunit bio, visuels,
				discographie, concerts et revue de presse — tout ce qu'il faut pour parler du groupe et le
				programmer.
			</p>
		</div>

		<h3 class="press-subhead reveal" use:reveal>Ils en parlent</h3>
		<div class="press-quotes">
			{#each pressQuotes as q (q.outlet + (q.author ?? ''))}
				<figure class="quote reveal" use:reveal>
					<Quote class="quote-mark" size={20} strokeWidth={2.25} />
					<blockquote>{q.quote}</blockquote>
					<figcaption class="quote-by">
						{#if q.author}<span class="quote-author">{q.author}</span>{/if}
						{#if q.url}
							<a class="quote-outlet" href={q.url} target="_blank" rel="noopener">
								{q.outlet}<ArrowUpRight size={13} />
							</a>
						{:else}
							<span class="quote-outlet">{q.outlet}</span>
						{/if}
					</figcaption>
				</figure>
			{/each}
		</div>

		<h3 class="press-subhead reveal" use:reveal>À télécharger</h3>
		<div class="press-grid">
			{#each pressDocs as doc, i (doc.title)}
				<a
					class="press-card card reveal"
					use:reveal={{ delay: i * 90 }}
					href={doc.href ?? `${base}${doc.file}`}
					download={doc.file ? doc.downloadAs : undefined}
					target={doc.href ? '_blank' : undefined}
					rel={doc.href ? 'noopener' : undefined}
				>
					<span class="press-icon"><Download size={22} strokeWidth={2.25} /></span>
					<span class="press-text">
						<span class="press-title">{doc.title}</span>
						<span class="press-desc">{doc.desc}</span>
						<span class="press-meta">{doc.meta}</span>
					</span>
				</a>
			{/each}
			<a
				class="press-card press-contact card reveal"
				use:reveal={{ delay: pressDocs.length * 90 }}
				href="mailto:{contactEmail}?subject=Booking%20SMSCR"
			>
				<span class="press-icon"><Mail size={22} strokeWidth={2.25} /></span>
				<span class="press-text">
					<span class="press-title">Booking</span>
					<span class="press-desc">Une date, une prog, une interview&nbsp;? Écrivez-nous.</span>
					<span class="press-meta">{contactEmail}</span>
				</span>
			</a>
		</div>
	</div>
</section>

<style>
	/* ---------- PRESSE & BOOKING ---------- */
	.press-lead {
		max-width: 60ch;
		color: var(--ink-dim);
		font-size: 1.1rem;
		margin: 0 0 2.4rem;
	}
	.press-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: 1.5rem;
	}
	.press-card {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		padding: clamp(1.3rem, 3vw, 1.8rem);
		text-decoration: none;
		color: var(--ink);
	}
	.press-card:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
	}
	.press-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 52px;
		height: 52px;
		border-radius: 14px;
		background: var(--magenta);
		color: #0a0410;
		transition: transform 0.25s var(--ease);
	}
	.press-contact .press-icon {
		background: var(--lime);
	}
	.press-card:hover .press-icon {
		transform: translateY(-2px) rotate(-4deg);
	}
	.press-text {
		display: flex;
		flex-direction: column;
		gap: 0.22rem;
		min-width: 0;
	}
	.press-title {
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.2rem;
	}
	.press-desc {
		color: var(--ink-dim);
		font-size: 0.95rem;
		line-height: 1.4;
	}
	.press-meta {
		margin-top: 0.15rem;
		font-size: 0.78rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--cyan);
		/* long email must not overflow the card */
		overflow-wrap: anywhere;
	}

	/* ---------- PRESS QUOTES ---------- */
	.press-subhead {
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.2rem;
		margin: 0 0 1.1rem;
	}
	.press-quotes {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(270px, 100%), 1fr));
		gap: 1.2rem;
		margin: 0 0 2.6rem;
	}
	.quote {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: clamp(1.3rem, 3vw, 1.7rem);
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius);
		background: linear-gradient(160deg, rgba(34, 224, 255, 0.09), rgba(10, 4, 16, 0.2));
	}
	.quote :global(.quote-mark) {
		color: var(--cyan);
		flex-shrink: 0;
	}
	.quote blockquote {
		margin: 0;
		font-size: 1rem;
		line-height: 1.55;
		color: var(--ink);
	}
	.quote-by {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	.quote-author {
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.02rem;
	}
	.quote-outlet {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		width: fit-content;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--cyan);
		text-decoration: none;
	}
	a.quote-outlet:hover {
		color: var(--lime);
	}
	a.quote-outlet:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
		border-radius: 4px;
	}
</style>
