import{describe,it,expect}from"vitest";
describe("e2e 19",()=>{it("cycle",()=>{const s={hp:100,score:0,wave:19};s.score+=s.wave*50;expect(s.score).toBe(19*50);});});