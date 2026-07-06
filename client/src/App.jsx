import { useState } from 'react'
import logo from './assets/logo.svg'
import marvelLogo from './assets/marvelLogo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app-shell">
      <section className="hero-card">
        <img src={logo} className="base" alt="QuickShow logo" />
        <img src={marvelLogo} className="framework" alt="Marvel logo" />
        <h1>QuickShow is ready</h1>
        <p>Edit src/App.jsx to start building your experience.</p>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </main>
  )
}

export default App
