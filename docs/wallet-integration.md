# Wallet Integration
## Supported Wallets
- Leather (Hiro Wallet)
- Xverse
## Flow
1. User clicks Connect Wallet
2. connect() from @stacks/connect opens wallet dialog
3. User approves connection
4. App stores STX address in localStorage
5. Score submission creates contract-call transaction
