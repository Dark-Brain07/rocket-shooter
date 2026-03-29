import{describe,it,expect}from"vitest";
describe("e2e 3",()=>{it("cycle",()=>{const s={hp:100,score:0,wave:3};s.score+=s.wave*50;expect(s.score).toBe(3*50);});});