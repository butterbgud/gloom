# Gloom hand fan and borderless character boards

This plan follows `/home/clop/.openclaw/workspace/PLANS.md`.

## Purpose / Big Picture

The table should feel like a physical Gloom table: the player’s cards should
overlap in a readable fan, with the selected card lifting above its neighbors,
and character portraits should no longer sit inside rectangular card frames.
The result is visible by running `npm run dev`, starting a game, and observing
the hand at the bottom and both player and opponent character rows.

## Progress

- [x] (2026-08-10 17:12 Europe/Tallinn) Inspected the legacy OHSP fan pattern and current Gloom layout.
- [x] (2026-08-10 17:15 Europe/Tallinn) Added the OHSP-style overlapping hand fan with rotation, selection lift, and narrow-screen scrolling.
- [x] (2026-08-10 17:15 Europe/Tallinn) Removed character-card border squares while retaining hover/target glow.
- [x] (2026-08-10 17:18 Europe/Tallinn) Tightened the mobile layout, removed portrait circles and living labels, and made the fan more visible at phone widths.
- [x] (2026-08-10 17:26 Europe/Tallinn) Simplified the header and quick rules, added Gloom-tagged bug-report copying, removed character names, and enlarged character art.
- [x] (2026-08-10 17:34 Europe/Tallinn) Replaced character family symbols with Self-Worth totals and added overlapping hover/target zoom.
- [x] (2026-08-10 17:40 Europe/Tallinn) Moved Turn and Plays to the top-left, removed redundant table copy, and tightened mobile character overlap.
- [ ] Build, inspect the diff, commit, and push.

## Surprises & Discoveries

- The legacy OHSP implementation uses absolutely positioned cards, small
  horizontal steps, rotation around the bottom center, and higher z-index for
  hovered or selected cards. This is suitable for Gloom’s five-card hand.
- Gloom currently renders the hand as a five-column grid and character cards as
  bordered buttons, so both visual changes can remain local to `src/App.jsx`
  and `src/style.css`.

## Decision Log

- Decision: Use the OHSP-style overlapping fan only for the player’s hand,
  keeping card selection and the existing inspector unchanged.
  Rationale: Opponent hands are not revealed in Gloom, and the current game
  state has no opponent-card-face data to display.
- Decision: Make character buttons borderless but retain a subtle hover and
  target glow.
  Rationale: Removing the square frame must not remove the target affordance
  needed for playing Modifiers and Untimely Deaths.

## Outcomes & Retrospective

The second UI pass is complete and the production build passes. Mobile rules
now reduce board, character, portrait, and hand-card dimensions; the remaining
validation is the final Git commit. The latest pass intentionally makes the
portrait art larger while hiding duplicate printed names.

## Context and Orientation

`src/App.jsx` owns the table markup. The hand is rendered in `App` through
`hand-row` and `HandCard`; `FamilyBoard` renders every player’s character row
through `CharacterCard`. `src/style.css` contains the existing rectangular
`.hand-card` and `.character-card` rules. The read-only legacy reference is
`LEGACY (READ ONLY)/ohmp-mob/src/components/DraftSeats.jsx`; its staggered
backs establish the basic fan pattern, while the fuller rotation approach is
visible in `LEGACY (READ ONLY)/suffering/src/multiplayer/SpineUI.jsx`.

## Plan of Work

Replace the `hand-row` grid container with a relative fan container whose width
is based on the hand count. Render each `HandCard` in an absolutely positioned
wrapper with a small horizontal step, a rotation around the bottom center, and
an elevated z-index for selection. Keep the card face dimensions readable on
desktop and allow horizontal scrolling on narrow screens.

Change `.character-card` from a bordered rectangular panel to a transparent,
borderless button with the same padding and minimum height. Keep the portrait,
name, score, and modifier stack intact. Use a translucent hover/target glow
instead of a square border.

## Concrete Steps

From `/home/clop/citadel/gloom`:

    npm run build
    git status --short

The build should finish with Vite’s `built in ...` success line. Then commit
the UI changes and push them to the existing `origin` remote on `main`.

## Validation and Acceptance

After `npm run dev`, start an original-edition game with the default hand. The
five cards must overlap in a fan, remain individually clickable, and show the
selected card above its neighbors. Hovering a card should raise it without
making the others unreachable. Character portraits must have no rectangular
outer border for either the player or opponents; clicking a target must still
show a clear glow.

## Idempotence and Recovery

The change is limited to markup and CSS. Re-running the build is safe. If the
fan is too wide on a narrow viewport, adjust only the fan container’s overflow
and card step; do not restore the old grid unless interaction becomes unusable.

## Artifacts and Notes

The expected implementation uses a wrapper such as `hand-fan-card` around each
`HandCard`, with inline styles for `left`, `zIndex`, `transform`, and
`transformOrigin: 'bottom center'`.

## Update note

Updated during implementation on 2026-08-10: the fan was implemented directly
in `App` with five-card spacing capped at 130 pixels and a 24-degree total
spread. Character frames are overridden at the end of `src/style.css` so the
existing layout remains stable while the visible borders disappear.

## Interfaces and Dependencies

No new dependency is required. The existing React state `game.hand` and
`game.selectedCard` remain the source of truth, and `HandCard` keeps its
existing `{ card, selected, onClick }` interface.
