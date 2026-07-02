// Band data for SuperMegaSuperCool Révolution (SMSCR).
// Sourced from the band's Bandcamp, Nébuleuse Sonore, Spotify & Deezer pages.

// Release artwork, extracted from the album files and optimised for the web.
import inspektherCover from './assets/covers/inspekther.jpg';
import alaiseCover from './assets/covers/alaise.jpg';

// Canonical site origin (no trailing slash) — used for SEO absolute URLs.
export const siteUrl = 'https://smscr.fr';
export const contactEmail = 'contact@smscr.fr';

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
	name: string;
	nick?: string;
	role: string;
	blurb: string;
};

export const members: Member[] = [
	{
		name: 'Siméon',
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
		name: 'Justinien',
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
		link: 'https://supermegasupercoolrevolution.bandcamp.com'
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
	date: string; // ISO
	label: string; // human-readable date
	venue: string;
	city: string;
	free?: boolean;
	link?: string;
};

// Ordered chronologically. `date` used to split upcoming vs. past.
export const shows: Show[] = [
	{
		date: '2026-01-15',
		label: '15 janvier 2026',
		venue: 'L’Ampérage',
		city: 'Grenoble (38)'
	},
	{
		date: '2026-01-17',
		label: '17 janvier 2026',
		venue: 'Le 648 Café',
		city: 'Marcellaz (74)'
	},
	{
		date: '2026-01-18',
		label: '18 janvier 2026',
		venue: 'Le Brin de Zinc',
		city: 'Barberaz (73)'
	},
	{
		date: '2026-01-21',
		label: '21 janvier 2026',
		venue: 'Ninkasi Cordeliers',
		city: 'Lyon (69)'
	},
	{
		date: '2026-02-02',
		label: '2 février 2026',
		venue: 'Saint-Fons Jazz Festival',
		city: 'Saint-Fons (69)'
	},
	{
		date: '2026-02-10',
		label: '10 février 2026',
		venue: 'Le Périscope',
		city: 'Lyon (69)'
	},
	{
		date: '2026-03-27',
		label: '27 mars 2026',
		venue: 'L’Aparté',
		city: 'Roanne (42)'
	},
	{
		date: '2026-03-28',
		label: '28 mars 2026',
		venue: 'La Grange des Hauts',
		city: 'Sourcieux-les-Mines (69)'
	},
	{
		date: '2026-04-02',
		label: '2 avril 2026',
		venue: 'Le Cirque Électrique',
		city: 'Paris (75)'
	},
	{
		date: '2026-04-03',
		label: '3 avril 2026',
		venue: 'La Marbrerie',
		city: 'Montreuil (93)'
	},
	{
		date: '2026-05-21',
		label: '21–22 mai 2026',
		venue: 'FIMU',
		city: 'Belfort (90)',
		free: true
	},
	{
		date: '2026-05-24',
		label: '24 mai 2026',
		venue: "24h de l'INSA",
		city: 'Villeurbanne (69)',
		free: true
	},
	{
		date: '2026-07-11',
		label: '11 juillet 2026',
		venue: 'Jazz à Vienne',
		city: 'Vienne (38)',
		free: true
	},
	{
		date: '2026-07-17',
		label: '17 juillet 2026',
		venue: 'La Grange Merveilleuse',
		city: 'La Chapelle-Naude (71)'
	}
];

export type Link = { label: string; url: string };

export const links: Link[] = [
	{ label: 'Bandcamp', url: 'https://supermegasupercoolrevolution.bandcamp.com' },
	{ label: 'Spotify', url: 'https://open.spotify.com/artist/1X1vH2wpLqAl3v2O16WQGu' },
	{ label: 'Deezer', url: 'https://www.deezer.com/en/artist/221241275' },
	{ label: 'Instagram', url: 'https://www.instagram.com/supermegasupercoolrevolution/' },
	{ label: 'YouTube', url: 'https://www.youtube.com/watch?v=-Pk-eKO_yDA' }
];

export const awards = ['Lauréats Un Doua Jazz 2024', 'Accompagnement Ninkasi Music Lab'];
