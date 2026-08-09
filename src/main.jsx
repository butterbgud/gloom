import './style.css'

const root = document.getElementById('root')
const showBootError = (message) => {
  root.innerHTML = `<div class="boot-error"><span class="eyebrow">The séance could not begin</span><h1>Gloom</h1><p>${message}</p></div>`
}

window.addEventListener('error', (event) => showBootError(event.error?.message || event.message || 'Unknown browser error.'))
window.addEventListener('unhandledrejection', (event) => showBootError(event.reason?.message || String(event.reason)))

import('react').then(({ default: React }) => import('react-dom/client').then(({ createRoot }) => import('./App.jsx').then(({ default: App }) => {
  createRoot(root).render(React.createElement(App))
}))).catch((error) => showBootError(error.message || String(error)))
