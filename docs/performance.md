# Performance Guide
## Canvas
- Use requestAnimationFrame
- Object pooling for bullets/particles
- Minimize state changes
- Batch draw calls
## Memory
- Clear listeners on unmount
- Pool reusable objects
- Monitor with DevTools
## Bundle
- Dynamic imports for heavy modules
- Tree-shake unused exports
- Compress with gzip
