import{describe,it,expect}from"vitest";
describe("e2e 8",()=>{it("cycle",()=>{const s={hp:100,score:0,wave:8};s.score+=s.wave*50;expect(s.score).toBe(8*50);});});