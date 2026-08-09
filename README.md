# Gloom

A browser prototype for Gloom, built from the rulebook and card-deck PDFs in
this repository. The first slice focuses on the table experience: family
boards, hand/discard flow, attached Pathos modifiers, death gating, and a
gothic dark presentation inspired by Politikum.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Current structure

```text
src/
  main.jsx       React entry point
  App.jsx        playable vertical slice and game state
  style.css      gothic table UI
RULES.md         PDF-derived rules baseline and scope notes
```

The next extraction step is to move card data and game transitions into
`src/data/` and `src/engine/` as card-specific effects are implemented.
