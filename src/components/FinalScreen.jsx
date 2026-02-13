import { useState, useEffect, useRef } from 'react'
import { playCuteAudio } from '../utils/audio'
import './FinalScreen.css'

const FinalScreen = () => {
  const [showContent, setShowContent] = useState(false)
  const cuteAudioRef = useRef(null)

  useEffect(() => {
    // Play cute playful audio
    cuteAudioRef.current = playCuteAudio()
    if (cuteAudioRef.current) {
      cuteAudioRef.current.play().catch(err => {
        console.log('Cute audio play failed (user interaction required):', err)
      })
    }

    setTimeout(() => {
      setShowContent(true)
    }, 300)

    return () => {
      if (cuteAudioRef.current) {
        cuteAudioRef.current.pause()
        cuteAudioRef.current = null
      }
    }
  }, [])

  return (
    <div className="final-screen">
      <div className="final-container">
        <div className={`final-card ${showContent ? 'visible' : ''}`}>
          <div className="final-content">
            <p className="final-line">Even if we argue for no reason.</p>
            <p className="final-line">Even if you get dramatic over small things.</p>
            <p className="final-line">Even if you overthink.</p>
            <p className="final-line">Even if you nag me about my pimples.</p>
            <p className="final-line">Even if distance glitches the connection.</p>
            
            <div className="final-spacer"></div>
            
            <p className="final-line highlight">You're still one of the realest people I've had this year.</p>
            
            <div className="final-spacer-large"></div>
            
            <p className="final-status">Valentine status: <strong>Accepted. No refunds.</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalScreen
