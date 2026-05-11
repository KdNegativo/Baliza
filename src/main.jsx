import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'

if (/SamsungBrowser/i.test(window.navigator.userAgent)) {
  document.documentElement.classList.add('samsung-browser')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
