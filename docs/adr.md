# Architecture Decisions
## ADR-001: Canvas Rendering
- Decision: Raw canvas API instead of game engine
- Reason: Lighter bundle, full control
- Trade-off: More manual collision/physics code
## ADR-002: Local Leaderboard
- Decision: localStorage-based leaderboard
- Reason: No backend dependency
- Trade-off: Single device only
## ADR-003: Wave System
- Decision: Predefined wave configurations
- Reason: Better game balance control
- Trade-off: Less procedural variety
