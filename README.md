# Valentine's Proposal App 💖

A mobile-first React single-page application for a Valentine's proposal with 3 interactive stages.

## Features

- **Stage 1: Hacker Boot Screen** - Terminal-style interface with typing animation
- **Stage 2: Mini Love Quiz** - Valentine-themed quiz with compatibility scoring
- **Stage 3: Proposal Screen** - Interactive proposal with moving "No" button
- **Final Screen** - Romantic message display

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technology Stack

- React 18
- Vite
- CSS3 (Mobile-first responsive design)
- Functional components with hooks

## Mobile Optimization

The app is fully optimized for mobile devices with:
- Percentage-based layouts
- Flexible button sizes
- Touch-friendly interactions
- Responsive typography
- Smooth animations

## Project Structure

```
src/
  ├── components/
  │   ├── BootScreen.jsx
  │   ├── BootScreen.css
  │   ├── QuizScreen.jsx
  │   ├── QuizScreen.css
  │   ├── ProposalScreen.jsx
  │   ├── ProposalScreen.css
  │   ├── FinalScreen.jsx
  │   └── FinalScreen.css
  ├── App.jsx
  ├── App.css
  ├── main.jsx
  └── index.css
```

## Usage

Simply open the app on a mobile device or browser. The app will guide through all stages automatically based on user interactions.
