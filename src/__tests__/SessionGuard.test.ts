import{describe,it,expect}from'vitest';import{SessionGuard}from'../security/SessionGuard';
describe('SessionGuard',()=>{it('validates',()=>expect(new SessionGuard().validate('x')).toBe(true));});