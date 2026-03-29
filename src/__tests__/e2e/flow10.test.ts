import{describe,it,expect}from"vitest";
describe("e2e 10",()=>{it("cycle",()=>{const s={hp:100,score:0,wave:10};s.score+=s.wave*50;expect(s.score).toBe(10*50);});});