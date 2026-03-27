import{describe,it,expect}from'vitest';import{RateLimiter}from'../security/RateLimiter';
describe('RateLimiter',()=>{it('validates',()=>expect(new RateLimiter().validate('x')).toBe(true));});