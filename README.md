# Aurove × DefiLlama

Working repo for listing **Aurove** and its assets on DefiLlama.

Upstream PRs are opened from [`aurove/DefiLlama-Adapters`](https://github.com/aurove/DefiLlama-Adapters) (fork of [`DefiLlama/DefiLlama-Adapters`](https://github.com/DefiLlama/DefiLlama-Adapters)).

## Scope (Mezo mainnet)

| Surface | Status | Notes |
| --- | --- | --- |
| Aurove protocol TVL | Adapter ready | `projects/aurove` — Ledger tranche supplies × Id20 **pool** prices (→ MUSD), `doublecounted` vs Mezo Earn |
| avBTCm / avMEZOm **market** pricing | Coins adapter ready | [`coins-adapters/other/aurove.ts`](./coins-adapters/other/aurove.ts) → private `defillama-server`. Form copy in `docs/pricing.md`. Needed so Tigris prices both Id20 legs. |
| Mezo CL DEX volume / fees / TVL | Already listed | Factory `0xBB24AF5c6fB88F1d191FA76055e30BF881BeEb79` as **Tigris Mezo V3** (includes Aurove pools). MUSD/avBTCm values as 2× MUSD until coins lists wrappers |
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

Aurove TVL = `Ledger.totalSupply(65540)` (avBTCm) + `Ledger.totalSupply(131280)` (avMEZOm), valued at **Id20 CL pool mids** (converted to MUSD via MUSD/avBTCm and avBTCm/avMEZOm `slot0`), not BTC/MEZO spot pegs. Shares remain 1:1 claims on locked underlying but trade off-peg.

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

Wrapping is 1:1 with locked underlying; **market price is not**. Submit one request per token at https://forms.defillama.com/coin-price (details in [`docs/pricing.md`](./docs/pricing.md)):

1. **avBTCm** — price from MUSD/avBTCm `0xB018BED3b3376cE95ee34db170348FA16d18e29D`
2. **avMEZOm** — price from avBTCm/avMEZOm `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C`, then avBTCm → MUSD

Until coins.llama.fi lists them, Tigris still values MUSD/avBTCm as 2× MUSD; the avBTCm/avMEZOm pool needs the coin prices above.

## Links

- Dapp: https://www.aurove.xyz
- Docs: https://www.aurove.xyz/docs/protocol/overview
- Core: https://github.com/aurove/core
- Id20: https://github.com/aurove/id20
- DefiLlama Mezo: https://defillama.com/chain/mezo
- Tigris Mezo V3: https://defillama.com/protocol/tigris-mezo-v3
