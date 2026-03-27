import{describe,it,expect}from'vitest';import{XSSFilter}from'../security/XSSFilter';
describe('XSSFilter',()=>{it('validates',()=>expect(new XSSFilter().validate('x')).toBe(true));});