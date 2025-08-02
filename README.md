# TreeRoot.dev - $ROOT Token Website

A modern React website for the $ROOT meme token launched on pump.fun by TreeCityWes.

## Features

- **Cyber-Forest Theme**: Dark background with neon green accents
- **Responsive Design**: Works on desktop and mobile devices
- **Glitch Effects**: Animated text effects and noise overlay
- **Component-Based**: Modular React components for easy maintenance

## Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx       # Navigation header
│   ├── Hero.jsx         # Main hero section
│   ├── About.jsx        # About $ROOT section
│   ├── PumpStats.jsx    # Pump.fun ecosystem stats
│   ├── Stream.jsx       # TreeCityWes stream info
│   ├── Blog.jsx         # Commentary articles
│   ├── Footer.jsx       # Site footer
│   └── NoiseOverlay.jsx # Animated background effect
├── utils/
│   └── pumpApi.js       # API integration functions
└── images/              # Logo and banner assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Pump.fun Integration

The website includes placeholder functions for pump.fun API integration in `src/utils/pumpApi.js`. Update these functions with actual API endpoints when available:

1. **Token Data**: Replace mock data in `fetchTokenData()` with real API calls
2. **Platform Stats**: Update `fetchPumpStats()` with live data
3. **Listing URL**: Set the actual token address in `getPumpListingUrl()`

## Color Palette

- Background: `#0b0b0a` (forest-black)
- Primary neon: `#39ff14`
- Accent green: `#00b140`
- Text color: `#a6a6a6`
- Button hover glow: `#66ff99`

## Typography

The site uses **Share Tech Mono** font for a monospace/terminal aesthetic.

## Animations

- Glitch effect on hero title
- Floating animation on hero banner
- Noise overlay background animation
- Hover effects on all interactive elements
