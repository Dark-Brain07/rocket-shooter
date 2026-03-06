# 🚀 Rocket Shooter

Epic space shooter game with on-chain score tracking on **Stacks Mainnet**.

## 🎮 Play Now

**Live:** [https://rocket-shooter-seven.vercel.app](https://rocket-shooter-seven.vercel.app)

## Features

- Action-packed space shooter with enemies, birds, and explosions
- Progressive difficulty — gets harder every 35 seconds
- On-chain score submission to Stacks blockchain
- Wallet integration with Leather & Xverse
- WASD / Arrow Keys + Mobile touch controls
- Pixel-art graphics with particle effects

## Smart Contract

| | |
|---|---|
| **Contract** | `SP1YH5MXTJT86BZXMFA2T51JF0QVZ8XNYV33QH6MF.rocket-shooter` |
| **Network** | Stacks Mainnet |
| **Language** | Clarity 4 |
| **Explorer** | [View on Hiro Explorer](https://explorer.hiro.so/txid/SP1YH5MXTJT86BZXMFA2T51JF0QVZ8XNYV33QH6MF.rocket-shooter?chain=mainnet) |

### Contract Functions

| Function | Description |
|----------|-------------|
| `submit-score (value uint)` | Submit a game score on-chain |
| `get-score (who principal)` | Get player stats (high score, games, last played) |
| `get-high-score (who principal)` | Get player's highest score |
| `get-games-played (who principal)` | Get total games played |
| `get-player-count` | Total unique players |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Bundler | Vite |
| Blockchain | Stacks (Clarity 4) |
| Wallet | @stacks/connect v8 |
| Hosting | Vercel |

## Game Mechanics

- 🎯 Destroy enemies: **+10 points**
- 🐦 Hit a bird: **-15 points**
- ❤️ Start with **3 lives**
- ⚡ Level up every **35 seconds**
- 🔫 Auto-fire while playing

## Controls

| Input | Action |
|-------|--------|
| W / ↑ | Move Up |
| S / ↓ | Move Down |
| A / ← | Move Left |
| D / → | Move Right |
| Touch & Drag | Mobile movement |

## Quick Start

```bash
git clone https://github.com/Dark-Brain07/rocket-shooter.git
cd rocket-shooter
npm install
npm run dev
```

## License

MIT
