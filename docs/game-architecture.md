# Game Architecture
## Rendering
Canvas-based rendering with requestAnimationFrame loop.
## Entity System
- Player ship with position, velocity, health
- Enemies with wave-based spawning
- Bullets with pooling for memory efficiency
- Power-ups with timed effects
## Collision Detection
- AABB rectangle overlap for bullets and enemies
- Circle collision for player and power-ups
## Input System
- Keyboard: WASD/Arrow keys for movement, Space to shoot
- Touch: virtual joystick (planned)
