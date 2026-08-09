import React, { useEffect, useState } from 'react'

const families = {
  castle: { name: 'Castle Slogar', thronesName: 'House Snark', icon: '☿', tone: 'violet', chars: ['Lord Slogar', 'Elias E. Gorr', 'Grogar', 'Melissa Slogar', 'Professor Helena Slogar'] },
  hemlock: { name: 'Hemlock Hall', thronesName: 'House Bannister', icon: '♠', tone: 'amber', chars: ['Goody Zarr', 'Lola Wellington-Smythe', 'The Twins', 'Lord Wellington-Smythe', 'Butterfield'] },
  blackwater: { name: 'Blackwater Watch', thronesName: "Kelly's Dragons", icon: '†', tone: 'blue', chars: ['Angel', 'Balthazar', 'The Old Dam', 'Cousin Mordecai', 'Willem Stark'] },
  darks: { name: "Dark's Den of Deformity", thronesName: 'Brotherhood Without Pants', icon: '✣', tone: 'crimson', chars: ['Darius Dark', 'Elissandre DeVille', 'Thumbelisa', "Samson O'Toole", 'Mister Giggles'] },
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
].map(([title, flavor], index) => ({ id: `death-${index}`, type: 'death', title, flavor, pathos: 0 }))

const events = [
  ['Body Thief', 'Remove one of your living characters and one dead character from play.'], ['A Tragic Misunderstanding', 'Swap the top modifiers on two living characters.'], ['To Be or Not To Be', 'Move one Untimely Death from a dead character to a living character with negative Self-Worth.'],
  ['A Stormy Night', 'Draw four cards, play one, then discard down to your draw limit.'], ['The Root of All Evil', "Steal a card from each opponent's hand and play what you wish."], ['A Second Chance', 'Cancel an Untimely Death as it is played, or remove one from a character.'],
  ['Misfortune Favors the Old', 'Play two additional negative cards this round.'], ['Til Death Do Us Part', 'Play an Untimely Death on any character with the heart icon.'], ['Smoke and Mirrors', 'Cancel an Event as it is played.'],
  ['Twist of Fate', 'Replace a character’s top Modifier with one from your hand.'], ['A Chance to Begin Again', 'Discard all Modifiers from one living character.'], ['An Unpleasant Surprise', 'Remove the top Modifier from one living character.'],
].map(([title, text], index) => ({ id: `event-${index}`, type: 'event', title, text, pathos: 0 }))

const modifierSeed = [
  ['was blessed by a Bishop', 0, 0, 20, 'heart'], ['found love on the lake', 0, 0, 15, 'heart'], ['was married magnificently', 0, 0, 15, 'heart'], ['was wondrously well wed', 0, 0, 20, 'heart'],
  ['was delighted by ducklings', 10, 0, 0, 'duck'], ['was crippled by creditors', 0, -20, 0, 'coin'], ['was written out of the will', 0, -20, 0, 'coin'], ['was clever at cards', 15, 0, 0, 'coin'],
  ['was swindled by a salesman', 0, -10, 0, 'coin'], ['landed a legacy', 0, 15, 0, 'coin'], ['stole from a stiff', 0, 0, -15, 'coin'], ['was perturbed by pudding', -5, -5, 0, 'goblet'],
  ['found maggots in the meat', -15, 0, 0, 'goblet'], ['was ruined by rum', -15, 0, -10, 'goblet'], ['found fame at a feast', 0, 10, 0, 'goblet'], ['was sickened by salmon', 0, -10, 0, 'goblet'],
  ['was diverted by drink', 10, 0, 0, 'goblet'], ['was driven to drink', -15, 0, 0, 'goblet'], ['starved in a storm', -10, -10, 0, 'goblet'], ['was plagued by the pox', -15, -15, 0, 'skull'],
  ['was distressed by dysentery', -15, -10, 0, 'skull'], ['was greeted by ghosts', -10, 0, -20, 'skull'], ['was hunted by horrors', 0, -20, -20, 'skull'], ['was galled by gangrene', -15, 0, 0, 'skull'],
  ['was jinxed by gypsies', -15, -15, 0, 'skull'], ['was pestered by poltergeists', 0, -10, -10, 'skull'], ['grew old without grace', -20, 0, 0, 'skull'], ['contracted consumption', -15, 0, -15, 'skull'],
  ['went mildly mad', -10, 0, 0, 'skull'], ['was burdened by boils', 0, 0, -10, 'skull'], ['suffered from sores', -15, 0, -15, 'skull'], ['was mauled by a manatee', -20, 0, 0, 'bat'],
  ['was taunted by tigers', -20, -10, 0, 'bat'], ['was pierced by porcupines', -10, -5, 0, 'bat'], ['was marooned on the moors', -10, 0, 0, 'bat'], ['was terrified by topiary', -20, 0, 0, 'bat'],
  ['was charmed by the circus', 10, 0, 0, 'bat'], ['was wounded by wasps', 0, -15, 0, 'bat'], ['was startled by snakes', -10, -10, 0, 'bat'], ['was pursued by poodles', -15, 0, 0, 'bat'],
  ['was menaced by mice', 0, -15, 0, 'bat'], ['was popular in parliament', 0, 15, 0, 'none'], ['had a picnic in the park', 10, 5, 0, 'none'], ['was chased by children', -10, 0, 0, 'none'],
  ['was scarred by scandals', 0, -25, 0, 'none'], ['was beaten by beggars', -15, 0, 0, 'none'], ['was shunned by society', -15, -15, -15, 'none'], ['broke many bones', -20, 0, 0, 'none'],
  ['was put into prison', -20, 0, 0, 'none'], ['was trapped on a train', -20, 0, 0, 'none'], ['fell down a well', -10, 0, 0, 'none'], ['was cursed by the queen', 0, -15, -20, 'none'],
  ['was mocked by midgets', -10, 0, 0, 'none'], ['was the toast of the town', 0, 15, 0, 'none'], ['was chastised by the church', -10, 0, -15, 'none'],
]
const modifiers = modifierSeed.map(([title, top, middle, bottom, icon], index) => ({ id: `modifier-${index}`, type: 'modifier', title, points: [top, middle, bottom], icon, flavor: 'A fresh misfortune takes root.' }))

const allCards = [...modifiers, ...events, ...deaths]
const cardsForMode = (mode) => mode === 'thrones' ? [...thronesModifiers, ...thronesEvents, ...thronesDeaths] : allCards
const BUILD_VERSION = typeof __BUILD_VERSION__ !== 'undefined' ? __BUILD_VERSION__ : 'dev'
const living = (name, family, index) => ({ id: `${family}-${index}`, name, family, alive: true, modifiers: [], pathos: 0 })

function seededDeck(mode = 'original') {
  return [...cardsForMode(mode)].sort((a, b) => (a.id.charCodeAt(0) * 17 + a.id.length) - (b.id.charCodeAt(0) * 13 + b.id.length))
}

function makeGame(playerFamily = 'castle', mode = 'original', botCount = 2) {
  const rivalFamilies = Object.keys(families).filter((key) => key !== playerFamily).slice(0, botCount)
  const characterSets = mode === 'thrones' ? thronesCharacters : Object.fromEntries(Object.entries(families).map(([key, family]) => [key, family.chars]))
  const playerChars = characterSets[playerFamily].map((name, i) => living(name, playerFamily, i))
  const deck = seededDeck(mode)
  const botNames = ['Lady Mourning', 'The Pale Cousin', 'Baron Nocturne']
  const bots = rivalFamilies.map((family, index) => ({ id: `bot-${index + 1}`, name: botNames[index], family, chars: characterSets[family].map((name, i) => living(name, family, i)) }))
  const handStart = 5
  const botHandStart = handStart
  const deckStart = botHandStart + botCount * 5
  return {
    turn: 1, active: 'player', plays: 0, selectedCard: null, target: null, mode, botCount, deck: deck.slice(deckStart), discard: [],
    hand: deck.slice(0, handStart), botHands: Object.fromEntries(bots.map((bot, index) => [bot.id, deck.slice(botHandStart + index * 5, botHandStart + (index + 1) * 5)])), log: ['The table is set. Five families wait beneath the black sky.', `Your family: ${mode === 'thrones' ? families[playerFamily].thronesName : families[playerFamily].name}. ${bots.length} rival${bots.length === 1 ? '' : 's'} wait in the dark.`],
    players: [{ id: 'player', name: 'You', family: playerFamily, chars: playerChars }, ...bots],
  }
}

function score(character) {
  return character.modifiers.reduce((total, card) => total + card.points.reduce((a, b) => a + b, 0), 0)
}

function App() {
  const [game, setGame] = useState(makeGame)
  const [screen, setScreen] = useState('lobby')
  const [chosenFamily, setChosenFamily] = useState('castle')
  const [language, setLanguage] = useState('en')
  const [mode, setMode] = useState('original')
  const [botCount, setBotCount] = useState(2)
  useEffect(() => {
    if (!game.active.startsWith('bot-') || screen === 'lobby') return undefined
    const timer = setTimeout(runBotTurn, 650)
    return () => clearTimeout(timer)
  }, [game.active, game.turn, screen])
  const [view, setView] = useState('table')
  if (screen === 'lobby') return <Lobby language={language} onLanguage={setLanguage} mode={mode} onMode={setMode} chosenFamily={chosenFamily} onChooseFamily={setChosenFamily} botCount={botCount} onBotCount={setBotCount} onStart={() => { setGame(makeGame(chosenFamily, mode, botCount)); setScreen('table') }} />
  const activePlayer = game.players.find((p) => p.id === game.active)
  const selected = game.hand.find((card) => card.id === game.selectedCard)
  const familyScore = (player) => player.chars.filter((c) => !c.alive).reduce((sum, c) => sum + score(c), 0)
  const playable = selected && (selected.type === 'event' || selected.type === 'death' || selected.type === 'modifier')

  const setSelection = (card) => setGame((g) => ({ ...g, selectedCard: g.selectedCard === card.id ? null : card.id, target: null }))
  const chooseTarget = (playerId, charId) => setGame((g) => ({ ...g, target: { playerId, charId } }))

  const drawToLimit = (state) => {
    const next = { ...state, hand: [...state.hand], deck: [...state.deck], discard: [...state.discard] }
    while (next.hand.length < 5 && next.deck.length) next.hand.push(next.deck.shift())
    return next
  }

  const drawBotToLimit = (state) => {
    const next = { ...state, botHands: Object.fromEntries(Object.entries(state.botHands).map(([id, hand]) => [id, [...hand]])), deck: [...state.deck] }
    Object.values(next.botHands).forEach((hand) => { while (hand.length < 5 && next.deck.length) hand.push(next.deck.shift()) })
    return next
  }

  const runBotTurn = () => {
    setGame((g) => {
      const next = structuredClone(g)
      const rival = next.players.find((p) => p.id === next.active)
      const opponent = next.players.find((p) => p.id === 'player')
      let botHand = next.botHands[rival.id]

      const removeCard = (card) => {
        botHand = botHand.filter((candidate) => candidate.id !== card.id)
        next.discard.push(card)
      }
      const livingChars = (player) => player.chars.filter((character) => character.alive)
      const weakest = (characters) => characters.sort((a, b) => score(a) - score(b))[0]
      const bestModifier = (card) => {
        const own = livingChars(rival).map((character) => ({ character, value: score(character) + card.points.reduce((a, b) => a + b, 0) }))
        const enemy = livingChars(opponent).map((character) => ({ character, value: score(character) - card.points.reduce((a, b) => a + b, 0) }))
        const ownGain = own.sort((a, b) => b.value - a.value)[0]
        const enemyGain = enemy.sort((a, b) => b.value - a.value)[0]
        return card.points.reduce((a, b) => a + b, 0) >= 0 ? { ...ownGain, mode: 'own' } : { ...enemyGain, mode: 'enemy' }
      }

      for (let action = 0; action < 2 && botHand.length; action += 1) {
        const death = botHand.find((card) => card.type === 'death' && livingChars(opponent).some((character) => score(character) < 0))
        if (death) {
          const target = weakest(livingChars(opponent).filter((character) => score(character) < 0))
          target.alive = false
          target.modifiers.push(death)
          removeCard(death)
          next.log.unshift(`${rival.name} sealed ${target.name}'s fate: “${death.title}”. The character is dead.`)
          continue
        }

        const modifier = botHand.find((card) => card.type === 'modifier' && card.points.reduce((a, b) => a + b, 0) !== 0)
        if (modifier) {
          const choice = bestModifier(modifier)
          if (choice?.character) {
            choice.character.modifiers.push(modifier)
            removeCard(modifier)
            next.log.unshift(`${rival.name} played “${modifier.title}” on ${choice.character.name}.`)
            continue
          }
        }

        const event = botHand.find((card) => card.type === 'event')
        if (event) {
          removeCard(event)
          next.log.unshift(`${rival.name} played Event “${event.title}”.`)
          continue
        }

        const discard = [...botHand].sort((a, b) => (a.type === 'modifier' ? a.points.reduce((x, y) => x + y, 0) : 0) - (b.type === 'modifier' ? b.points.reduce((x, y) => x + y, 0) : 0))[0]
        removeCard(discard)
        next.log.unshift(`${rival.name} discarded “${discard.title}”. The rival made a quiet, regrettable choice.`)
      }

      next.botHands[rival.id] = botHand
      next.plays = 0
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
      return drawBotToLimit(drawToLimit(next))
    })
  }

  const playSelected = () => {
    if (!selected || !playable) return
    setGame((g) => {
      const next = structuredClone(g)
      const target = next.target ? next.players.find((p) => p.id === next.target.playerId)?.chars.find((c) => c.id === next.target.charId) : null
      const actor = next.players.find((p) => p.id === next.active)
      if (selected.type === 'modifier' && (!target || !target.alive)) return g
      if (selected.type === 'death' && (!target || !target.alive || score(target) >= 0)) return g
      next.hand = next.hand.filter((card) => card.id !== selected.id)
      if (selected.type === 'modifier') {
        target.modifiers.push(selected)
        next.log.unshift(`${actor.name} played “${selected.title}” on ${target.name}. Self-Worth: ${score(target) > 0 ? '+' : ''}${score(target)}.`)
      } else if (selected.type === 'death') {
        target.alive = false
        target.modifiers.push(selected)
        next.log.unshift(`${actor.name} sealed ${target.name}'s fate: “${selected.title}”. The character is dead.`)
      } else {
        next.log.unshift(`${actor.name} played Event “${selected.title}”. ${selected.text}`)
      }
      next.discard.push(selected)
      next.plays += 1
      next.selectedCard = null; next.target = null
      if (next.plays >= 2 || selected.type === 'death') {
        next.plays = 0
        if (next.active === 'player') {
          next.active = 'bot-1'
          next.log.unshift(`${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
        } else {
          next.active = 'player'
          next.turn += 1
          next.log.unshift(`Turn ${next.turn}: Your family inherits the sorrow.`)
        }
        return drawToLimit(next)
      }
      return next
    })
  }

  const discardSelected = () => {
    if (!selected) return
    setGame((g) => {
      const next = structuredClone(g)
      next.hand = next.hand.filter((card) => card.id !== selected.id)
      next.discard.push(selected)
      next.log.unshift(`${next.players.find((p) => p.id === next.active).name} discarded “${selected.title}”. Even the deck looked away.`)
      next.selectedCard = null; next.target = null; next.plays = 0
      if (next.active === 'player') {
        next.active = 'bot-1'
        next.log.unshift(`${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
      } else {
        next.active = 'player'; next.turn += 1
        next.log.unshift(`Turn ${next.turn}: Your family inherits the sorrow.`)
      }
      return drawToLimit(next)
    })
  }

  const reset = () => { setGame(makeGame(chosenFamily, mode, botCount)); setScreen('lobby') }
  const targetHint = selected?.type === 'death' ? 'Choose a living character with negative Self-Worth.' : selected?.type === 'modifier' ? 'Choose any living character.' : 'Events resolve immediately.'

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark">✠</span><div><span className="eyebrow">The game of inauspicious incidents</span><h1>Gloom</h1></div></div>
      <div className="top-actions"><span className="status-dot" /> <span>prototype table</span><button className="ghost-button" onClick={reset}>New fate</button></div>
    </header>
    <main className="layout">
      <section className="game-column">
        <div className="table-header"><div><span className="eyebrow">A sad little world</span><h2>House of Misfortune</h2></div><div className="turn-badge"><span>TURN</span><strong>{game.turn}</strong><small>{activePlayer.name}'s hand</small></div></div>
        <div className="table-ribbon"><span><b>Lowest Family Value wins</b> · All visible Pathos counts only after death.</span><span className="plays">Plays remaining <b>{Math.max(0, 2 - game.plays)}</b></span></div>
        <div className="families-grid">
          {game.players.map((player) => <FamilyBoard key={player.id} player={player} mode={game.mode} active={player.id === game.active} target={game.target} onTarget={chooseTarget} />)}
        </div>
        <div className="hand-panel">
          <div className="section-heading"><div><span className="eyebrow">Your hand · {game.hand.length} / 5</span><h2>Cards held close</h2></div><span className="muted">Click a card to inspect and play</span></div>
          <div className="hand-row">{game.hand.map((card) => <HandCard key={card.id} card={card} selected={game.selectedCard === card.id} onClick={() => setSelection(card)} />)}</div>
          {selected && <div className="card-inspector"><div className={`inspector-icon ${selected.type}`}>{selected.type === 'modifier' ? '✦' : selected.type === 'death' ? '†' : '♢'}</div><div className="inspector-copy"><span className="eyebrow">{selected.type}</span><h3>{selected.title}</h3><p>{selected.text || selected.flavor}</p>{selected.points && <div className="point-strip">{selected.points.map((point, i) => <span key={i} className={point > 0 ? 'good' : point < 0 ? 'bad' : ''}>{point ? `${point > 0 ? '+' : ''}${point}` : '—'}</span>)}</div>}</div><div className="inspector-actions"><span className="target-hint">{targetHint}</span><button className="primary-button" disabled={!playable || (selected.type !== 'event' && !game.target)} onClick={playSelected}>Play card</button><button className="ghost-button" onClick={discardSelected}>Discard</button></div></div>}
        </div>
      </section>
      <aside className="side-column">
        <div className="side-tabs"><button className={view === 'table' ? 'active' : ''} onClick={() => setView('table')}>Chronicle</button><button className={view === 'rules' ? 'active' : ''} onClick={() => setView('rules')}>Rules</button></div>
        {view === 'table' ? <div className="chronicle"><div className="chronicle-title"><span className="eyebrow">The black book</span><h2>Chronicle</h2></div>{game.log.map((entry, i) => <div className={`log-entry ${i === 0 ? 'latest' : ''}`} key={`${entry}-${i}`}><span className="log-index">{String(game.log.length - i).padStart(2, '0')}</span><p>{entry}</p></div>)}</div> : <div className="rules-card"><span className="eyebrow">Quick reference</span><h2>How to suffer</h2><p>On your turn, play or discard up to two cards, then draw back to five.</p><p>Modifiers stack on living characters. Only the top visible Pathos spaces count.</p><p>Untimely Deaths are played during your first play and require negative Self-Worth.</p><p>The game ends when a family is entirely eliminated. The lowest dead-character total wins.</p><div className="family-key">{Object.values(families).map((family) => <div key={family.name}><span className={`family-glyph ${family.tone}`}>{family.icon}</span>{family.name}</div>)}</div></div>}
        <div className="deck-status"><div><span className="eyebrow">Draw pile</span><strong>{game.deck.length}</strong></div><div><span className="eyebrow">Discarded</span><strong>{game.discard.length}</strong></div></div>
      </aside>
    </main>
    <footer><span>Gloom prototype · based on the supplied 2004 rules and card list</span><span>✦ Fate is cruel. Make it count.</span></footer>
  </div>
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
  const backgroundUrl = (edition) => edition === 'thrones' ? '/assets/lobby-thrones.webp' : '/assets/lobby-original.webp'
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
        <div className="lobby-field"><span className="eyebrow">{text.mode}</span><div className="edition-picker"><button className={`edition-option ${mode === 'original' ? 'selected' : ''}`} onClick={() => onMode('original')}><strong>{text.original}</strong><small>{text.originalNote}</small></button><button className={`edition-option ${mode === 'thrones' ? 'selected' : ''}`} onClick={() => onMode('thrones')}><strong>{text.thrones}</strong><small>{text.thronesNote}</small></button></div></div>
        <div className="lobby-field"><span className="eyebrow">{text.family}</span><div className="family-picker">{Object.entries(families).map(([key, option]) => <button key={key} className={`family-option ${key === chosenFamily ? 'selected' : ''}`} onClick={() => onChooseFamily(key)}><span className={`family-glyph ${option.tone}`}>{option.icon}</span><span><strong>{mode === 'thrones' ? option.thronesName : option.name}</strong><small>{(mode === 'thrones' ? thronesCharacters[key][0] : option.chars[0])} · 5 characters</small></span></button>)}</div></div>
        <div className="lobby-field"><span className="eyebrow">{text.bots}</span><div className="bot-picker">{[2, 3].map((count) => <button key={count} className={`bot-option ${count === botCount ? 'selected' : ''}`} onClick={() => onBotCount(count)}><strong>{count}</strong></button>)}</div></div>
        <button className="lobby-start" onClick={onStart}><span>{text.start}</span><b>→</b></button>
        <div className="lobby-footnote"><span>{text.hash} {BUILD_VERSION}</span></div>
      </div>
      <div className="lobby-quote">{text.quote.split('\n').map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</div>
    </div>
  </div>
}

function FamilyBoard({ player, mode, active, target, onTarget }) {
  const family = families[player.family]
  const familyName = mode === 'thrones' ? family.thronesName : family.name
  const familyValue = player.chars.filter((c) => !c.alive).reduce((sum, c) => sum + score(c), 0)
  return <div className={`family-board ${active ? 'active-board' : ''}`}><div className="family-head"><div className={`family-glyph ${family.tone}`}>{family.icon}</div><div><span className="eyebrow">{player.name} · {active ? 'active fate' : 'opponent'}</span><h3>{familyName}</h3></div><div className="family-value"><span>FAMILY VALUE</span><b className={familyValue < 0 ? 'good-score' : ''}>{familyValue > 0 ? '+' : ''}{familyValue}</b></div></div><div className="character-row">{player.chars.map((character) => <CharacterCard key={character.id} character={character} family={family} selected={target?.charId === character.id} onClick={() => onTarget(player.id, character.id)} />)}</div></div>
}

function CharacterCard({ character, family, selected, onClick }) {
  const total = score(character)
  return <button className={`character-card ${character.alive ? '' : 'dead'} ${selected ? 'targeted' : ''}`} onClick={onClick}><div className="character-top"><span className={`tiny-glyph ${family.tone}`}>{family.icon}</span><span className="character-state">{character.alive ? 'LIVING' : 'DECEASED'}</span></div><div className="portrait"><span>{character.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span></div><div className="character-name">{character.name}</div><div className={`self-worth ${total < 0 ? 'negative' : total > 0 ? 'positive' : ''}`}>{character.alive ? 'Self-Worth' : 'Final Pathos'} <strong>{total > 0 ? '+' : ''}{total}</strong></div><div className="modifier-stack">{character.modifiers.slice(-3).map((modifier) => <span key={modifier.id} className={modifier.type}>{modifier.title}</span>)}{character.modifiers.length > 3 && <span>+{character.modifiers.length - 3} more</span>}</div></button>
}

function HandCard({ card, selected, onClick }) {
  const typeLabel = card.type === 'modifier' ? 'MODIFIER' : card.type === 'death' ? 'UNTIMELY DEATH' : 'EVENT'
  return <button onClick={onClick} className={`hand-card ${card.type} ${selected ? 'selected' : ''}`}><div className="hand-card-top"><span>{typeLabel}</span><b>{card.type === 'modifier' ? '✦' : card.type === 'death' ? '†' : '♢'}</b></div><strong>{card.title}</strong>{card.points && <div className="mini-points">{card.points.map((p, i) => <span key={i} className={p < 0 ? 'bad' : p > 0 ? 'good' : ''}>{p || '—'}</span>)}</div>}<small>{card.text || card.flavor}</small></button>
}

export default App
