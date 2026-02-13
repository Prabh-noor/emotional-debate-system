import { useState, useEffect, useRef } from 'react'
import { playCuteAudio } from '../utils/audio'
import './QuizScreen.css'

const questions = [
  {
    id: 1,
    question: 'Who is the smarter one?',
    options: ['Me', 'Noor', 'Both', 'Neither'],
    correct: 'Noor'
  },
  {
    id: 2,
    question: 'Who reminds the other to sleep at proper times?',
    options: ['Me', 'Noor', 'Both', 'Neither'],
    correct: 'Noor'
  },
  {
    id: 3,
    question: 'Who fell first?',
    options: ['Me', 'Noor', 'Both at the same time', 'Still falling'],
    correct: 'Me'
  },
  {
    id: 4,
    question: 'What happens when we fight?',
    options: ['We swear/cuss', 'Go quiet', 'Say sorry', 'All of the above'],
    correct: 'All of the above',
  }
]

const QuizScreen = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [feedback, setFeedback] = useState('')
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const cuteAudioRef = useRef(null)

  useEffect(() => {
    // Play cute playful audio
    cuteAudioRef.current = playCuteAudio()
    if (cuteAudioRef.current) {
      cuteAudioRef.current.play().catch(err => {
        console.log('Cute audio play failed (user interaction required):', err)
      })
    }

    return () => {
      if (cuteAudioRef.current) {
        cuteAudioRef.current.pause()
        cuteAudioRef.current = null
      }
    }
  }, [])

  const handleAnswer = (answer) => {
    const question = questions[currentQuestion]
    const isCorrect = answer === question.correct
    
    setSelectedAnswers(prev => ({
      ...prev,
      [question.id]: answer
    }))

    if (isCorrect) {
      setFeedback('Good bacha 🙂‍↕️')
      setScore(prev => prev + 1)
    } else {
      setFeedback('Bhul gya? 😤')
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setFeedback('')
      } else {
        setShowScore(true)
      }
    }, 1500)
  }

  const calculateScore = () => {
    const percentage = (score / questions.length) * 100
    return percentage.toFixed(1)
  }
  const getScoreMessage = (score) => {
    if (score >= 95) {
      return "System nearly flawless. Minor dramatic tendencies detected."
    }
    if (score >= 80) {
      return "Stable connection. Occasional overthinking spikes observed."
    }
    if (score >= 65) {
      return "Moderate compatibility. Debate frequency slightly elevated."
    }
    return "System unstable. Immediate affection patch required."
  }

  if (showScore) {
    const finalScore = calculateScore()
    return (
      <div className="quiz-screen">
        <div className="quiz-container">
          <div className="score-card">
            <h2 className="score-title">Compatibility Score</h2>
            <div className="score-value">{finalScore}%</div>
            <p className="score-deduction">
              {getScoreMessage(finalScore)}
            </p>
            <button 
              className="quiz-button" 
              onClick={() => {
                // Stop cute audio before transitioning
                if (cuteAudioRef.current) {
                  cuteAudioRef.current.pause()
                }
                onComplete()
              }}
            >
              Proceed to Final Evaluation
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="quiz-screen">
      <div className="quiz-container">
        <h2 className="quiz-heading">Lets test you first 😉</h2>
        <div className="quiz-card">
          <div className="question-number">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <h2 className="question-text">{question.question}</h2>
          
          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswers[question.id] === option ? 'selected' : ''
                }`}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswers[question.id]}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`feedback ${feedback.includes('Good') ? 'correct' : 'incorrect'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizScreen
