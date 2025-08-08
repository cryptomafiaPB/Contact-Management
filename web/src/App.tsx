import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-secondary text-primary flex items-center justify-center">
      <h1 className="text-4xl font-bold underline">Tailwind CSS is working!</h1>
    </div>
  )
}

export default App
