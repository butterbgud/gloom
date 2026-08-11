const limit = (value, max) => String(value || '').slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_BUG_CHAT_ID
  if (!token || !chatId) return res.status(503).json({ error: 'Bug reporting is not configured' })
  const body = req.body || {}
  const history = Array.isArray(body.history) ? body.history.slice(-30).map((line) => limit(line, 500)) : []
  const debug = body.debug ? limit(JSON.stringify(body.debug), 2400) : '(no diagnostic snapshot)'
  const message = [
    '🐛 Gloom bug report',
    `Version: ${limit(body.version, 80) || 'unknown'}`,
    `URL: ${limit(body.url, 500) || 'unknown'}`,
    `State: turn ${limit(body.game?.turn, 30) || '?'} · active ${limit(body.game?.active, 100) || '?'} · deck ${limit(body.game?.deck, 30) || '?'}`,
    `Browser: ${limit(body.userAgent, 400) || 'unknown'}`,
    '', `Note: ${limit(body.text, 1600) || '(none)'}`, '',
    'Technical snapshot:', debug, '', 'Recent history:', ...(history.length ? history : ['(no game history)']),
  ].join('\n').slice(0, 3900)
  try {
    const telegram = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: message }) })
    if (!telegram.ok) throw new Error(`Telegram returned ${telegram.status}`)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Gloom bug report delivery failed', error)
    return res.status(502).json({ error: 'Could not deliver report' })
  }
}
