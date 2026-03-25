# API Reference
## Utils
- logger: structured logging with levels
- format: truncateAddress, formatSTX, formatScore
- validation: isValidStacksAddress, isValidTxId, isValidScore
- math: clamp, lerp, randomInt, distance
- storage: getStorageItem, setStorageItem, removeStorageItem
- retry: withRetry with exponential backoff
- timing: debounce, throttle
- device: isMobileDevice, isTouchDevice
## Hooks
- useLocalStorage: persistent state
- useWallet: Stacks wallet connection
- useMediaQuery: responsive breakpoints
- useInterval: game loop timers
- useKeyPress: keyboard shortcuts
