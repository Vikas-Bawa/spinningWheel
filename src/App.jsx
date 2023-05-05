import { useState } from 'react'
import './App.css'
import Wheel from './wheel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Wheel />
    </>
  )
}

export default App
