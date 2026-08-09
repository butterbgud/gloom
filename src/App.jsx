import { useState } from 'react'

const families = {
  castle: { name: 'Castle Slogar', icon: '☿', tone: 'violet', chars: ['Lord Slogar', 'Elias E. Gorr', 'Grogar', 'Melissa Slogar', 'Professor Helena Slogar'] },
  hemlock: { name: 'Hemlock Hall', icon: '♠', tone: 'amber', chars: ['Goody Zarr', 'Lola Wellington-Smythe', 'The Twins', 'Lord Wellington-Smythe', 'Butterfield'] },
  blackwater: { name: 'Blackwater Watch', icon: '†', tone: 'blue', chars: ['Angel', 'Balthazar', 'The Old Dam', 'Cousin Mordecai', 'Willem Stark'] },
  darks: { name: "Dark's Den of Deformity", icon: '✣', tone: 'crimson', chars: ['Darius Dark', 'Elissandre DeVille', 'Thumbelisa', "Samson O'Toole", 'Mister Giggles'] },
}

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
const living = (name, family, index) => ({ id: `${family}-${index}`, name, family, alive: true, modifiers: [], pathos: 0 })

function seededDeck() {
  return [...allCards].sort((a, b) => (a.id.charCodeAt(0) * 17 + a.id.length) - (b.id.charCodeAt(0) * 13 + b.id.length))
}

function makeGame(playerFamily = 'castle') {
  const rivalFamily = Object.keys(families).find((key) => key !== playerFamily) || 'hemlock'
  const playerChars = families[playerFamily].chars.map((name, i) => living(name, playerFamily, i))
  const rivalChars = families[rivalFamily].chars.map((name, i) => living(name, rivalFamily, i))
  const deck = seededDeck()
  return {
    turn: 1, active: 'player', plays: 0, selectedCard: null, target: null, deck: deck.slice(10), discard: deck.slice(0, 10),
    hand: deck.slice(10, 15), log: ['The table is set. Five families wait beneath the black sky.', 'Your family: Castle Slogar. Your rival: Hemlock Hall.'],
    players: [{ id: 'player', name: 'You', family: playerFamily, chars: playerChars }, { id: 'rival', name: 'Lady Mourning', family: rivalFamily, chars: rivalChars }],
  }
}

function score(character) {
  return character.modifiers.reduce((total, card) => total + card.points.reduce((a, b) => a + b, 0), 0)
}

function App() {
  const [game, setGame] = useState(makeGame)
  const [screen, setScreen] = useState('lobby')
  const [chosenFamily, setChosenFamily] = useState('castle')
  const [view, setView] = useState('table')
  if (screen === 'lobby') return <Lobby chosenFamily={chosenFamily} onChooseFamily={setChosenFamily} onStart={() => { setGame(makeGame(chosenFamily)); setScreen('table') }} />
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
        next.plays = 0; next.turn += 1; next.active = next.active === 'player' ? 'rival' : 'player'
        next.log.unshift(`Turn ${next.turn}: ${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
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
      next.selectedCard = null; next.target = null; next.plays = 0; next.turn += 1; next.active = next.active === 'player' ? 'rival' : 'player'
      next.log.unshift(`Turn ${next.turn}: ${next.players.find((p) => p.id === next.active).name} inherits the sorrow.`)
      return drawToLimit(next)
    })
  }

  const reset = () => { setGame(makeGame(chosenFamily)); setScreen('lobby') }
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
          {game.players.map((player) => <FamilyBoard key={player.id} player={player} active={player.id === game.active} target={game.target} onTarget={chooseTarget} />)}
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

function Lobby({ chosenFamily, onChooseFamily, onStart }) {
  const family = families[chosenFamily]
  return <div className="lobby-shell">
    <div className="lobby-vignette" />
    <div className="lobby-content">
      <div className="lobby-brand"><span className="lobby-mark">✠</span><span className="eyebrow">A card game of unfortunate lives</span><h1>Gloom</h1><p>Misery loves company.</p></div>
      <div className="lobby-panel">
        <div className="lobby-panel-head"><div><span className="eyebrow">Before the sorrow begins</span><h2>Gather around the table</h2></div><span className="lobby-seal">II</span></div>
        <div className="lobby-field"><span className="eyebrow">Choose your family</span><div className="family-picker">{Object.entries(families).map(([key, option]) => <button key={key} className={`family-option ${key === chosenFamily ? 'selected' : ''}`} onClick={() => onChooseFamily(key)}><span className={`family-glyph ${option.tone}`}>{option.icon}</span><span><strong>{option.name}</strong><small>{option.chars[0]} · {option.chars.length} characters</small></span></button>)}</div></div>
        <div className="lobby-summary"><div className="summary-emblem"><span className={`family-glyph ${family.tone}`}>{family.icon}</span></div><div><span className="eyebrow">Your house</span><strong>{family.name}</strong><p>Five unfortunate souls await their first misfortune.</p></div><div className="summary-count"><span className="eyebrow">Players</span><strong>2</strong><small>you + rival</small></div></div>
        <button className="lobby-start" onClick={onStart}><span>Enter the séance</span><b>→</b></button>
        <div className="lobby-footnote"><span>Prototype build</span><span>Lowest Family Value wins</span></div>
      </div>
      <div className="lobby-quote">“There is no fate but what we make for ourselves.<br />Unfortunately, ours is usually dreadful.”</div>
    </div>
  </div>
}

function FamilyBoard({ player, active, target, onTarget }) {
  const family = families[player.family]
  const familyValue = player.chars.filter((c) => !c.alive).reduce((sum, c) => sum + score(c), 0)
  return <div className={`family-board ${active ? 'active-board' : ''}`}><div className="family-head"><div className={`family-glyph ${family.tone}`}>{family.icon}</div><div><span className="eyebrow">{player.name} · {active ? 'active fate' : 'opponent'}</span><h3>{family.name}</h3></div><div className="family-value"><span>FAMILY VALUE</span><b className={familyValue < 0 ? 'good-score' : ''}>{familyValue > 0 ? '+' : ''}{familyValue}</b></div></div><div className="character-row">{player.chars.map((character) => <CharacterCard key={character.id} character={character} family={family} selected={target?.charId === character.id} onClick={() => onTarget(player.id, character.id)} />)}</div></div>
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
