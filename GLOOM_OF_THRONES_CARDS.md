# Gloom of Thrones — card inventory

Use this file to record the expansion cards as they are recovered. Keep the
wording close to the physical card, and add a source note when something is
uncertain.

## Card conventions

- `id`: stable implementation id, for example `thrones_modifier_001`.
- `self-worth`: visible point values, in stack order if relevant.
- `icons`: visible story icons, such as `crown`.
- `effect-category`: `immediate`, `ongoing`, `persistent`, or `response`.
- `effect`: exact rules text, preserving timing and target restrictions.
- `flavor`: italicized story text.
- `source`: PDF page, scan filename, or physical card reference.

## Characters

Record one row per Character. The `self-worth`, `icons`, flavor, and source
fields can be filled in as the card faces are inspected.

### House Snark

| id | name | self-worth | icons | flavor | source |
|---|---|---|---|---|---|
| `thrones_character_snark_sanserif` | Sanserif Snark |  |  |  |  |
| `thrones_character_snark_arial` | Arial Snark |  |  |  |  |
| `thrones_character_snark_josh_frost` | Josh Frost |  |  |  |  |
| `thrones_character_snark_head` | Head Snark |  |  |  |  |
| `thrones_character_snark_gluten` | Gluten Snark |  |  |  |  |

### House Bannister

| id | name | self-worth | icons | flavor | source |
|---|---|---|---|---|---|
| `thrones_character_bannister_ceriously` | Ceriously Bannister |  |  |  |  |
| `thrones_character_bannister_typsion` | Typsion Bannister |  |  |  |  |
| `thrones_character_bannister_toffy` | Toffy Bratsforëöns |  |  |  |  |
| `thrones_character_bannister_shamey` | Shamey Bannister |  |  |  |  |
| `thrones_character_bannister_trywin` | Trywin Bannister |  |  |  |  |

### Kelly's Dragons

| id | name | self-worth | icons | flavor | source |
|---|---|---|---|---|---|
| `thrones_character_dragons_kelly` | Kelly C |  |  |  |  |
| `thrones_character_dragons_karl` | Karl Go-Go |  |  |  |  |
| `thrones_character_dragons_rural` | Rural Jurah |  |  |  |  |
| `thrones_character_dragons_lord_varies` | Lord Varies |  |  |  |  |
| `thrones_character_dragons_dragons` | Dragons |  |  |  |  |

### Brotherhood Without Pants

| id | name | self-worth | icons | flavor | source |
|---|---|---|---|---|---|
| `thrones_character_pants_stink` | Stink |  |  |  |  |
| `thrones_character_pants_sulkwell` | Sulkwell Tubby |  |  |  |  |
| `thrones_character_pants_lil_finger` | Lil Finger |  |  |  |  |
| `thrones_character_pants_berry` | Berry of Tart |  |  |  |  |
| `thrones_character_pants_dave` | Dave Onion |  |  |  |  |

### Kickstarter special

| id | name | self-worth | icons | flavor | source |
|---|---|---|---|---|---|
| `thrones_character_kickstarter_doge` | Doge |  |  |  |  |
| `thrones_character_kickstarter_margarine` | Margarine |  |  |  |  |
| `thrones_character_kickstarter_melodramadre` | Melodramadre |  |  |  |  |
| `thrones_character_kickstarter_hurdur` | Hurdur |  |  |  |  |
| `thrones_character_kickstarter_night_knight` | Night Knight |  |  |  |  |

## Modifiers

| id | name | self-worth | icons | effect-category | effect | flavor | source |
|---|---|---|---|---|---|---|---|
| `thrones_modifier_001` |  |  |  |  |  |  |  |

## Events

| id | name | effect-category | effect | flavor | source |
|---|---|---|---|---|---|
| `thrones_event_001` |  | immediate |  |  |  |

## Untimely Deaths

| id | name | effect-category | effect | flavor | source |
|---|---|---|---|---|---|
| `thrones_death_001` |  | immediate |  |  |  |

## Special cards

### The Porcelain Throne

- `id`: `thrones_porcelain_throne`
- `type`: special persistent card
- `starting-state`: uncontrolled, placed in the center of the table
- `transfer-trigger`: the newest visible `crown` icon
- `monarch-value`: -30 Self-Worth
- `effect`: 
- `source`: 

### Reference cards

Record reference cards here if they contain implementation-relevant wording.

## Unresolved questions

- 
