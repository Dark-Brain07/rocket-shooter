import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rocket Shooter - Space Battle on Base',
  description: 'Epic space shooter game with blockchain leaderboard on Base Mainnet',
  openGraph: {
    title: 'Rocket Shooter - Defend the Skies',
    description: 'Action-packed space shooter with Web3 integration on Base blockchain',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://rocket-shooter.vercel.app/og-image.png',
    'fc:frame:button:1': 'Play Now',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://rocket-shooter.vercel.app',
  },
};

export const baseMiniAppConfig = {
  name: 'Rocket Shooter',
  version: '1.0.0',
  description: 'Epic space shooter game with blockchain leaderboard',
  homeUrl: 'https://rocket-shooter.vercel.app',
  iconUrl: 'https://rocket-shooter.vercel.app/icon.png',
  splashImageUrl: 'https://rocket-shooter.vercel.app/splash.png',
  splashBackgroundColor: '#0f172a',
  category: 'games',
  contract: {
    address: '0x951634B88938D2Cdd72149dB57C198Ea835AAf20',
    network: 'base',
    chainId: 8453
  },
  features: [
    'wallet-connection',
    'blockchain-scores',
    'leaderboard'
  ],
  wallets: [
    'metamask',
    'coinbase',
    'rainbow'
  ]
};
