# Marchal Zoé — Portfolio

Portfolio de **Zoé Marchal**, graphic designer — identité visuelle, UI, affiche, édition.

Designé par Zoé Marchal — développé par [Thomas Lekieffre](https://github.com/thomaslekieffre).

→ **[zoemarchal.vercel.app](https://zoemarchal.vercel.app)**

---

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** — animations et transitions
- **pnpm**

## Structure

```
components/
├── Hero.tsx               # Page d'accueil avec titre animé et arche
├── About.tsx              # Présentation, centres d'intérêts, contacts
├── Footer.tsx             # Footer avec contacts et avatar
├── ScallopDivider.tsx     # Séparateurs demi-cercles animés
├── ScrollIndicator.tsx    # Indicateur de scroll Hero
├── BackToTop.tsx          # Bouton retour en haut
└── projects/
    ├── RafaleProject.tsx  # Projet Rafale (identité visuelle)
    ├── JumioProject.tsx   # Projet Jumio (UI/UX)
    └── MainsquareProject.tsx # Projet Mainsquare (affiche / print)
```

## Lancer en local

```bash
pnpm install
pnpm dev
```

Ouvre [http://localhost:3000](http://localhost:3000).
