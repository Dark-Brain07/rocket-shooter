import{describe,it,expect}from'vitest';import{WalletSigner}from'../chain/WalletSigner';
describe('WalletSigner',()=>{it('defaults mainnet',()=>expect(new WalletSigner().getNet()).toBe('mainnet'));});