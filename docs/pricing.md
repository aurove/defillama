# Coin price requests

DefiLlama currently returns no price for:

```text
https://coins.llama.fi/prices/current/mezo:0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a
https://coins.llama.fi/prices/current/mezo:0xb894b11A78B762c82Cb095148F5BC11DC93C3560
```

That undercounts **Tigris Mezo V3** pool TVL for Aurove’s two CL pools (only the already-priced MUSD leg counted reliably).

## Recommended source of truth

Prefer **backing peg** (same as liquid staking wrappers):

- 1 avBTCm ↔ 1 Mezo BTC unit (18 decimals) locked in managed veBTC via Aurove Ledger/Vault
- 1 avMEZOm ↔ 1 MEZO locked in managed veMEZO

Secondary market evidence:

- Mezo pools API (`https://api.mezo.org/pools?filter=none`) publishes spot prices for both wrappers
- MUSD/avBTCm pool: `0xB018BED3b3376cE95ee34db170348FA16d18e29D`
- avBTCm/avMEZOm pool: `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C`

## Form fields (copy/paste)

Use https://forms.defillama.com/coin-price — one token per submission.

### avBTCm

- Chain + address: `mezo` / `0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a`
- Issue: no price
- Where it shows: Tigris Mezo V3 pool TVL; Aurove LP / swap surfaces
- Source: 1:1 backing to Mezo BTC via Aurove Ledger tranche `65540`; pool `0xB018BED3b3376cE95ee34db170348FA16d18e29D`

### avMEZOm

- Chain + address: `mezo` / `0xb894b11A78B762c82Cb095148F5BC11DC93C3560`
- Issue: no price
- Where it shows: Tigris Mezo V3 pool TVL; Aurove LP / swap surfaces
- Source: 1:1 backing to MEZO via Aurove Ledger tranche `131280`; pool `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C`
