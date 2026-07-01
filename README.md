# SuperMegaSuperCool Révolution — site officiel

Site officiel (fan-made) du groupe **SuperMegaSuperCool Révolution** (SMSCR),
quintette de jazz psychédélique / prog-fusion basé à **Lyon**.

> *L'abolition des frontières esthétiques.*

Built with [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5) and prerendered to
a fully static site with `@sveltejs/adapter-static`.

## Le groupe

- **Siméon Peronnet** — trompette
- **Gabin Alessio** — guitare
- **Timéo Constant** — basse
- **Fanga « Fangito » Thévenin** — batterie
- **Justinien « Juice » Berthon-Moine** — claviers

Influences : Stereolab, Mahavishnu Orchestra, Black Midi, Roni Size, Santana.
Lauréats **Un Doua Jazz 2024**.

## Écouter

- [Bandcamp](https://supermegasupercoolrevolution.bandcamp.com)
- [Spotify](https://open.spotify.com/artist/1X1vH2wpLqAl3v2O16WQGu)
- [Deezer](https://www.deezer.com/en/artist/221241275)
- [Instagram](https://www.instagram.com/supermegasupercoolrevolution/)

## Développement

```bash
npm install
npm run dev      # serveur de dev
npm run build    # build statique -> ./build
npm run preview  # prévisualiser le build
```

## Déploiement

Un workflow GitHub Actions (`.github/workflows/deploy.yml`) construit et publie
automatiquement le site sur **GitHub Pages** à chaque push sur `main`. Le build
utilise la variable `BASE_PATH=/<repo>` pour servir le site depuis
`https://<user>.github.io/<repo>`.

Pour activer : **Settings → Pages → Source → GitHub Actions**.

---

Contenu compilé à partir des pages publiques du groupe (Bandcamp, Nébuleuse Sonore,
Spotify, Deezer). Site non officiel réalisé par un fan.
