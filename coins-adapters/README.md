# Aurove coins adapters (DefiLlama)

DefiLlama prices live in the private [`DefiLlama/defillama-server`](https://github.com/DefiLlama/defillama-server) repo under `coins/src/adapters/`.

This folder mirrors the Aurove adapter so reviewers can take it without waiting on fork access.

## Files

| Path here | Upstream path |
| --- | --- |
| `other/aurove.ts` | `coins/src/adapters/other/aurove.ts` |

Register in `coins/src/adapters/index.ts`:

```ts
aurove: require("./other/aurove"),
```

## What it prices

| Token | Address | Path |
| --- | --- | --- |
| avBTCm | `0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a` | MUSD/avBTCm CL `0xB018…` → MUSD |
| avMEZOm | `0xb894b11A78B762c82Cb095148F5BC11DC93C3560` | avBTCm/avMEZOm CL `0xE639…` → avBTCm → MUSD |

Both writes use MUSD (`0xdD468A1DDc392dcdbEf6db6e34E89AA338F9F186`) as the `underlying` so `getWrites` multiplies by the existing Mezo MUSD coins price. Market prices are **not** BTC/MEZO pegs.

## Why not `unknownTokensV3` alone?

`unknownTokensV3` is single-hop. avMEZOm’s deepest pool is against avBTCm, which is itself unpriced until this adapter runs. Pricing both against MUSD in one adapter avoids a same-batch redirect miss.

## Test (upstream)

```bash
LOCAL_TEST=true ts-node coins/src/test.ts aurove
```

## Related

- Protocol TVL (pool-price): https://github.com/DefiLlama/DefiLlama-Adapters/pull/22386
- Coin-price form: https://forms.defillama.com/coin-price (see `docs/pricing.md`)
