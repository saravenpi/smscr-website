// Band data for SuperMegaSuperCool Révolution (SMSCR).
// Sourced from the band's Bandcamp, Nébuleuse Sonore, Spotify & Deezer pages.

// Release artwork, extracted from the album files and optimised for the web.
import inspektherCover from './assets/covers/inspekther.jpg';
import alaiseCover from './assets/covers/alaise.jpg';

// Canonical site origin (no trailing slash) — used for SEO absolute URLs.
export const siteUrl = 'https://smscr.fr';
export const contactEmail = 'contact@smscr.fr';

// Concise <meta description> / OG / Twitter summary (~150 chars). `band.intro`
// is written for humans and runs too long for search snippets (Google truncates
// around 155 chars), so we keep a dedicated, tighter line for metadata.
export const metaDescription =
	'SuperMegaSuperCool Révolution (SMSCR) — quintette de jazz psychédélique et prog-fusion de Lyon. Écoutez la musique, découvrez le groupe et les dates de concert.';

// YouTube video featured in the on-site player — the official "Prélude & Intro"
// music video. Kept separate from the YouTube entry in `links` (the band's public
// profile for the footer + SEO `sameAs`): a channel URL and an embeddable clip
// are different things.
export const featuredVideoId = 'K251kNDaAMA';

export const band = {
	name: 'SuperMegaSuperCool Révolution',
	short: 'SMSCR',
	tagline: "L'abolition des frontières esthétiques",
	city: 'Lyon, France',
	genres: ['prog', 'fusion', 'jazz psychédélique', 'funk', 'punk', 'drum & bass'],
	intro:
		"Cinq musiciens, une énergie débordante et un besoin viscéral de casser les codes. " +
		"SuperMegaSuperCool Révolution, c'est du jazz psychédélique sans barrières : " +
		"harmonies planantes, dynamiques survoltées et atmosphères bruitistes, le tout avec autodérision.",
	influences: [
		'Stereolab',
		'Mahavishnu Orchestra',
		'Black Midi',
		'Roni Size',
		'Santana'
	]
};

export type Member = {
	name: string; // stage name / pseudo shown on the site
	role: string;
	blurb: string;
};

export const members: Member[] = [
	{
		name: 'Mr. Meon',
		role: 'Trompette',
		blurb: 'Les mélodies cuivrées qui percent le mur du son. Membre du trio fondateur.'
	},
	{
		name: 'Gabin',
		role: 'Guitare',
		blurb: 'Riffs anguleux et textures saturées, entre fusion 70s et post-punk.'
	},
	{
		name: 'Timéo',
		role: 'Basse',
		blurb: 'La colonne vertébrale groove du groupe, du trio des origines à aujourd’hui.'
	},
	{
		name: 'Fanga',
		role: 'Batterie',
		blurb: 'Frappe hyperactive nourrie à la drum & bass. Locomotive rythmique du combo.'
	},
	{
		name: 'Juice',
		role: 'Claviers',
		blurb: 'Synthèse analogique et nappes psychédéliques. L’alchimiste des sons neufs.'
	}
];

export type Release = {
	title: string;
	type: 'Album' | 'EP' | 'Single';
	year: string;
	label?: string;
	note?: string;
	tracks?: string[];
	link?: string;
	cover?: string;
};

export const releases: Release[] = [
	{
		title: 'Les Aventures de l’Inspecteur Inspekther Contre le Gang des Chats',
		type: 'EP',
		year: '2026',
		cover: inspektherCover,
		note: 'Le film noir le plus funky de l’année.',
		link: 'https://supermegasupercoolrevolution.bandcamp.com/album/les-aventures-de-linspecteur-inspekther-contre-le-gang-des-chats'
	},
	{
		title: 'À l’aise avec SuperMegaSuperCool Révolution',
		type: 'Album',
		year: '2024',
		cover: alaiseCover,
		label: 'Rhone X',
		tracks: [
			'Prelude (ft. Emmanuelle Saby)',
			'Intro (ft. Jean-Luc Hyvoz)',
			'La Bossa Nova Drum And Bass',
			'Folie Fusion',
			'Paint Again',
			'Interlude Fangito',
			'La Re Fa Famille',
			'Interlude Ju',
			'Full Speed Render'
		],
		link: 'https://supermegasupercoolrevolution.bandcamp.com/album/laise-avec-supermegasupercool-r-volution'
	}
];

export type Show = {
	date: string; // ISO (start date)
	endDate?: string; // ISO end date for multi-day gigs (festivals)
	label: string; // human-readable date
	venue: string;
	city: string;
	free?: boolean;
	link?: string;
};

// Ordered chronologically. `date` used to split upcoming vs. past.
export const shows: Show[] = [
	{ date: '2023-02-03', label: '3 février 2023', venue: 'ENM', city: 'Villeurbanne (69)' },
	{ date: '2023-04-22', label: '22 avril 2023', venue: 'Toï Toï le Zinc', city: 'Villeurbanne (69)' },
	{ date: '2023-06-14', label: '14 juin 2023', venue: 'La Commune', city: 'Lyon (69)' },
	{ date: '2023-10-14', label: '14 octobre 2023', venue: 'Taille Crayon', city: 'Villeurbanne (69)' },
	{ date: '2023-10-23', label: '23 octobre 2023', venue: 'Café Galerie × Aziz Sound System', city: 'Lyon (69)' },
	{ date: '2023-11-10', label: '10 novembre 2023', venue: 'Boulangerie du Prado', city: 'Lyon (69)' },
	{ date: '2023-11-30', label: '30 novembre 2023', venue: 'Kraspek Myzik', city: 'Lyon (69)' },
	{ date: '2023-12-18', endDate: '2023-12-19', label: '18–19 décembre 2023', venue: 'Le Périscope (résidence)', city: 'Lyon (69)' },
	{ date: '2024-01-23', label: '23 janvier 2024', venue: 'Sirius', city: 'Lyon (69)' },
	{ date: '2024-01-26', label: '26 janvier 2024', venue: 'Toï Toï le Zinc', city: 'Villeurbanne (69)' },
	{ date: '2024-02-03', label: '3 février 2024', venue: 'Grrrnd Zéro', city: 'Vaulx-en-Velin (69)' },
	{ date: '2024-03-01', label: '1er mars 2024', venue: 'Café Galerie', city: 'Lyon (69)' },
	{ date: '2024-03-06', label: '6 mars 2024', venue: 'BIJ de Villeurbanne (tremplin scène émergence)', city: 'Villeurbanne (69)' },
	{ date: '2024-03-09', label: '9 mars 2024', venue: 'Café Galerie × Aziz Sound System', city: 'Lyon (69)' },
	{ date: '2024-03-16', label: '16 mars 2024', venue: 'Toï Toï le Zinc', city: 'Villeurbanne (69)' },
	{ date: '2024-04-13', label: '13 avril 2024', venue: 'Bar des Capucins (jam session)', city: 'Lyon (69)' },
	{ date: '2024-04-30', label: '30 avril 2024', venue: 'Le Heat (Jazz Day)', city: 'Lyon (69)' },
	{ date: '2024-05-03', label: '3 mai 2024', venue: 'Tram 33', city: 'Lyon (69)' },
	{ date: '2024-06-06', label: '6 juin 2024', venue: 'Clé de Voûte (tremplin Un Doua de Jazz)', city: 'Lyon (69)' },
	{ date: '2024-06-08', label: '8 juin 2024', venue: 'Toï Toï le Zinc', city: 'Villeurbanne (69)' },
	{ date: '2024-06-21', label: '21 juin 2024', venue: 'Festival des Invites', city: 'Villeurbanne (69)' },
	{ date: '2024-07-06', label: '6 juillet 2024', venue: 'Vivez l’été', city: 'Villeurbanne (69)' },
	{ date: '2024-09-14', label: '14 septembre 2024', venue: 'Girasol', city: 'Villeurbanne (69)' },
	{ date: '2024-10-11', label: '11 octobre 2024', venue: 'Le Périscope (festival Un Doua de Jazz)', city: 'Lyon (69)' },
	{ date: '2024-10-12', label: '12 octobre 2024', venue: 'Bar des Capucins', city: 'Lyon (69)' },
	{ date: '2024-10-16', label: '16 octobre 2024', venue: 'Fabuleuse Cantine', city: 'Lyon (69)' },
	{ date: '2024-11-01', label: '1er novembre 2024', venue: 'Babayaga', city: 'Chantelle (03)' },
	{ date: '2024-11-16', label: '16 novembre 2024', venue: 'Festival des Dindes Folles', city: 'Rivolet (69)' },
	{ date: '2024-12-03', label: '3 décembre 2024', venue: 'Ninkasi Cordeliers (release party)', city: 'Lyon (69)' },
	{ date: '2024-12-04', label: '4 décembre 2024', venue: 'Le Brin de Zinc (release party)', city: 'Barberaz (73)' },
	{ date: '2024-12-12', label: '12 décembre 2024', venue: 'Tremplin des 24h de l’INSA', city: 'Villeurbanne (69)' },
	{ date: '2025-04-05', label: '5 avril 2025', venue: 'Bar des Capucins (jam MSF Palestine)', city: 'Lyon (69)' },
	{ date: '2025-04-09', label: '9 avril 2025', venue: 'La Pente', city: 'Lyon (69)' },
	{ date: '2025-04-11', label: '11 avril 2025', venue: 'Parvis de l’Amphithéâtre 3000', city: 'Lyon (69)' },
	{ date: '2025-04-26', label: '26 avril 2025', venue: 'Live session INA', city: 'Bry-sur-Marne (94)' },
	{ date: '2025-04-30', label: '30 avril 2025', venue: 'Le Heat (Jazz Day)', city: 'Lyon (69)' },
	{ date: '2025-05-02', label: '2 mai 2025', venue: 'Toï Toï le Zinc', city: 'Villeurbanne (69)' },
	{ date: '2025-06-06', label: '6 juin 2025', venue: 'Marché Gare', city: 'Lyon (69)' },
	{ date: '2025-06-14', label: '14 juin 2025', venue: 'Festival de l’Alternative', city: 'Rhône (69)' },
	{ date: '2025-07-05', label: '5 juillet 2025', venue: 'Pelargo', city: 'Villeurbanne (69)' },
	{ date: '2025-09-11', label: '11 septembre 2025', venue: 'Ninkasi Cordeliers', city: 'Lyon (69)' },
	{ date: '2025-09-20', label: '20 septembre 2025', venue: 'Saint-Germain (Impasse du Merlot)', city: 'Saint-Germain (07)' },
	{ date: '2025-10-17', endDate: '2025-10-18', label: '17–18 octobre 2025', venue: 'Carpe Diem', city: 'Arâches-la-Frasse (74)' },
	{ date: '2025-10-19', label: '19 octobre 2025', venue: 'Tremplin JazzContreBand (eMA)', city: 'Genève (Suisse)' },
	{ date: '2025-10-24', label: '24 octobre 2025', venue: 'Halle Hybride', city: 'Roanne (42)' },
	{ date: '2025-11-18', endDate: '2025-11-19', label: '18–19 novembre 2025', venue: 'Les Abattoirs (résidence avec Benjamin Vaude)', city: 'Bourgoin-Jallieu (38)' },
	{ date: '2026-01-15', label: '15 janvier 2026', venue: 'L’Ampérage', city: 'Grenoble (38)' },
	{ date: '2026-01-16', label: '16 janvier 2026', venue: 'Le 648 Café', city: 'Marcellaz (74)' },
	{ date: '2026-01-18', label: '18 janvier 2026', venue: 'Le Brin de Zinc', city: 'Barberaz (73)' },
	{ date: '2026-01-21', label: '21 janvier 2026', venue: 'Ninkasi Cordeliers', city: 'Lyon (69)' },
	{ date: '2026-01-29', label: '29 janvier 2026', venue: 'Saint-Fons Jazz Festival', city: 'Saint-Fons (69)' },
	{ date: '2026-02-10', label: '10 février 2026', venue: 'Le Périscope (release party)', city: 'Lyon (69)' },
	{ date: '2026-04-03', label: '3 avril 2026', venue: 'La Marbrerie (release party)', city: 'Montreuil (93)' },
	{ date: '2026-05-21', endDate: '2026-05-22', label: '21–22 mai 2026', venue: 'FIMU', city: 'Belfort (90)', free: true },
	{ date: '2026-05-24', label: '24 mai 2026', venue: '24h de l’INSA', city: 'Villeurbanne (69)', free: true },
	{ date: '2026-06-06', label: '6 juin 2026', venue: 'Festiv’UT', city: 'Belfort (90)' },
	{ date: '2026-07-11', label: '11 juillet 2026', venue: 'Jazz à Vienne', city: 'Vienne (38)', free: true },
	{ date: '2026-07-17', label: '17 juillet 2026', venue: 'Le 648 Café', city: 'Marcellaz (74)' },
	{ date: '2026-07-18', endDate: '2026-07-19', label: '18–19 juillet 2026', venue: 'La Grange Merveilleuse', city: 'La Chapelle-Naude (71)' },
	{ date: '2026-07-22', label: '22 juillet 2026', venue: 'La Pente', city: 'Lyon (69)' },
	{ date: '2026-07-30', label: '30 juillet 2026', venue: 'Nuits de la Poterie', city: 'Lhuis (01)' },
	{ date: '2026-07-31', label: '31 juillet 2026', venue: 'La Poule à Facettes', city: 'Piégros-la-Clastre (26)', free: true },
];

export type Link = { label: string; url: string };

export const links: Link[] = [
	{ label: 'Bandcamp', url: 'https://supermegasupercoolrevolution.bandcamp.com' },
	{ label: 'Spotify', url: 'https://open.spotify.com/artist/1X1vH2wpLqAl3v2O16WQGu' },
	{ label: 'Deezer', url: 'https://www.deezer.com/artist/221241275' },
	{ label: 'Instagram', url: 'https://www.instagram.com/supermegasupercoolrevolution/' },
	{ label: 'YouTube', url: 'https://www.youtube.com/@SuperMegaSuperCoolRevolution' }
];

// Wins/selections shown as distinction pills; awards[0] also appears in the hero
// eyebrow, so keep the strongest first. Also fed to schema.org `award` (JSON-LD).
export const awards = [
	'Sélection Tremplin JazzContreBand 2025',
	'Accompagnement Ninkasi Music Lab',
	'Lauréats Un Doua Jazz 2024',
	'Lauréats Bourse d’Initiative Jeunes — BIJ Villeurbanne'
];

// Downloadable pro documents (press kit, and later the technical rider). Files
// live in static/ and are served from the site root — prefix `file` with `base`
// in markup. Best practice: keep the press kit (for journalists/programmers) and
// the fiche technique (for venue sound/light crews) as SEPARATE downloads.
export type PressDoc = {
	title: string;
	desc: string;
	file: string; // root-relative path under static/
	downloadAs: string; // ASCII-safe filename suggested to the browser
	meta: string; // format · date · size
};

export const pressDocs: PressDoc[] = [
	{
		title: 'Dossier de presse',
		desc: 'Bio, visuels, discographie, concerts & résidences, revue de presse et contacts.',
		file: '/smscr-dossier-de-presse.pdf',
		downloadAs: 'SMSCR-Dossier-de-presse-Fevrier-2026.pdf',
		meta: 'PDF · Février 2026 · 1,6 Mo'
	},
	{
		title: 'Fiche technique',
		desc: 'Plan de scène, patch et besoins backline & retours pour les régies.',
		file: '/smscr-fiche-technique.pdf',
		downloadAs: 'SMSCR-Fiche-technique.pdf',
		meta: 'PDF · 2,8 Mo'
	}
];

// Press quotes (from the band's dossier de presse). The FIP one links to the
// Radio France article; the others have no public URL, so no link is shown.
export type PressQuote = {
	quote: string;
	author?: string;
	outlet: string;
	url?: string;
};

export const pressQuotes: PressQuote[] = [
	{
		quote:
			'Déjà leur premier album, véritable bombe sonore produite par Rhône X, marquait la naissance d’un groupe hors normes […] SMSCR se définit par l’abolition des frontières esthétiques, un jazz turbulent, psychédélique, dopé au funk et à la fusion.',
		author: 'Véronique Hilaire',
		outlet: 'FIP · Radio France',
		url: 'https://www.radiofrance.fr/fip/a-suivre-les-peregrinations-musicales-de-supermegasupercool-revolution-smscr-en-exclusivite-5238300'
	},
	{
		quote:
			'Un jazz fusion plein de groove et de funk, mais qui refuse de se laisser enfermer dans les codes du genre. […] Pour être cools, ils sont cools. Ils n’usurpent pas leur drôle de nom.',
		author: 'J.-P. Zanolo',
		outlet: 'Le Progrès'
	},
	{
		quote:
			'Comment ne pas se laisser emporter par ces cinq acrobates survitaminés ? […] Cette bande de potes garantit de belles promesses et on espère les revoir bientôt pour un deuxième round toujours plus frénétique.',
		outlet: 'Septième'
	}
];
