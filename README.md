# Aurove × DefiLlama

Working repo for listing **Aurove** and its assets on DefiLlama.

Upstream PRs are opened from [`aurove/DefiLlama-Adapters`](https://github.com/aurove/DefiLlama-Adapters) (fork of [`DefiLlama/DefiLlama-Adapters`](https://github.com/DefiLlama/DefiLlama-Adapters)).

## Scope (Mezo mainnet)

| Surface | Status | Notes |
| --- | --- | --- |
| Aurove protocol TVL | Adapter ready | `projects/aurove` — Ledger tranche supplies as BTC + MEZO, `doublecounted` vs Mezo Earn |
| avBTCm / avMEZOm pricing for Mezo DEX | Peg mapping + price form | `fixBalancesTokens` pegs so **Tigris Mezo V3** values Aurove pools; submit [coin price](https://forms.defillama.com/coin-price) for market pricing |
| Mezo CL DEX volume / fees / TVL | Already listed | Factory `0xBB24AF5c6fB88F1d191FA76055e30BF881BeEb79` as **Tigris Mezo V3** (includes Aurove pools) |
| Horizon (Base) | Out of scope for now | Mainnet peers/vaults not deployed |

## Contracts

| Name | Address |
| --- | --- |
| Ledger | `0x0AF3601f0E15b8E33fEc660fBE515DDb6C54dD3c` |
| avBTCm tranche id | `65540` (`0x010004`) |
| avMEZOm tranche id | `131280` (`0x0200d0`) |
| avBTCm ID20 | `0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a` |
| avMEZOm ID20 | `0xb894b11A78B762c82Cb095148F5BC11DC93C3560` |
| MUSD / avBTCm pool | `0xB018BED3b3376cE95ee34db170348FA16d18e29D` |
| avBTCm / avMEZOm pool | `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C` |
| CL factory (Tigris V3) | `0xBB24AF5c6fB88F1d191FA76055e30BF881BeEb79` |

## Methodology

Aurove TVL = `Ledger.totalSupply(65540)` as Mezo BTC + `Ledger.totalSupply(131280)` as MEZO.

Shares mint 1:1 with underlying locked into Mezo Earn managed veNFTs, so the adapter sets `doublecounted: true`.

Pool balances stay under **Tigris Mezo V3** (no pool2 on Aurove).

## Local adapter mirror

`adapters/aurove/index.js` mirrors the DefiLlama project adapter for review. The source of truth for the PR is the fork branch.

## Assets / logo

- Protocol logo: [`assets/aurove.png`](./assets/aurove.png) (square, high-res)
- Website: https://www.aurove.xyz
- X: https://x.com/aurove_xyz
- Github org: https://github.com/aurove

## Token pricing checklist

Submit one request per token at https://forms.defillama.com/coin-price:

1. **avBTCm** — `mezo:0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a`
   - Backing: 1:1 Ledger/managed veBTC
   - Pool: MUSD/avBTCm `0xB018BED3b3376cE95ee34db170348FA16d18e29D`
   - Explorer: https://explorer.mezo.org/token/0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a
2. **avMEZOm** — `mezo:0xb894b11A78B762c82Cb095148F5BC11DC93C3560`
   - Backing: 1:1 Ledger/managed veMEZO
   - Pool: avBTCm/avMEZOm `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C`
   - Explorer: https://explorer.mezo.org/token/0xb894b11A78B762c82Cb095148F5BC11DC93C3560

Until those land, the adapter PR’s `fixBalancesTokens` pegs keep Tigris pool TVL from zeroing the wrapper sides.

## Links

- Dapp: https://www.aurove.xyz
- Docs: https://www.aurove.xyz/docs/protocol/overview
- Core: https://github.com/aurove/core
- Id20: https://github.com/aurove/id20
- DefiLlama Mezo: https://defillama.com/chain/mezo
- Tigris Mezo V3: https://defillama.com/protocol/tigris-mezo-v3
