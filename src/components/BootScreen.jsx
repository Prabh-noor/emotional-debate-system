import { useState, useEffect, useRef } from 'react'
import { playTerminalAudio, stopAudio } from '../utils/audio'
import './BootScreen.css'

const bootLines = [
  'Initializing Valentine Protocol...',
  'Scanning Subject...',
  'Checking memory retention... 90% ✓',
  'Detecting skincare reminders... Active ✓',
  'Tracking healthy eating lectures... Ongoing ✓',
  'Evaluating affection levels... Stable but intense ✓',
  '',
  'Loyalty scan in progress...',
  'Cross-checking external threats... None detected ✓',
  'Distraction resistance... Strong ✓',
  'Loyalty level... Absolute ✓',
  '',
  'Attachment pattern analysis...',
  'Anxious attachment traces detected... Mild ✓',
  'Growth trajectory... Improving steadily ✓',
  '',
  'Final Result: Strong Boyfriend Detected.'
]

const BootScreen = ({ onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const terminalAudioRef = useRef(null)

  useEffect(() => {
    // Start terminal audio
    const audio = playTerminalAudio()
    terminalAudioRef.current = audio
    
    if (audio) {
      audio.play().catch(err => {
        console.log('Terminal audio play failed (user interaction required):', err)
      })
    }

    return () => {
      // Cleanup: stop and reset audio when component unmounts
      stopAudio(audio)
      terminalAudioRef.current = null
    }
  }, [])

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLineIndex >= bootLines.length) {
      setShowButton(true)
      return
    }

    const currentLine = bootLines[currentLineIndex]
    
    if (currentLine === '') {
      // Empty line - skip immediately
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, 200)
      return
    }

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1)
      }, 50) // Typing speed

      return () => clearTimeout(timer)
    } else {
      // Line complete, move to next line
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, 300)
    }
  }, [currentLineIndex, currentCharIndex])

  useEffect(() => {
    if (currentLineIndex < bootLines.length && currentCharIndex > 0) {
      const currentLine = bootLines[currentLineIndex]
      const newLine = currentLine.substring(0, currentCharIndex)
      setDisplayedLines(prev => {
        const updated = [...prev]
        updated[currentLineIndex] = newLine
        return updated
      })
    } else if (currentLineIndex < bootLines.length) {
      setDisplayedLines(prev => {
        const updated = [...prev]
        updated[currentLineIndex] = ''
        return updated
      })
    }
  }, [currentLineIndex, currentCharIndex])

  return (
    <div className="boot-screen">
      <div className="boot-container">
        <div className="boot-content">
          {displayedLines.map((line, index) => (
            <div key={index} className="boot-line">
              {line}
              {index === currentLineIndex && currentCharIndex < bootLines[index]?.length && showCursor && (
                <span className="cursor">_</span>
              )}
            </div>
          ))}
          {showButton && (
            <div className="boot-button-container">
              <button 
                className="boot-button" 
                onClick={() => {
                  // Stop terminal audio before transitioning
                  const audio = terminalAudioRef.current
                  if (audio) {
                    stopAudio(audio)
                    terminalAudioRef.current = null
                  }
                  // Small delay to ensure audio stops before transition
                  setTimeout(() => {
                    onComplete()
                  }, 100)
                }}
              >
                Continue System Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BootScreen
