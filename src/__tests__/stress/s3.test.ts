import{describe,it,expect}from"vitest";
describe("stress 3",()=>{it("load",()=>{const a=Array.from({length:100000},(_,j)=>j*3);expect(a.filter(x=>x%2===0).length).toBeGreaterThan(0);});});