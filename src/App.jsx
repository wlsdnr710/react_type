import { useState } from 'react'
import Typing from './components/Typing'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Typing />
    </>
  )
}

export default App
