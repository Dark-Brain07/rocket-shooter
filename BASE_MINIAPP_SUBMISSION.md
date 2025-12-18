# Rocket Shooter - Base Mini App Submission

## 📋 Application Details

**Name:** Rocket Shooter
**Category:** Games
**Description:** Epic space shooter game with blockchain leaderboard on Base Mainnet

## 🔗 Links

- **Live URL:** https://rocket-shooter-seven.vercel.app/
- **GitHub:** https://github.com/Dark-Brain07/rocket-shooter
- **Contract:** 0x951634B88938D2Cdd72149dB57C198Ea835AAf20
- **BaseScan:** https://basescan.org/address/0x951634B88938D2Cdd72149dB57C198Ea835AAf20
- **Manifest:** https://rocket-shooter.vercel.app/.well-known/farcaster.json

## 🎮 Features

- Action-packed space shooter gameplay
- WASD/Arrow keys + Touch controls for mobile
- Enemies shoot back at player
- Difficulty increases every 35 seconds
- Real-time blockchain score storage
- Gas-optimized smart contract (top 10 leaderboard)
- Multi-wallet support (MetaMask, Coinbase, Rainbow)

## 🎯 Game Mechanics

- **Scoring:**
  - Destroy enemy rocket/plane: +10 points
  - Hit bird: -15 points penalty
  - Lives: Start with 3
  - Game Over: 0 lives

- **Progressive Difficulty:**
  - Level increases every 35 seconds
  - More enemies spawn
  - Faster enemy movement
  - Enemies shoot bullets

## 🔐 Smart Contract

**Address:** `0x951634B88938D2Cdd72149dB57C198Ea835AAf20`
**Network:** Base Mainnet (Chain ID: 8453)

**Functions:**
- `submitScore(uint96 _score)` - Save player score
- `getPlayerStats(address)` - Get player high score & games
- `getLeaderboard()` - Get top 10 players
- `getTopScores(uint8)` - Get top N scores

**Gas Optimized:**
- Uses uint96 for scores (saves gas)
- Fixed array size for leaderboard
- Packed structs for storage efficiency

## 📸 Screenshots

1. **Menu Screen** - Main game menu with wallet connection
2. **Gameplay** - Active shooting gameplay
3. **Game Over** - Score display and blockchain save

## 🚀 Technical Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Blockchain:** Ethers.js v5
- **Smart Contract:** Solidity 0.8.20
- **Deployment:** Vercel
- **Network:** Base Mainnet

## 📱 Compatibility

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Mobile)
- ✅ Touch controls for mobile devices
- ✅ Responsive design

## 🎨 Assets

All game graphics are custom pixel art:
- Player rocket
- Enemy rockets and planes
- Flying birds
- Bullets and explosions
- Animated backgrounds

## 📝 Manifest Location

`/.well-known/farcaster.json`

## 🔧 Installation & Testing
```bash
# Clone repository
git clone https://github.com/Dark-Brain07/rocket-shooter
cd rocket-shooter

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## 👨‍💻 Developer

**GitHub:** Dark-Brain07
**Project:** Rocket Shooter
**License:** MIT

## 📊 Contract Verification

Contract is verified on BaseScan:
https://basescan.org/address/0x951634B88938D2Cdd72149dB57C198Ea835AAf20#code

---

**Built with ❤️ for the Base ecosystem**
