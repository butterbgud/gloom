# Gloom — rules baseline

Source of truth: `GloomRules246x255.pdf` and `Gloom_cards.pdf` in this repository.

## Objective

Gloom is a 2–4 player card game. Each player controls a family and wants the
lowest total Family Value. Only the player's own dead characters contribute to
that final score.

The supplied deck contains 20 Character cards, 58 Modifier cards, 12 Event
cards, and 20 Untimely Death cards.

## Setup

- Each player chooses a family and takes its five Character cards.
- Shuffle the Modifier, Event, and Untimely Death cards into one draw pile.
- Each player draws five cards.
- Characters begin alive with no attached Modifiers.

## Turn flow

On a turn, a player may make up to two plays, then draws back to the current
draw limit (normally five cards). A player may discard instead of playing and
may pass either play.

1. First play: any card, discard, or pass.
2. Second play: an Event or Modifier, discard, or pass.
3. Untimely Death cards cannot be played as the second play.

After the turn, play passes to the next player.

## Modifiers and Pathos

Modifiers attach to characters and stack. A character's visible Pathos spaces
determine its current Self-Worth. Immediate effects happen when played;
continuous effects remain active while the Modifier is visible.

## Untimely Death

An Untimely Death may be played as the first play on any living character with
negative Self-Worth. The character and its attached cards are set aside as
dead. If a player's entire family is eliminated, the game ends immediately.

## Prototype scope

The current vertical slice implements the shared deck, hand and discard flow,
two-play turns, attached scoring Modifiers, negative-Self-Worth death gating,
family boards, a rival board, chronicle logging, and the dark table UI.

Card-specific effects and multiplayer networking are intentionally staged for
the next iteration. The card names and base values are transcribed from the
supplied card PDF so those effects can be added without changing the UI model.
