# Coin price requests

DefiLlama currently returns no price for:

```text
https://coins.llama.fi/prices/current/mezo:0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a
https://coins.llama.fi/prices/current/mezo:0xb894b11A78B762c82Cb095148F5BC11DC93C3560
```

Wrapping is 1:1 with locked underlying, but **market pricing is not a BTC/MEZO peg**.

## Price path

1. **avBTCm** — price from the **MUSD / avBTCm** CL pool  
   `0xB018BED3b3376cE95ee34db170348FA16d18e29D`  
   (MUSD is already priced on Mezo.)

2. **avMEZOm** — price from the **avBTCm / avMEZOm** CL pool  
   `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C`  
   then convert avBTCm via the MUSD pool above  
   (`avMEZOm → avBTCm → MUSD`).

Mezo’s pools API also publishes these spots (`https://api.mezo.org/pools?filter=none`).

## Tigris Mezo V3 without coins prices

With no wrapper pegs, `getUniTVL` already values **MUSD/avBTCm** as **2× the MUSD reserve** (standard unknown-token vs core-asset path). The **avBTCm/avMEZOm** pool needs coins.llama.fi prices (or equivalent) so both legs are valued through the MUSD path above.

## Form fields (copy/paste)

Use https://forms.defillama.com/coin-price — one token per submission.

### avBTCm

- Chain + address: `mezo` / `0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a`
- Issue: no price
- Where it shows: Tigris Mezo V3 pool TVL; Aurove swap/LP
- Source: on-chain MUSD/avBTCm pool `0xB018BED3b3376cE95ee34db170348FA16d18e29D` (link avBTCm $ value via MUSD). Explorer: https://explorer.mezo.org/address/0xB018BED3b3376cE95ee34db170348FA16d18e29D

### avMEZOm

- Chain + address: `mezo` / `0xb894b11A78B762c82Cb095148F5BC11DC93C3560`
- Issue: no price
- Where it shows: Tigris Mezo V3 pool TVL; Aurove swap/LP
- Source: on-chain avBTCm/avMEZOm pool `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C`, with avBTCm priced via MUSD/avBTCm `0xB018BED3b3376cE95ee34db170348FA16d18e29D` (avMEZOm → avBTCm → MUSD). Explorer: https://explorer.mezo.org/address/0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C
