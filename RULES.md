# Gloom — rules baseline

Source of truth: `GloomRules246x255.pdf` and `Gloom_cards.pdf` in this repository.

## Objective

Gloom is a 2–4 player card game. Each player controls a family and wants the
lowest total Family Value. Only the player's own dead characters contribute to
that final score.

The supplied deck contains 20 Character cards, 58 Modifier cards, 12 Event
cards, and 20 Untimely Death cards.

Gloom of Thrones is a separate expansion edition. Its rulebook introduces a
unique Porcelain Throne card, a Monarch state, crown icons, and expansion-only
effect categories. Its source PDF is kept locally for development but is not
committed to the repository.

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

## Gloom of Thrones rules baseline

The Thrones rulebook keeps the core loop: five Characters per family,
five-card hands, two actions, and the lowest dead-family score wins.

- Set aside the Porcelain Throne and reference cards; they are not shuffled.
- Modifiers may be played on any living Character, including an opponent's.
- Character effects belong to the Character's owner, not necessarily the
  player who played the Modifier.
- Effects are immediate, ongoing, persistent, or response effects. Visibility
  follows the stacking rule: covered points, icons, and effects no longer count,
  except persistent effects.
- The Porcelain Throne starts uncontrolled. A newly played crown icon transfers
  it to the Character with the newest crown; that Character becomes the Monarch
  and receives -30 Self-Worth.
- The Monarch's controller may play Untimely Death as a second action, but only
  against an opponent's Character. If the Monarch dies, the Throne returns to
  the center unless that death ends the game; a living Monarch scores its -30
  Throne points at game end but not its other Self-Worth points.
- Free plays do not consume the normal two-action limit. A free Untimely Death
  may be played regardless of whether it came from the first or second action.
- Players may discard their entire hand as a special action, or pass.
- Storytelling is a central social rule: players explain the misery behind each
  action, with no formal scoring for story quality.
