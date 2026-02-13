import { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { playCuteAudio, playCelebrationAudio } from '../utils/audio'
import './ProposalScreen.css'

const ProposalScreen = ({ onYes }) => {
  // Initial position - ensure No button is below Yes button (Yes is centered at ~50%, so No starts at ~75%)
  const [noPosition, setNoPosition] = useState({ top: '75%', left: '50%' })
  const [noAttempts, setNoAttempts] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const [noDisabled, setNoDisabled] = useState(false)
  const [showOverride, setShowOverride] = useState(false)
  const celebrationAudioRef = useRef(null)
  const cuteAudioRef = useRef(null)

  useEffect(() => {
    // Play cute playful audio
    cuteAudioRef.current = playCuteAudio()
    if (cuteAudioRef.current) {
      cuteAudioRef.current.play().catch(err => {
        console.log('Cute audio play failed (user interaction required):', err)
      })
    }

    // Load celebration audio
    celebrationAudioRef.current = playCelebrationAudio()

    return () => {
      if (cuteAudioRef.current) {
        cuteAudioRef.current.pause()
        cuteAudioRef.current = null
      }
    }
  }, [])

  const handleYesClick = () => {
    // Play celebration audio
    if (celebrationAudioRef.current) {
      celebrationAudioRef.current.play().catch(err => {
        console.log('Celebration audio play failed:', err)
      })
    }

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b9d', '#ff8fab', '#ffb3d1', '#ffc0d9', '#ffeef8']
    })

    // More confetti bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b9d', '#ff8fab']
      })
    }, 250)

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b9d', '#ff8fab']
      })
    }, 400)

    // Stop playful audio and proceed
    if (cuteAudioRef.current) {
      cuteAudioRef.current.pause()
    }

    setTimeout(() => {
      onYes()
    }, 500)
  }

  const handleNoClick = () => {
    if (noDisabled) return

    const newAttempts = noAttempts + 1
    setNoAttempts(newAttempts)

    // Increase Yes button size
    setYesSize(prev => prev + 0.1)

    // Move No button to random position within safe bounds
    // Ensure No button stays below Yes button (Yes is at ~50% top, so No should be >55%)
    // Account for button size - keep margins to ensure button stays fully visible
    const buttonMargin = 20 // Percentage margin to keep button fully visible
    const yesButtonTop = 50 // Yes button is centered vertically
    const minTop = Math.max(yesButtonTop + 5, buttonMargin) // At least 5% below Yes button
    const maxTop = 100 - buttonMargin // Keep button within container
    const maxLeft = 100 - buttonMargin
    const minLeft = buttonMargin

    const randomTop = Math.random() * (maxTop - minTop) + minTop
    const randomLeft = Math.random() * (maxLeft - minLeft) + minLeft

    setNoPosition({
      top: `${randomTop}%`,
      left: `${randomLeft}%`
    })

    // After 10 attempts, disable No button
    if (newAttempts >= 10) {
      setNoDisabled(true)
      setShowOverride(true)
      setTimeout(() => {
        setShowOverride(false)
      }, 3000)
    }
  }

  return (
    <div className="proposal-screen">
      <div className="proposal-container">
        <div className="proposal-card">
          <h1 className="proposal-title">Will you be my Valentine?</h1>
          
          <div className="buttons-container">
            <button
              className="yes-button"
              onClick={handleYesClick}
              style={{ '--yes-scale': yesSize }}
            >
              Yes 💖
            </button>
            
            <button
              className={`no-button ${noDisabled ? 'disabled' : ''}`}
              onClick={handleNoClick}
              style={{
                position: 'absolute',
                top: noPosition.top,
                left: noPosition.left,
                transform: 'translate(-50%, -50%)'
              }}
              disabled={noDisabled}
            >
              No 😒
            </button>
          </div>

          {showOverride && (
            <div className="override-message">
              Resistance detected. System override activated.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProposalScreen
