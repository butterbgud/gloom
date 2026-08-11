import React, { useEffect, useState } from 'react'

const families = {
  castle: { name: 'Castle Slogar', thronesName: 'House Snark', icon: '☿', tone: 'violet', portraits: ['s1.webp', 's2.webp', 's3.webp', 's4.webp', 's5.webp'], chars: ['Lord Slogar', 'Elias E. Gorr', 'Grogar', 'Melissa Slogar', 'Professor Helena Slogar'] },
  hemlock: { name: 'Hemlock Hall', thronesName: 'House Bannister', icon: '♠', tone: 'amber', portraits: ['h1.webp', 'h2.webp', 'h3.webp', 'h4.webp', 'h5.webp'], chars: ['Goody Zarr', 'Lola Wellington-Smythe', 'The Twins', 'Lord Wellington-Smythe', 'Butterfield'] },
  blackwater: { name: 'Blackwater Watch', thronesName: "Kelly's Dragons", icon: '†', tone: 'blue', portraits: ['b1.webp', 'b2.webp', 'b3.webp', 'b4.webp', 'b5.webp'], chars: ['Angel', 'Balthazar', 'The Old Dam', 'Cousin Mordecai', 'Willem Stark'] },
  darks: { name: "Dark's Den of Deformity", thronesName: 'Brotherhood Without Pants', icon: '✣', tone: 'crimson', portraits: ['d1.webp', 'd2.webp', 'd3.webp', 'd4.webp', 'd5.webp'], chars: ['Darius Dark', 'Elissandre DeVille', 'Thumbelisa', "Samson O'Toole", 'Mister Giggles'] },
}

const thronesCharacters = {
  castle: ['Sanserif Snark', 'Ariel Snark', 'Josh Frost', 'Head Snark', 'Gluten Snark'],
  hemlock: ['Ceriously Bannister', 'Typsion Bannister', 'Toffy Bratsforëöns', 'Shamey Bannister', 'Trywin Bannister'],
  blackwater: ['Kelly C', 'Karl Go-Go', 'Rural Jurah', 'Lord Varies', 'Dragons'],
  darks: ['Stink', 'Sulkwell Tubby', 'Lil Finger', 'Berry of Tart', 'Dave Onion'],
}

const thronesModifiers = [
  'had a hand hacked off', 'intruded on incest', 'paid a pretty price', 'meddled with the monarchy', 'was tormented for treachery', 'walked on the wall', 'was served crow by a sovereign', 'beheaded a betrayer', 'fathered a failure', 'learned a lamentable lineage', 'was impugned by an inferior', 'seduced by a sibling', 'soiled themself shamefully', 'was married to a monster', 'received a rude raven', 'was coerced to confess', 'flinched from a fair fight', 'was shamed by a septah', 'was pissed on by the patriarchy', 'bungled in battle', 'was vexed by visions', 'was manipulated by a mayster', 'knew nothing', 'was sentenced to a sky cell', 'committed a castration', 'was warned about winter', 'woke the dragon', 'was unnecessarily undressed', 'was farked by their faults', 'was injured by irony', 'upended an archetype', 'was slowed by the snow', 'was confused by chaos', 'choked on chickens', 'was nicked by a needle', 'wielded wildfire wickedly', 'gorged on guts', 'birthed a beast', 'tumbled from a tower', 'sang about spring', 'turned up at a tournament', 'gabbed gaily in a garden', 'rescued a runt', 'commanded a creature', 'consulted a council', 'was promised a prince', 'was reunited with a relative', 'drank, knew things', 'found a fitting face', 'made pie of their prey', 'collected a coin', 'won a war', 'worked with the wild ones', 'was catastrophically crowned', 'immolated an innocent', 'was lied to by the luminous lord',
].map((title, index) => ({ id: `thrones-modifier-${index}`, type: 'modifier', title, points: [0, 0, 0], icon: 'none', flavor: 'Effect not yet transcribed.' }))

const thronesEvents = ['The Seed Is Strong', 'Bend the Knee', 'Not Today', "Bobby's Rebellion", 'On the Other Hand', 'Three Eyes', 'Bad News on Black Wings', 'It Is Known', "The King's Caravan Cometh", 'A Man Pays His Debts', "Maystery and Book-Larnin'"].map((title, index) => ({ id: `thrones-event-${index}`, type: 'event', title, text: 'Effect not yet transcribed.', pathos: 0 }))
const thronesDeaths = ['went to a wedding', 'flew out the floor', 'was devoured by dogs', 'was next on a list', 'was pierced by a porker', 'was killed for a coin', 'was crowned by the call', 'was finished by the faith', 'stabbed by a shadow', 'got greyscale', 'got their head on a pike', 'was shot on the shitter', 'was poisoned by a page', 'was decimated by a dragon', 'became an eggshell walker', "didn't hold the door", 'sent regards to the queen', 'drank themself to death', 'was jabbed in the jugular', 'played the game; did not win'].map((title, index) => ({ id: `thrones-death-${index}`, type: 'death', title, flavor: 'Effect not yet transcribed.', pathos: 0 }))

const deaths = [
  ['ran out of air', 'The last breath was the quietest.'], ['fell from on high', 'Sometimes you have to take a dive.'], ['died without cares', 'We should all be so lucky.'],
  ['was eaten by bears', 'Bears have to eat too.'], ['was baked into a pie', 'Dead but delicious!'], ['died of despair', 'A person can only take so much heartache.'],
  ['was slain by an heir', "You can't take it with you."], ['was devoured by weasels', 'Dinner is served.'], ['was choked by a tie', 'The things we do for fashion.'],
  ['died old and alone', 'No, fifty cats do not count.'], ['was pushed down the stairs', 'A stairway to Heaven… or Hell.'], ['choked on a bone', 'At least you had a last supper.'],
  ['was torn limb from limb', 'Rest in pieces.'], ['was consumed from within', 'What a way to waste away.'], ['never returned', 'Good riddance.'],
  ['was burnt by a mob', "Fifty people with torches can't be wrong."], ['drank too much rye', 'The remains are already pickled.'], ['drowned in a bog', 'Still waters run deep.'],
  ['was badly burned', 'Fire warms the heart… and other vital organs.'], ['was overcome with measles', 'X marks the spots.'],
]
const deathAssets = {
  'ran out of air': 'death-d1.webp', 'fell from on high': 'death-d7.webp', 'died without cares': 'd20.webp',
  'was eaten by bears': 'death-d6.webp', 'was baked into a pie': 'death-d10.webp', 'died of despair': 'death-d13.webp',
  'was slain by an heir': 'death-d8.webp', 'was devoured by weasels': 'death-d3.webp', 'was choked by a tie': 'd18.webp',
  'died old and alone': 'death-d5.webp', 'was pushed down the stairs': 'death-d11.webp', 'choked on a bone': 'death-d2.webp',
  'was torn limb from limb': 'death-d17.webp', 'was consumed from within': 'death-d4.webp', 'never returned': 'death-d14.webp',
  'was burnt by a mob': 'death-d19.webp', 'drank too much rye': 'd21.webp', 'drowned in a bog': 'death-d15.webp',
  'was badly burned': 'death-d16.webp', 'was overcome with measles': 'death-d12.webp'
}
const deathRules = {
  'fell from on high': { bonusSymbols: ['skull'] }, 'was eaten by bears': { bonusSymbols: ['bat'] },
  'was baked into a pie': { bonusSymbols: ['goblet'] }, 'died of despair': { points: [null, null, -15], discardHand: true },
  'was slain by an heir': { bonusSymbols: ['coin', 'heart'] }, 'was devoured by weasels': { bonusSymbols: ['bat'] },
  'was choked by a tie': { bonusSymbols: ['skull'] }, 'died old and alone': { points: [-15, null, null], cannotOn: 'heart' },
  'was pushed down the stairs': { bonusSymbols: ['coin', 'bat'] }, 'choked on a bone': { bonusSymbols: ['goblet'] },
  'was torn limb from limb': { points: [10, 0, null] }, 'was consumed from within': { bonusSymbols: ['skull'] },
  'never returned': { bonusSymbols: ['bat'] }, 'was overcome with measles': { bonusSymbols: ['skull'] },
  'died without cares': { points: [0, 0, 0], clearsNegative: true }
}
const deathsWithAssets = deaths.map(([title, flavor], index) => ({
  id: `death-${index}`, type: 'death', title, flavor, asset: `/assets/${deathAssets[title]}`,
  ...(deathRules[title] || {}), pathos: 0
}))

const eventAssets = {
  'Body Thief': 'e12.webp', 'A Tragic Misunderstanding': 'event-e8.webp', 'To Be or Not To Be': 'event-e5.webp',
  'A Stormy Night': 'event-e11.webp', 'The Root of All Evil': 'event-e3.webp', 'A Second Chance': 'event-e7.webp',
  'Misfortune Favors the Old': 'event-e10.webp', 'Til Death Do Us Part': 'event-e9.webp', 'Smoke and Mirrors': 'event-e4.webp',
  'Twist of Fate': 'event-e2.webp', 'A Chance to Begin Again': 'e13.webp', 'An Unpleasant Surprise': 'event-e1.webp'
}
const events = [
  ['Body Thief', 'Remove one of your living characters and one dead character from play.'], ['A Tragic Misunderstanding', 'Swap the top modifiers on two living characters.'], ['To Be or Not To Be', 'Move one Untimely Death from a dead character to a living character with negative Self-Worth.'],
  ['A Stormy Night', 'Draw four cards, play one, then discard down to your draw limit.'], ['The Root of All Evil', "Steal a card from each opponent's hand and play what you wish."], ['A Second Chance', 'Cancel an Untimely Death as it is played, or remove one from a character.'],
  ['Misfortune Favors the Old', 'Play two additional negative cards this round.'], ['Til Death Do Us Part', 'Play an Untimely Death on any character with the heart icon.'], ['Smoke and Mirrors', 'Cancel an Event as it is played.'],
  ['Twist of Fate', 'Replace a character’s top Modifier with one from your hand.'], ['A Chance to Begin Again', 'Discard all Modifiers from one living character.'], ['An Unpleasant Surprise', 'Remove the top Modifier from one living character.'],
].map(([title, text], index) => ({ id: `event-${index}`, type: 'event', title, text, asset: eventAssets[title] ? `/assets/${eventAssets[title]}` : null, pathos: 0 }))

// Keep this data aligned with the Modifier table in GLOOM_CARDS.md. `null` is
// transparent (reveals the card below); 0 is a real blank circle that masks it.
const modifierSeed = [
  ['was distressed by dysentery', [-15, -10, null], 'skull', 'm1.webp'],
  ['was disgraced at the dance', [null, -20, null], 'blank', 'm2.webp'],
  ['was married magnificently', [0, null, 15], 'heart', 'm59.webp'],
  ['had a picnic in the park', [10, 5, null], 'none', 'm3.webp'],
  ['was cursed by the queen', [null, -15, -20], 'none', 'm4.webp'],
  ['broke many bones', [-20, null, null], 'none', 'm5.webp'],
  ['went mildly mad', [-10, null, null], 'skull', 'm6.webp'],
  ['was burdened by boils', [null, null, -10], 'skull', 'm7.webp'],
  ['was written out of the will', [null, -20, null], 'coin', 'm17.webp'],
  ['was wondrously well wed', [0, null, 20], 'heart', 'm8.webp'],
  ['was clever at cards', [15, null, null], 'coin', 'm57.webp'],
  ['was perturbed by pudding', [-5, -5, null], 'goblet', 'm9.webp'],
  ['was swindled by a salesman', [null, -10, null], 'coin', 'm10.webp'],
  ['was pierced by porcupines', [-10, -5, null], 'bat', 'm11.webp'],
  ['was diverted by drink', [10, null, null], 'goblet', 'm12.webp'],
  ['found maggots in the meat', [-15, null, null], 'goblet', 'm58.webp'],
  ['was jinxed by gypsies', [-15, -15, null], 'skull', 'm13.webp'],
  ['was taunted by tigers', [-20, -10, null], 'bat', 'm14.webp'],
  ['was marooned on the moors', [-10, null, null], 'bat', 'm16.webp'],
  ['was widowed at the wedding', [null, null, -25], 'none', 'm18.webp'],
  ['was wounded by wasps', [null, -15, null], 'bat', 'm19.webp'],
  ['was galled by gangrene', [-15, null, null], 'skull', 'm20.webp'],
  ['was terrified by topiary', [-20, null, null], 'bat', 'm21.webp'],
  ['grew old without grace', [-20, null, null], 'skull', 'm22.webp'],
  ['was sickened by salmon', [null, -10, null], 'goblet', 'm23.webp'],
  ['was charmed by the circus', [10, null, null], 'bat', 'm24.webp'],
  ['was chased by children', [-10, null, null], 'none', 'm25.webp'],
  ['was pestered by poltergeists', [null, -10, -10], 'skull', 'm26.webp'],
  ['was pursued by poodles', [-15, null, null], 'bat', 'm27.webp'],
  ['was ruined by rum', [-15, null, -10], 'goblet', 'm28.webp'],
  ['was scarred by scandals', [null, -25, null], 'none', 'm29.webp'],
  ['found love on the lake', [0, 15, null], 'heart', 'm30.webp'],
  ['was chastised by the church', [-10, null, -15], 'blank', 'm31.webp'],
  ['was blessed by a Bishop', [0, 20, null], 'heart', 'm32.webp'],
  ['was trapped on a train', [-20, null, null], 'skull', 'm33.webp'],
  ['slept without sorrows', [null, 10, null], 'none', 'm34.webp'],
  ['contracted consumption', [-15, null, -15], 'skull', 'm35.webp'],
  ['was crippled by creditors', [null, -20, null], 'coin', 'm36.webp'],
  ['was the toast of the town', [null, 15, null], 'none', 'm37.webp'],
  ['was greeted by ghosts', [-10, null, -20], 'skull', 'm38.webp'],
  ['landed a legacy', [null, 15, null], 'coin', 'm39.webp'],
  ['was startled by snakes', [-10, -10, null], 'bat', 'm56.webp'],
  ['was beaten by beggars', [-15, null, null], 'none', 'm40.webp'],
  ['found fame at a feast', [0, 10, null], 'goblet', 'm41.webp'],
  ['was driven to drink', [-15, null, null], 'goblet', 'm43.webp'],
  ['was mocked by midgets', [-10, null, null], 'none', 'm44.webp'],
  ['was menaced by mice', [null, -15, null], 'bat', 'm45.webp'],
  ['was delighted by ducklings', [10, 0, null], 'duck', 'm46.webp'],
  ['was plagued by the pox', [-15, -15, null], 'skull', 'm47.webp'],
  ['was hunted by horrors', [null, -20, -20], 'skull', 'm48.webp'],
  ['was mauled by a manatee', [-20, null, null], 'bat', 'm49.webp'],
  ['was put into prison', [-20, null, null], 'none', 'm60.webp'],
  ['starved in a storm', [-10, -10, null], 'goblet', 'm50.webp'],
  ['was popular in parliament', [null, 15, null], 'none', 'm51.webp'],
  ['fell down a well', [-10, null, null], 'none', 'm55.webp'],
  ['suffered from sores', [-15, null, -15], 'skull', 'm52.webp'],
  ['stole from a stiff', [null, null, -15], 'coin', 'm53.webp'],
  ['was shunned by society', [-15, -15, -15], 'none', 'm54.webp'],
]
const modifierAbilities = {
  'was distressed by dysentery': 'previousKeepTwo',
  'was married magnificently': 'drawLimitUp', 'found love on the lake': 'drawLimitUp',
  'was cursed by the queen': 'discardHand', 'was written out of the will': 'skipDraw', 'was swindled by a salesman': 'skipDraw',
  'went mildly mad': 'discardOnModifier', 'was taunted by tigers': 'skipDraw', 'was marooned on the moors': 'freeDeath',
  'was widowed at the wedding': 'heartOnly',
  'was wondrously well wed': 'drawTwo', 'was clever at cards': 'drawOne',
  'was diverted by drink': 'discardOne', 'found maggots in the meat': 'discardOne',
  'was jinxed by gypsies': 'drawLimitDown', 'grew old without grace': 'previousDiscardTwo',
  'was sickened by salmon': 'discardOnModifier', 'was blessed by a Bishop': 'refillHand',
  'was crippled by creditors': 'previousKeepTwo', 'was pestered by poltergeists': 'previousDiscardOne',
  'was scarred by scandals': 'discardHand', 'landed a legacy': 'drawTwo', 'was greeted by ghosts': 'discardThree',
  'was the toast of the town': 'drawLimitUp', 'was popular in parliament': 'drawTwo',
  'contracted consumption': 'drawLimitDown', 'was plagued by the pox': 'drawLimitDown', 'suffered from sores': 'drawLimitDown',
  'was hunted by horrors': 'skipTurn', 'was shunned by society': 'skipTurn', 'was driven to drink': 'discardOne',
  'was put into prison': 'blockEvents', 'fell down a well': 'freeDeath',
}
const modifiers = modifierSeed.map(([title, points, icon, asset], index) => ({
  id: `modifier-${index}`, type: 'modifier', title, points, icon, asset: `/assets/${asset}`, ability: modifierAbilities[title] || null, flavor: 'A fresh misfortune takes root.'
}))

const allCards = [...modifiers, ...events, ...deathsWithAssets]
const cardsForMode = (mode) => mode === 'thrones' ? [...thronesModifiers, ...thronesEvents, ...thronesDeaths] : allCards
const isPointNullifyingDeath = (card) => card.type === 'death' && card.title === 'died without cares'
const visibleIcon = (character) => character.modifiers.reduce((icon, card) => {
  if (card.icon === 'blank') return null
  return card.icon && card.icon !== 'none' ? card.icon : icon
}, null)
const canPlayDeathOn = (character, death = null, heartOverride = false) => Boolean(character?.alive && ((heartOverride && visibleIcon(character) === 'heart') || sumPoints(visiblePoints(character)) < 0) && (!death?.cannotOn || visibleIcon(character) !== death.cannotOn))
const deathBonus = (character, death = [...character.modifiers].reverse().find((card) => card.type === 'death')) => death?.bonusSymbols?.includes(visibleIcon(character)) ? -10 : 0
const BUILD_VERSION = typeof __BUILD_VERSION__ !== 'undefined' ? __BUILD_VERSION__ : 'dev'
const victoryLines = [
  'A most unfortunate victory.',
  'The séance is yours; everyone else suffered more.',
  'A triumph of exquisite misfortune.',
  'You won. Your family can now mourn in peace.',
  'The last family standing inherits the misery.',
  'Against all odds, you were the worst at dying.',
  'Your rivals are gone, and your dignity remains questionable.',
  'Fortune smiled. Briefly. Suspiciously.',
]
const comebackDefeatLine = 'Snatched the defeat from the jaws of victory!'
const living = (name, family, index, portrait = null) => ({ id: `${family}-${index}`, name, family, portrait, alive: true, modifiers: [], pathos: 0 })

function shuffleDeck(cards) {
  const deck = [...cards]
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[deck[index], deck[swap]] = [deck[swap], deck[index]]
  }
  return deck
}

function seededDeck(mode = 'original') {
  return shuffleDeck(cardsForMode(mode))
}

function makeGame(playerFamily = 'castle', mode = 'original', botCount = 1) {
  const rivalFamilies = Object.keys(families).filter((key) => key !== playerFamily).slice(0, botCount)
  const characterSets = mode === 'thrones' ? thronesCharacters : Object.fromEntries(Object.entries(families).map(([key, family]) => [key, family.chars]))
  const playerChars = characterSets[playerFamily].map((name, i) => living(name, playerFamily, i, mode === 'original' ? families[playerFamily].portraits?.[i] : null))
  const deck = seededDeck(mode)
  const botNames = ['Lady Mourning', 'The Pale Cousin', 'Baron Nocturne']
  const bots = rivalFamilies.map((family, index) => ({ id: `bot-${index + 1}`, name: botNames[index], family, chars: characterSets[family].map((name, i) => living(name, family, i, mode === 'original' ? families[family].portraits?.[i] : null)) }))
  const players = [{ id: 'player', name: 'You', family: playerFamily, chars: playerChars }, ...bots]
  const handStart = 5
  const botHandStart = handStart
  const deckStart = botHandStart + botCount * 5
  return {
    turn: 1, active: 'player', plays: 0, playLimit: 2, heartDeathOverride: false, skipDraw: {}, skipTurn: {}, selectedCard: null, targeting: false, target: null, mode, botCount, deck: deck.slice(deckStart), discard: [],
    hand: deck.slice(0, handStart), botHands: Object.fromEntries(bots.map((bot, index) => [bot.id, deck.slice(botHandStart + index * 5, botHandStart + (index + 1) * 5)])), log: ['The table is set. Five families wait beneath the black sky.', `Your family: ${mode === 'thrones' ? families[playerFamily].thronesName : families[playerFamily].name}. ${bots.length} rival${bots.length === 1 ? '' : 's'} wait in the dark.`],
    players, gameOver: false, winnerId: null, pendingEvent: null,
    history: [{ turn: 1, values: Object.fromEntries(players.map((player) => [player.id, familyValue(player)])) }],
  }
}

function visiblePoints(character) {
  return character.modifiers.reduce((visible, card) => {
    if (!card.points) return visible
    return visible.map((point, index) => card.points[index] === null ? point : card.points[index])
  }, [0, 0, 0])
}

const sumPoints = (points) => points.reduce((total, point) => total + (point ?? 0), 0)

function score(character) {
  const death = [...character.modifiers].reverse().find((card) => card.type === 'death')
  if (death) {
    if (death.clearsNegative) return 0
    return sumPoints(visiblePoints(character)) + deathBonus(character, death)
  }
  return sumPoints(visiblePoints(character))
}

function familyValue(player) {
  return player.chars.filter((character) => !character.alive).reduce((total, character) => {
    const death = [...character.modifiers].reverse().find((card) => card.type === 'death')
    if (death?.clearsNegative) return total
    return total + sumPoints(visiblePoints(character)) + deathBonus(character, death)
  }, 0)
}

function applyEventEffect(state, card, actorId, eventTarget = null) {
  const actor = state.players.find((player) => player.id === actorId)
  if (!actor) return state
  const livingChars = (player) => player.chars.filter((character) => character.alive)
  const deadChars = (player) => player.chars.filter((character) => !character.alive)
  const firstModifier = (character) => [...character.modifiers].reverse().find((modifier) => modifier.type === 'modifier')
  const removeModifier = (character, modifier) => { const index = character.modifiers.findIndex((candidate) => candidate.id === modifier.id); if (index >= 0) character.modifiers.splice(index, 1) }
  const hand = actorId === 'player' ? state.hand : state.botHands[actorId]
  const putInHand = (cards) => { if (actorId === 'player') state.hand.push(...cards); else state.botHands[actorId].push(...cards) }
  const removeFromHand = (card) => { const index = hand.findIndex((candidate) => candidate.id === card.id); if (index >= 0) hand.splice(index, 1) }

  switch (card.title) {
    case 'Body Thief': {
      const living = livingChars(actor); const dead = deadChars(actor)
      if (living.length && dead.length) { actor.chars.splice(actor.chars.indexOf(living[0]), 1); actor.chars.splice(actor.chars.indexOf(dead[0]), 1) }
      break
    }
    case 'A Tragic Misunderstanding': {
      const targets = livingChars(actor).filter((character) => firstModifier(character))
      if (targets.length >= 2) { const a = firstModifier(targets[0]); const b = firstModifier(targets[1]); removeModifier(targets[0], a); removeModifier(targets[1], b); targets[0].modifiers.push(b); targets[1].modifiers.push(a) }
      break
    }
    case 'To Be or Not To Be': {
      const source = deadChars(actor).find((character) => character.modifiers.some((modifier) => modifier.type === 'death'))
      const target = livingChars(actor).find((character) => score(character) < 0)
      const death = source && [...source.modifiers].reverse().find((modifier) => modifier.type === 'death')
      if (source && target && death) { removeModifier(source, death); target.modifiers.push(death) }
      break
    }
    case 'A Stormy Night': {
      const drawn = []
      while (drawn.length < 4 && state.deck.length) drawn.push(state.deck.shift())
      putInHand(drawn)
      const playable = hand.find((candidate) => candidate.type === 'modifier' && livingChars(actor).length)
      if (playable) { const target = [...livingChars(actor)].sort((a, b) => score(a) - score(b))[0]; target.modifiers.push(playable); removeFromHand(playable); state.discard.push(playable) }
      while (hand.length > 5) state.discard.push(hand.pop())
      break
    }
    case 'The Root of All Evil': {
      state.players.filter((player) => player.id !== actorId && player.id.startsWith('bot-')).forEach((opponent) => { const opponentHand = state.botHands[opponent.id]; if (opponentHand?.length) putInHand(opponentHand.shift()) })
      break
    }
    case 'A Second Chance': {
      const target = eventTarget || deadChars(actor).find((character) => character.modifiers.some((modifier) => modifier.type === 'death'))
      const death = target && [...target.modifiers].reverse().find((modifier) => modifier.type === 'death')
      if (target && death) { removeModifier(target, death); target.alive = true }
      break
    }
    case 'Misfortune Favors the Old':
      state.playLimit = (state.playLimit || 2) + 2
      break
    case 'Til Death Do Us Part':
      state.heartDeathOverride = true
      break
    case 'Twist of Fate': {
      const replacement = hand.find((candidate) => candidate.type === 'modifier')
      const target = livingChars(actor).find((character) => firstModifier(character))
      const old = target && firstModifier(target)
      if (replacement && target && old) { removeModifier(target, old); removeFromHand(replacement); target.modifiers.push(replacement); state.discard.push(old) }
      break
    }
    case 'A Chance to Begin Again': {
      const target = livingChars(actor)[0]
      if (target) { state.discard.push(...target.modifiers); target.modifiers = [] }
      break
    }
    case 'An Unpleasant Surprise': {
      const target = eventTarget || livingChars(actor)[0]
      const modifier = target && firstModifier(target)
      if (target && modifier) { removeModifier(target, modifier); state.discard.push(modifier) }
      break
    }
    default: break
  }
  return state
}

function modifierDrawLimit(state, playerId) {
  const player = state.players.find((candidate) => candidate.id === playerId)
  return Math.max(0, 5 + (player?.chars || []).reduce((total, character) => total + character.modifiers.reduce((value, modifier) => value + (modifier.ability === 'drawLimitUp' ? 1 : modifier.ability === 'drawLimitDown' ? -1 : 0), 0), 0))
}

function applyModifierAbility(state, modifier, actorId, targetCharacter = null) {
  const hand = actorId === 'player' ? state.hand : state.botHands[actorId]
  if (!hand || !modifier.ability) return state
  const removeFromHand = (card) => { const index = hand.findIndex((candidate) => candidate.id === card.id); if (index >= 0) hand.splice(index, 1) }
  const discardOne = () => { if (hand.length) state.discard.push(hand.shift()) }
  const draw = (count) => { while (count > 0 && state.deck.length) { hand.push(state.deck.shift()); count -= 1 } }
  const previousPlayer = state.players[(state.players.findIndex((player) => player.id === actorId) - 1 + state.players.length) % state.players.length]
  const previousHand = previousPlayer?.id === 'player' ? state.hand : state.botHands[previousPlayer?.id]
  const giveToPrevious = (count) => { const taken = hand.splice(0, Math.min(count, hand.length)); if (previousHand) previousHand.push(...taken) }
  switch (modifier.ability) {
    case 'discardHand': state.discard.push(...hand.splice(0)); state.endTurnAfterAbility = true; break
    case 'skipDraw': state.skipDraw = { ...state.skipDraw, [actorId]: true }; state.log.unshift(`${actorId === 'player' ? 'Your family' : 'The rival'} will skip its next draw phase.`); break
    case 'skipTurn': state.skipTurn[actorId] = true; break
    case 'heartOnly': modifier.cannotOn = 'heart'; break
    case 'drawTwo': draw(2); break
    case 'drawOne': draw(1); break
    case 'discardOne': discardOne(); break
    case 'refillHand': while (hand.length < modifierDrawLimit(state, actorId) && state.deck.length) hand.push(state.deck.shift()); break
    case 'previousKeepTwo': giveToPrevious(2); break
    case 'previousDiscardTwo': discardOne(); discardOne(); break
    case 'previousDiscardOne': discardOne(); break
    case 'discardThree': discardOne(); discardOne(); discardOne(); break
    case 'freeDeath': {
      const death = hand.find((candidate) => candidate.type === 'death')
      if (death && targetCharacter && canPlayDeathOn(targetCharacter, death)) {
        removeFromHand(death); targetCharacter.alive = false; targetCharacter.modifiers.push(death); state.discard.push(death)
        if (death.discardHand) { state.discard.push(...hand.splice(0)); state.endTurnAfterAbility = true }
      }
      break
    }
    case 'blockEvents': break
    case 'discardOnModifier': discardOne(); break
    default: break
  }
  return state
}

function finalizeGame(state) {
  const values = Object.fromEntries(state.players.map((player) => [player.id, familyValue(player)]))
  const history = [...(state.history || [])]
  const last = history[history.length - 1]
  if (last?.turn === state.turn) history[history.length - 1] = { turn: state.turn, values }
  else history.push({ turn: state.turn, values })
  const eliminated = state.players.some((player) => player.chars.every((character) => !character.alive))
  if (!eliminated || state.gameOver) return { ...state, history }
  // Family Value decides the winner, including eliminated families: -100 beats -70.
  const winner = [...state.players].sort((a, b) => familyValue(a) - familyValue(b))[0]
  const playerWasAhead = winner.id !== 'player' && history.some((entry) => entry.values.player !== undefined && entry.values[winner.id] !== undefined && entry.values.player < entry.values[winner.id])
  return { ...state, history, gameOver: true, winnerId: winner.id, victoryLine: playerWasAhead ? comebackDefeatLine : victoryLines[Math.floor(Math.random() * victoryLines.length)], active: '', selectedCard: null, targeting: false, target: null, log: [`${winner.name} wins the séance with Family Value ${familyValue(winner)}.`, ...state.log] }
}

function App() {
  const [game, setGame] = useState(makeGame)
  const [screen, setScreen] = useState('lobby')
  const [chosenFamily, setChosenFamily] = useState('castle')
  const [language, setLanguage] = useState('en')
  const [mode, setMode] = useState('original')
  const [botCount, setBotCount] = useState(1)
  const [bugReportStatus, setBugReportStatus] = useState('')
  useEffect(() => {
    if (game.gameOver || game.pendingEvent || !game.active.startsWith('bot-') || screen === 'lobby') return undefined
    const timer = setTimeout(runBotTurn, 650)
    return () => clearTimeout(timer)
  }, [game.active, game.turn, game.pendingEvent, screen])
  useEffect(() => {
    if (screen === 'lobby' || game.gameOver || game.pendingEvent || game.active !== 'player' || !game.skipTurn?.player) return undefined
    const timer = setTimeout(() => setGame((g) => {
      const next = structuredClone(g)
      next.skipTurn.player = false
      next.turn += 1
      next.active = 'bot-1'
      next.log.unshift('Your family loses its next turn to a dreadful modifier.')
      return finalizeGame(drawBotToLimit(drawToLimit(next)))
    }), 350)
    return () => clearTimeout(timer)
  }, [game.active, game.turn, game.pendingEvent, game.skipTurn, screen])
  useEffect(() => {
    if (!game.pendingEvent || game.gameOver) return undefined
    const timer = setTimeout(resolvePendingEvent, 5000)
    return () => clearTimeout(timer)
  }, [game.pendingEvent, game.gameOver])
  useEffect(() => {
    if (screen === 'lobby' || game.gameOver || !game.players.some((player) => player.chars.every((character) => !character.alive))) return
    setGame((current) => finalizeGame(current))
  }, [game, screen])
  const [showRules, setShowRules] = useState(false)
  const [showChronicle, setShowChronicle] = useState(false)
  if (screen === 'lobby') return <Lobby language={language} onLanguage={setLanguage} mode={mode} onMode={setMode} chosenFamily={chosenFamily} onChooseFamily={setChosenFamily} botCount={botCount} onBotCount={setBotCount} onStart={() => { setGame(makeGame(chosenFamily, mode, botCount)); setScreen('table') }} />
  if (game.gameOver) return <GameOver game={game} onRestart={() => { setGame(makeGame(chosenFamily, mode, botCount)); setScreen('table') }} />
  const activePlayer = game.players.find((p) => p.id === game.active)
  const selected = game.hand.find((card) => card.id === game.selectedCard)
  const handLimit = modifierDrawLimit(game, 'player')
  const familyScore = (player) => player.chars.filter((c) => !c.alive).reduce((sum, c) => sum + score(c), 0)
  const playable = selected && (selected.type === 'event' || selected.type === 'death' || selected.type === 'modifier')
  const deathBlocked = selected?.type === 'death' && game.plays > 0

  const setSelection = (card) => {
    setGame((g) => ({ ...g, selectedCard: g.selectedCard === card.id ? null : card.id, targeting: false, target: null }))
  }
  const canTargetCharacter = (character) => Boolean(game.targeting && selected && game.active === 'player' && ((selected.type === 'event' && selected.title === 'An Unpleasant Surprise' && character.alive) || (selected.type === 'event' && selected.title === 'A Second Chance' && !character.alive && character.modifiers.some((card) => card.type === 'death')) || (selected.type !== 'event' && character.alive && (selected.type !== 'death' || canPlayDeathOn(character, selected, game.heartDeathOverride)) && (selected.type !== 'modifier' || selected.ability !== 'heartOnly' || visibleIcon(character) === 'heart'))))
  const chooseTarget = (playerId, charId) => {
    const character = game.players.find((player) => player.id === playerId)?.chars.find((candidate) => candidate.id === charId)
    if (!character || !canTargetCharacter(character)) return
    const target = { playerId, charId }
    playSelected(target)
  }

  const drawToLimit = (state) => {
    const next = { ...state, hand: [...state.hand], deck: [...state.deck], discard: [...state.discard] }
    if (next.skipDraw?.player) { next.skipDraw = { ...next.skipDraw, player: false }; next.log.unshift('Your family skipped its draw phase.'); return next }
    while (next.hand.length < modifierDrawLimit(next, 'player') && next.deck.length) next.hand.push(next.deck.shift())
    return next
  }

  const drawBotToLimit = (state) => {
    const next = { ...state, botHands: Object.fromEntries(Object.entries(state.botHands).map(([id, hand]) => [id, [...hand]])), deck: [...state.deck] }
    Object.entries(next.botHands).forEach(([id, hand]) => {
      if (next.skipDraw?.[id]) { next.skipDraw[id] = false; next.log.unshift(`${next.players.find((player) => player.id === id)?.name || 'A rival'} skipped its draw phase.`); return }
      while (hand.length < modifierDrawLimit(next, id) && next.deck.length) hand.push(next.deck.shift())
    })
    return next
  }

  const runBotTurn = () => {
    setGame((g) => {
      const next = structuredClone(g)
      const rival = next.players.find((p) => p.id === next.active)
      const opponent = next.players.find((p) => p.id === 'player')
      let botHand = next.botHands[rival.id]

      if (next.skipTurn?.[rival.id]) {
        next.skipTurn[rival.id] = false
        next.plays = 0
        const botIndex = next.players.findIndex((player) => player.id === rival.id)
        const nextBot = next.players.slice(botIndex + 1).find((player) => player.id.startsWith('bot-'))
        if (nextBot) next.active = nextBot.id
        else { next.turn += 1; next.active = 'player' }
        return finalizeGame(drawBotToLimit(drawToLimit(next)))
      }

      const removeCard = (card) => {
        botHand = botHand.filter((candidate) => candidate.id !== card.id)
        next.discard.push(card)
      }
      const livingChars = (player) => player.chars.filter((character) => character.alive)
      const weakest = (characters) => [...characters].sort((a, b) => score(a) - score(b))[0]
      const negativeTarget = (characters) => [...characters].sort((a, b) => a.modifiers.length - b.modifiers.length || score(a) - score(b))[0]
      const pointLeaderFor = (card) => [...livingChars(opponent)].sort((a, b) => {
        const value = (character) => card.points.reduce((total, point, index) => total + (point > 0 ? visiblePoints(character)[index] : 0), 0)
        return value(b) - value(a) || score(b) - score(a)
      })[0]
      const guaranteesOwnWin = (death) => livingChars(rival).some((character) => {
        const simulation = structuredClone(next)
        const simulatedBot = simulation.players.find((player) => player.id === rival.id)
        const target = simulatedBot.chars.find((candidate) => candidate.id === character.id)
        target.alive = false
        target.modifiers.push(death)
        return simulatedBot.chars.every((candidate) => !candidate.alive) && simulation.players.every((player) => player.id === rival.id || familyValue(simulatedBot) < familyValue(player))
      })

      for (let action = 0; action < 2 && botHand.length; action += 1) {
        const deathCards = botHand.filter((card) => card.type === 'death')
        // Untimely Deaths are first-action plays. Bots should use them on their
        // own most negative eligible character before discarding excess Deaths.
        const ownDeath = action === 0 && deathCards.find((card) => (!isPointNullifyingDeath(card) || guaranteesOwnWin(card)) && livingChars(rival).some((character) => canPlayDeathOn(character, card)))
        const opponentDeath = action === 0 && !ownDeath && deathCards.find((card) => isPointNullifyingDeath(card) && livingChars(opponent).some((character) => canPlayDeathOn(character, card)))
        const death = ownDeath || opponentDeath
        if (death) {
          const eligible = livingChars(ownDeath ? rival : opponent).filter((character) => canPlayDeathOn(character, death))
          const target = weakest(eligible)
          target.alive = false
          target.modifiers.push(death)
          removeCard(death)
          if (death.discardHand) {
            next.discard.push(...botHand)
            botHand = []
          }
          next.log.unshift(`${rival.name} sealed ${target.name}'s fate: “${death.title}”. The character is dead.`)
          continue
        }

        if (deathCards.length > 1) {
          const excessDeath = deathCards.find((card) => !isPointNullifyingDeath(card)) || deathCards[1]
          removeCard(excessDeath)
          next.log.unshift(`${rival.name} discarded an excess Untimely Death.`)
          continue
        }

        const negativeModifier = botHand.find((card) => card.type === 'modifier' && card.points.some((point) => point < 0))
        const modifier = negativeModifier || botHand.find((card) => card.type === 'modifier' && sumPoints(card.points) !== 0)
        if (modifier) {
          const eligible = livingChars(rival).filter((character) => modifier.ability !== 'heartOnly' || visibleIcon(character) === 'heart')
          const target = modifier.points.some((point) => point < 0) ? negativeTarget(eligible) : pointLeaderFor(modifier)
          if (target) {
            target.modifiers.push(modifier)
            removeCard(modifier)
            next.botHands[rival.id] = botHand
            applyModifierAbility(next, modifier, rival.id, target)
            botHand = next.botHands[rival.id]
            if (modifier.ability !== 'discardOnModifier' && rival.chars.some((character) => character.modifiers.some((card) => card.ability === 'discardOnModifier')) && botHand.length) next.discard.push(botHand.shift())
            next.log.unshift(`${rival.name} played “${modifier.title}” on ${target.name}.`)
            continue
          }
        }

        const eventBlocked = rival.chars.some((character) => character.modifiers.some((card) => card.ability === 'blockEvents'))
        const event = eventBlocked ? null : botHand.find((card) => card.type === 'event')
        if (event) {
          removeCard(event)
          next.pendingEvent = { card: event, actorId: rival.id }
          next.log.unshift(`${rival.name} played Event “${event.title}”. It hangs over the table.`)
          break
        }

        // Keep a single Death in hand until it becomes playable; discard other
        // cards first instead of treating every unplayable Death as junk.
        next.log.unshift(`${rival.name} passed. The rival made a quiet, regrettable choice.`)
        break
      }

      next.botHands[rival.id] = botHand
      if (next.pendingEvent) return next
      next.plays = 0
      next.playLimit = 2
      next.heartDeathOverride = false
      const botIndex = next.players.findIndex((player) => player.id === rival.id)
      const nextBot = next.players.slice(botIndex + 1).find((player) => player.id.startsWith('bot-'))
      if (nextBot) {
        next.active = nextBot.id
        next.log.unshift(`${nextBot.name} inherits the sorrow.`)
      } else {
        next.turn += 1
        next.active = 'player'
        next.log.unshift(`Turn ${next.turn}: Your family inherits the sorrow.`)
      }
      return finalizeGame(drawBotToLimit(drawToLimit(next)))
    })
  }

  const playSelected = (targetOverride = null) => {
    if (!selected || !playable || deathBlocked) return
    const chosenTarget = targetOverride || game.target
    const eventNeedsTarget = selected.type === 'event' && ['An Unpleasant Surprise', 'A Second Chance'].includes(selected.title)
    if ((selected.type !== 'event' || eventNeedsTarget) && !chosenTarget) {
      setGame((g) => ({ ...g, targeting: true }))
      return
    }
    setGame((g) => {
      const next = structuredClone(g)
      const targetRef = targetOverride || next.target
      const target = targetRef ? next.players.find((p) => p.id === targetRef.playerId)?.chars.find((c) => c.id === targetRef.charId) : null
      const actor = next.players.find((p) => p.id === next.active)
      if (selected.type === 'modifier' && (!target || !target.alive || (selected.ability === 'heartOnly' && visibleIcon(target) !== 'heart'))) return g
      if (selected.type === 'event' && actor.chars.some((character) => character.modifiers.some((card) => card.ability === 'blockEvents'))) return g
      if (eventNeedsTarget && (!target || (selected.title === 'An Unpleasant Surprise' && !target.alive) || (selected.title === 'A Second Chance' && target.alive))) return g
      if (selected.type === 'death' && !canPlayDeathOn(target, selected, next.heartDeathOverride)) return g
      next.hand = next.hand.filter((card) => card.id !== selected.id)
      if (selected.type === 'modifier') {
        target.modifiers.push(selected)
        applyModifierAbility(next, selected, actor.id, target)
        if (selected.ability !== 'discardOnModifier' && actor.chars.some((character) => character.modifiers.some((card) => card.ability === 'discardOnModifier')) && next.hand.length) next.discard.push(next.hand.shift())
        next.log.unshift(`${actor.name} played “${selected.title}” on ${target.name}. Self-Worth: ${score(target) > 0 ? '+' : ''}${score(target)}.`)
      } else if (selected.type === 'death') {
        target.alive = false
        target.modifiers.push(selected)
        next.log.unshift(`${actor.name} sealed ${target.name}'s fate: “${selected.title}”. The character is dead.`)
      } else {
        applyEventEffect(next, selected, actor.id, target)
        next.log.unshift(`${actor.name} played Event “${selected.title}”. ${selected.text}`)
      }
      next.discard.push(selected)
      if (selected.type === 'modifier' && next.endTurnAfterAbility) {
        next.endTurnAfterAbility = false
        next.plays = 0
        next.playLimit = 2
        next.heartDeathOverride = false
        next.active = 'bot-1'
        next.log.unshift(`${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
        next.selectedCard = null; next.targeting = false; next.target = null
        return finalizeGame(drawToLimit(next))
      }
      if (selected.type === 'death' && selected.discardHand) {
        next.discard.push(...next.hand)
        next.hand = []
        next.plays = 0
        if (next.active === 'player') {
          next.active = 'bot-1'
          next.log.unshift(`${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
        } else {
          next.active = 'player'
          next.turn += 1
          next.log.unshift(`Turn ${next.turn}: Your family inherits the sorrow.`)
        }
        return finalizeGame(drawToLimit(next))
      }
      next.plays += 1
      next.selectedCard = null; next.targeting = false; next.target = null
      if (next.plays >= (next.playLimit || 2)) {
        next.plays = 0
        next.playLimit = 2
        next.heartDeathOverride = false
        if (next.active === 'player') {
          next.active = 'bot-1'
          next.log.unshift(`${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
        } else {
          next.active = 'player'
          next.turn += 1
          next.log.unshift(`Turn ${next.turn}: Your family inherits the sorrow.`)
        }
        return finalizeGame(drawToLimit(next))
      }
      return finalizeGame(next)
    })
  }

  const discardSelected = () => {
    if (!selected) return
    setGame((g) => {
      const next = structuredClone(g)
      next.hand = next.hand.filter((card) => card.id !== selected.id)
      next.discard.push(selected)
      next.log.unshift(`${next.players.find((p) => p.id === next.active).name} discarded “${selected.title}”. Even the deck looked away.`)
      next.selectedCard = null; next.targeting = false; next.target = null; next.plays += 1
      if (next.plays >= 2) {
        next.plays = 0
        next.playLimit = 2
        next.heartDeathOverride = false
        next.active = 'bot-1'
        next.log.unshift(`${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
        return finalizeGame(drawToLimit(next))
      }
      return finalizeGame(next)
    })
  }

  const resolvePendingEvent = () => {
    setGame((g) => {
      if (!g.pendingEvent) return g
      const next = structuredClone(g)
      const { card, actorId } = next.pendingEvent
      next.pendingEvent = null
      applyEventEffect(next, card, actorId)
      next.plays = 0
      next.playLimit = 2
      next.heartDeathOverride = false
      next.active = 'player'
      next.turn += 1
      next.log.unshift(`Event “${card.title}” resolves for ${next.players.find((p) => p.id === actorId)?.name || 'the table'}.`)
      next.log.unshift(`Turn ${next.turn}: Your family inherits the sorrow.`)
      return finalizeGame(drawToLimit(next))
    })
  }

  const cancelPendingEvent = () => {
    setGame((g) => {
      const cancelCard = g.hand.find((card) => card.type === 'event' && card.title === 'Smoke and Mirrors')
      if (!g.pendingEvent || !cancelCard) return g
      const next = structuredClone(g)
      next.hand = next.hand.filter((card) => card.id !== cancelCard.id)
      next.discard.push(next.pendingEvent.card, cancelCard)
      next.log.unshift(`You canceled Event “${next.pendingEvent.card.title}” with “${cancelCard.title}”.`)
      next.pendingEvent = null
      next.plays = 0
      next.playLimit = 2
      next.heartDeathOverride = false
      next.active = 'player'
      next.turn += 1
      next.log.unshift(`Turn ${next.turn}: Your family inherits the sorrow.`)
      return finalizeGame(drawToLimit(next))
    })
  }

  const passTurn = () => {
    if (game.active !== 'player' || game.targeting) return
    setGame((g) => {
      const next = structuredClone(g)
      next.plays = 0
      next.playLimit = 2
      next.heartDeathOverride = false
      next.selectedCard = null; next.targeting = false; next.target = null
      next.active = 'bot-1'
      next.log.unshift(`${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
      return finalizeGame(drawToLimit(next))
    })
  }

  const reset = () => { setGame(makeGame(chosenFamily, mode, botCount)); setScreen('lobby') }
  const reportBug = async () => {
    const description = window.prompt('What went wrong?')
    if (!description?.trim()) return
    const report = `[GLOOM BUG REPORT]\nGame: Gloom original prototype\nTurn: ${game.turn}\nActive: ${activePlayer.name}\nDescription: ${description.trim()}`
    try { await navigator.clipboard?.writeText(report) } catch {}
    setBugReportStatus('Gloom bug report copied')
    window.setTimeout(() => setBugReportStatus(''), 3500)
  }
  const targetHint = deathBlocked ? 'Untimely Deaths must be your first action.' : !game.targeting ? 'Select Play, then choose an eligible character.' : selected?.title === 'An Unpleasant Surprise' ? 'Choose a living character to lose its top Modifier.' : selected?.title === 'A Second Chance' ? 'Choose a dead character to resurrect.' : selected?.type === 'death' ? 'Choose any living character.' : selected?.type === 'modifier' ? 'Choose any living character.' : 'Events resolve immediately.'

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark">✠</span><div className="header-turn"><span>TURN</span><strong>{game.turn}</strong><small>{activePlayer.name}</small></div><div className="header-plays"><span>PLAYS</span><strong>{Math.max(0, (game.playLimit || 2) - game.plays)}</strong></div><div className="header-deck"><span>DECK</span><strong>{game.deck.length}</strong></div><div className="header-tools"><button className="header-tool" onClick={() => setShowChronicle((value) => !value)} aria-label="Chronicle">H</button><button className="header-tool" onClick={() => setShowRules(true)} aria-label="Quick rules">?</button></div></div>
      <div className="top-actions">{bugReportStatus && <span className="bug-report-status">{bugReportStatus}</span>}<button className="ghost-button bug-button" onClick={reportBug} aria-label="Report bug">B</button></div>
    </header>
    {game.pendingEvent && <div className="event-announcement" role="dialog" aria-live="assertive"><span className="eyebrow">Untimely Event</span><HandCard card={game.pendingEvent.card} selected /><strong>{game.pendingEvent.card.title}</strong><small>{game.pendingEvent.card.text}</small>{game.hand.some((card) => card.type === 'event' && card.title === 'Smoke and Mirrors') && <button className="primary-button" onClick={cancelPendingEvent}>Cancel with Smoke and Mirrors</button>}<small className="event-countdown">The event resolves in five seconds.</small></div>}
    <main className="layout">
      <section className="game-column">
        <div className="families-grid">
          {game.players.map((player) => <FamilyBoard key={player.id} player={player} mode={game.mode} active={player.id === game.active} target={game.target} onTarget={chooseTarget} targetable={canTargetCharacter} hideDead={game.targeting && selected?.type !== 'event'} />)}
        </div>
        <div className="hand-panel">
          <div className="section-heading"><span className="eyebrow">Your hand · {game.hand.length} / {handLimit}</span><button className="ghost-button" disabled={game.active !== 'player' || game.targeting} onClick={passTurn}>Pass</button></div>
          <div className="hand-fan-scroll"><div className="hand-fan" style={{ width: `${game.hand.length ? (typeof window !== 'undefined' && window.innerWidth <= 700 ? 96 : 124) + (game.hand.length <= 1 ? 0 : (typeof window !== 'undefined' && window.innerWidth <= 700 ? 43 : 72)) * (game.hand.length - 1) : 0}px` }}>{game.hand.map((card, index) => { const compactHand = typeof window !== 'undefined' && window.innerWidth <= 700; const step = game.hand.length <= 1 ? 0 : compactHand ? 43 : 72; const rotation = game.hand.length <= 1 ? 0 : (index / (game.hand.length - 1) - .5) * 18; const selected = game.selectedCard === card.id; return <div className={`hand-fan-card ${selected ? 'selected' : ''}`} key={card.id} style={{ left: `${index * step}px`, zIndex: selected ? 100 : index, transform: `rotate(${rotation}deg) translateY(${selected ? -10 : 0}px) scale(${selected ? 1.04 : 1})` }}><HandCard card={card} selected={selected} onClick={() => setSelection(card)} /></div> })}</div></div>
          {selected && <div className="card-play-stage">{!game.targeting && <div className="card-play-preview"><HandCard card={selected} selected onClick={() => setSelection(selected)} /></div>}<span className="target-hint">{targetHint}</span>{!game.targeting && <div className="card-play-actions"><button className="primary-button" disabled={!playable || deathBlocked} onClick={(event) => { event.stopPropagation(); playSelected() }}>Play</button><button className="ghost-button" onClick={(event) => { event.stopPropagation(); discardSelected() }}>Discard</button></div>}</div>}
        </div>
      </section>
    </main>
    {showRules && <div className="rules-popover" role="dialog"><button className="popover-close" onClick={() => setShowRules(false)} aria-label="Close rules">×</button><span className="eyebrow">Quick reference</span><h2>How to suffer</h2><p>On your turn, play or discard up to two cards, then draw back to five.</p><p>Modifiers stack on living characters. Only the top visible Pathos spaces count.</p><p>Untimely Deaths are played during your first play and require negative Self-Worth.</p><p>The game ends when a family is entirely eliminated. The lowest dead-character total wins.</p></div>}
    {showChronicle && <div className="chronicle-drawer"><div className="chronicle-title"><span className="eyebrow">The black book</span><h2>Chronicle</h2></div>{game.log.map((entry, i) => <div className={`log-entry ${i === 0 ? 'latest' : ''}`} key={`${entry}-${i}`}><span className="log-index">{String(game.log.length - i).padStart(2, '0')}</span><p>{entry}</p></div>)}</div>}
  </div>
}

function GameOver({ game, onRestart }) {
  const winner = game.players.find((player) => player.id === game.winnerId) || game.players[0]
  const familyName = (player) => game.mode === 'thrones' ? families[player.family].thronesName : families[player.family].name
  return <main className="results-shell"><section className="results-card"><span className="eyebrow">The séance is complete</span><h1>{winner.name} wins</h1><p className="results-congrats">{game.victoryLine || 'A most unfortunate victory.'}</p><p className="results-family">{familyName(winner)} · Family Value {familyValue(winner)}</p><FamilyValueChart game={game} /><div className="results-scores">{game.players.map((player) => <div className={player.id === winner.id ? 'winner-score' : ''} key={player.id}><span>{player.name}</span><strong>{familyValue(player)}</strong></div>)}</div><button className="primary-button results-button" onClick={onRestart}>Play again</button></section></main>
}

function FamilyValueChart({ game }) {
  const width = 760
  const height = 280
  const padding = 34
  const history = game.history?.length ? game.history : [{ turn: 1, values: {} }]
  const values = history.flatMap((entry) => game.players.map((player) => entry.values[player.id] ?? 0))
  const min = Math.min(0, ...values)
  const max = Math.max(0, ...values)
  const range = Math.max(1, max - min)
  const x = (index) => padding + (index / Math.max(1, history.length - 1)) * (width - padding * 2)
  const y = (value) => padding + ((max - value) / range) * (height - padding * 2)
  const colors = ['#d1797d', '#9db3bd', '#c7a66b', '#a5c99e']
  return <div className="value-chart"><div className="chart-heading"><span>Family Value over turns</span><small>Lower is better</small></div><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Family Value over game turns"><line x1={padding} x2={width - padding} y1={y(0)} y2={y(0)} className="chart-zero" />{game.players.map((player, playerIndex) => <polyline key={player.id} fill="none" stroke={colors[playerIndex % colors.length]} strokeWidth={player.id === game.winnerId ? 4 : 2} points={history.map((entry, index) => `${x(index)},${y(entry.values[player.id] ?? 0)}`).join(' ')} />)}<text x={padding} y={height - 8}>Turn {history[0].turn}</text><text x={width - padding} y={height - 8} textAnchor="end">Turn {history[history.length - 1].turn}</text></svg><div className="chart-legend">{game.players.map((player, index) => <span key={player.id} className={player.id === game.winnerId ? 'winner-legend' : ''}><i style={{ background: colors[index % colors.length] }} />{player.name}</span>)}</div></div>
}

function Lobby({ language, onLanguage, mode, onMode, chosenFamily, onChooseFamily, botCount, onBotCount, onStart }) {
  const [backgroundMode, setBackgroundMode] = useState(mode)
  const [incomingMode, setIncomingMode] = useState(null)
  const [backgroundVisible, setBackgroundVisible] = useState(false)
  useEffect(() => {
    if (mode === backgroundMode) return undefined
    setIncomingMode(mode)
    setBackgroundVisible(false)
    const start = setTimeout(() => setBackgroundVisible(true), 20)
    const finish = setTimeout(() => {
      setBackgroundMode(mode)
      setIncomingMode(null)
      setBackgroundVisible(false)
    }, 2020)
    return () => { clearTimeout(start); clearTimeout(finish) }
  }, [mode, backgroundMode])
  const backgroundUrl = (edition) => edition === 'thrones' ? '/ui/lobby-thrones.webp' : '/ui/lobby-original.webp'
  const en = language === 'en'
  const text = en ? {
    eyebrow: 'A card game of unfortunate lives', subtitle: '', family: 'Choose your family', bots: 'Number of bots', mode: 'Choose your edition', original: 'Original Gloom', originalNote: 'The classic deck', thrones: 'Gloom of Thrones', thronesNote: 'Card set coming soon', start: 'Enter the séance', quote: '“There is no fate but what we make for ourselves.\nUnfortunately, ours is usually dreadful.”', hash: 'build'
  } : {
    eyebrow: 'Карточная игра о несчастных жизнях', subtitle: '', family: 'Выберите семью', bots: 'Число ботов', mode: 'Выберите издание', original: 'Оригинальный Gloom', originalNote: 'Классическая колода', thrones: 'Gloom of Thrones', thronesNote: 'Карты скоро появятся', start: 'Войти в сеанс', quote: '«Нет судьбы, кроме той, что мы создаём сами.\nК сожалению, обычно она ужасна».', hash: 'сборка'
  }
  return <div className="lobby-shell">
    <div className="lobby-bg" style={{ backgroundImage: `url(${backgroundUrl(backgroundMode)})` }} />
    {incomingMode && <div className={`lobby-bg lobby-bg-incoming ${backgroundVisible ? 'visible' : ''}`} style={{ backgroundImage: `url(${backgroundUrl(incomingMode)})` }} />}
    <div className="lobby-vignette" />
    <div className="lobby-language"><button className={en ? 'selected' : ''} onClick={() => onLanguage('en')}>EN</button><button className={!en ? 'selected' : ''} onClick={() => onLanguage('ru')}>RU</button></div>
    <div className="lobby-content">
      <div className="lobby-brand"><span className="lobby-mark">✠</span><span className="eyebrow">{text.eyebrow}</span><h1>Gloom</h1></div>
      <div className="lobby-panel">
        <div className="lobby-field"><span className="eyebrow">{text.mode}</span><div className="edition-picker"><button className={`edition-option ${mode === 'original' ? 'selected' : ''}`} onClick={() => onMode('original')}><strong>{text.original}</strong><small>{text.originalNote}</small></button><button className="edition-option coming-soon" disabled aria-label={`${text.thrones} coming soon`}><strong>{text.thrones}</strong><small>{text.thronesNote}</small><span className="construction-tape">IN CONSTRUCTION</span></button></div></div>
        <div className="lobby-field"><span className="eyebrow">{text.family}</span><div className="family-picker">{Object.entries(families).map(([key, option]) => <button key={key} className={`family-option ${key === chosenFamily ? 'selected' : ''}`} onClick={() => onChooseFamily(key)}><span className={`family-glyph ${option.tone}`}>{option.icon}</span><span><strong>{mode === 'thrones' ? option.thronesName : option.name}</strong><small>{(mode === 'thrones' ? thronesCharacters[key][0] : option.chars[0])} · 5 characters</small></span></button>)}</div></div>
        <div className="lobby-field"><span className="eyebrow">{text.bots}</span><div className="bot-picker">{[1, 2, 3].map((count) => <button key={count} className={`bot-option ${count === botCount ? 'selected' : ''}`} onClick={() => onBotCount(count)}><strong>{count}</strong></button>)}</div></div>
        <button className="lobby-start" onClick={onStart}><span>{text.start}</span><b>→</b></button>
        <div className="lobby-footnote"><span>{text.hash} {BUILD_VERSION}</span></div>
      </div>
      <div className="lobby-quote">{text.quote.split('\n').map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</div>
    </div>
  </div>
}

function FamilyBoard({ player, mode, active, target, onTarget, targetable, hideDead }) {
  const family = families[player.family]
  const familyName = mode === 'thrones' ? family.thronesName : family.name
  const familyTotal = familyValue(player)
  return <div className={`family-board ${active ? 'active-board' : ''}`}><div className="family-head"><div className={`family-glyph ${family.tone}`}>{family.icon}</div><div><span className="eyebrow">{player.name} · {active ? 'active fate' : 'opponent'}</span><h3>{familyName}</h3></div><div className="family-value"><span>FAMILY VALUE</span><b className={familyTotal < 0 ? 'good-score' : ''}>{familyTotal > 0 ? '+' : ''}{familyTotal}</b></div></div><div className="character-row">{player.chars.filter((character) => !hideDead || character.alive).map((character) => <CharacterCard key={character.id} character={character} family={family} selected={target?.charId === character.id} targetable={targetable(character)} onClick={() => onTarget(player.id, character.id)} />)}</div></div>
}

function CharacterCard({ character, family, selected, targetable, onClick }) {
  const total = score(character)
  return <button className={`character-card ${character.alive ? '' : 'dead'} ${targetable ? 'targetable' : ''} ${selected ? 'targeted' : ''}`} onClick={onClick}><div className={`character-worth ${total < 0 ? 'negative' : total > 0 ? 'positive' : ''}`}>{character.modifiers.length > 0 && <strong>{total > 0 ? '+' : ''}{total}</strong>}</div><div className="portrait">{character.alive ? character.portrait ? <img src={`/assets/${character.portrait}`} alt={character.name} /> : <span>{character.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span> : <img src="/assets/dead.webp" alt={`${character.name} dead`} />}</div>{character.modifiers.map((modifier, index) => modifier.asset ? <img key={modifier.id} className={`character-overlay ${modifier.type}`} src={modifier.asset} alt={modifier.title} style={{ zIndex: index + 2 }} /> : <div key={modifier.id} className={`character-overlay modifier-fallback ${modifier.type}`} style={{ zIndex: index + 2 }}><strong>{modifier.title}</strong>{modifier.points && <div>{modifier.points.map((point, pointIndex) => <span key={pointIndex}>{point === null ? '—' : point}</span>)}</div>}</div>)}</button>
}

function HandCard({ card, selected, onClick }) {
  const typeLabel = card.type === 'modifier' ? 'MODIFIER' : card.type === 'death' ? 'UNTIMELY DEATH' : 'EVENT'
  return <button onClick={onClick} className={`hand-card ${card.type} ${card.asset ? 'asset-card' : ''} ${selected ? 'selected' : ''}`}>{card.asset && <img className="hand-card-art" src={card.asset} alt={card.title} />}{!card.asset && <><div className="hand-card-top"><span>{typeLabel}</span><b>{card.type === 'modifier' ? '✦' : card.type === 'death' ? '†' : '♢'}</b></div><strong>{card.title}</strong>{card.points && <div className="mini-points">{card.points.map((p, i) => <span key={i} className={p < 0 ? 'bad' : p > 0 ? 'good' : ''}>{p === null ? '—' : p}</span>)}</div>}<small>{card.text || card.flavor}</small></>}</button>
}

export default App
