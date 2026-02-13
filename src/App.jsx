import { useState } from 'react'
import BootScreen from './components/BootScreen'
import QuizScreen from './components/QuizScreen'
import ProposalScreen from './components/ProposalScreen'
import FinalScreen from './components/FinalScreen'
import './App.css'

function App() {
  const [stage, setStage] = useState(1) // 1: Boot, 2: Quiz, 3: Proposal, 4: Final

  const handleBootComplete = () => {
    setStage(2)
  }

  const handleQuizComplete = () => {
    setStage(3)
  }

  const handleProposalYes = () => {
    setStage(4)
  }

  return (
    <div className="app">
      {stage === 1 && <BootScreen onComplete={handleBootComplete} />}
      {stage === 2 && <QuizScreen onComplete={handleQuizComplete} />}
      {stage === 3 && <ProposalScreen onYes={handleProposalYes} />}
      {stage === 4 && <FinalScreen />}
    </div>
  )
}

export default App
