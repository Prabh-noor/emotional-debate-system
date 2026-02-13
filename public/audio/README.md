# Audio Files

Place your audio files in this directory:

- `terminal.mp3` - Terminal/typing sound for boot screen
- `cute.mp3` - Cute playful background music for quiz and proposal screens
- `celebration.mp3` - Celebration sound for Yes button click

After adding your audio files, update the paths in `src/utils/audio.js`:

```javascript
export const playTerminalAudio = () => {
  const audio = new Audio('/audio/terminal.mp3')
  audio.volume = 0.2
  audio.loop = true
  return audio
}

export const playCuteAudio = () => {
  const audio = new Audio('/audio/cute.mp3')
  audio.volume = 0.3
  audio.loop = true
  return audio
}

export const playCelebrationAudio = () => {
  const audio = new Audio('/audio/celebration.mp3')
  audio.volume = 0.5
  return audio
}
```

## Free Audio Resources

You can find free audio files at:
- https://freesound.org/
- https://www.zapsplat.com/
- https://mixkit.co/free-sound-effects/

Search for:
- Terminal/typing sounds
- Cute/romantic background music
- Celebration/confetti sounds
