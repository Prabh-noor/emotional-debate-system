// Audio utility for playing sounds throughout the app
// Place your audio files in public/audio/ folder and update the paths below

export const playTerminalAudio = () => {
  // Terminal/typing sound
  // Replace with your audio file: '/audio/terminal.mp3'
  // const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
  // audio.volume = 0.2
  // audio.loop = true
  // return audio
}

export const playCuteAudio = () => {
  // Cute playful background music
  // Replace with your audio file: '/audio/cute.mp3'
  // const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3')
  // audio.volume = 0.3
  // audio.loop = true
  // return audio
}

export const playCelebrationAudio = () => {
  // Celebration sound for Yes button
  // Uses local file from public/audio/confetti.mp3
  const audio = new Audio('/audio/confetti.mp3')
  audio.volume = 0.5
  return audio
}

// Helper to play audio with error handling
export const playAudio = (audio, onError) => {
  if (!audio) return
  
  audio.play().catch(err => {
    // Audio autoplay blocked - user interaction required
    if (onError) onError(err)
  })
}

// Helper to stop audio completely
export const stopAudio = (audio) => {
  if (!audio) return
  
  audio.pause()
  audio.currentTime = 0
  audio.onended = null
  audio.onerror = null
  audio.onloadstart = null
  audio.oncanplay = null
}
