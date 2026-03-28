import{describe,it,expect}from'vitest';import{NFTMinter}from'../chain/NFTMinter';
describe('NFTMinter',()=>{it('defaults mainnet',()=>expect(new NFTMinter().getNet()).toBe('mainnet'));});