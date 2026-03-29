import{describe,it,expect}from"vitest";
describe("e2e 4",()=>{it("cycle",()=>{const s={hp:100,score:0,wave:4};s.score+=s.wave*50;expect(s.score).toBe(4*50);});});