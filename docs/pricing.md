# Coin price requests

Form: [https://forms.defillama.com/coin-price](https://forms.defillama.com/coin-price)  
One token per submission. Cloudflare Turnstile must be completed before Submit works.

DefiLlama currently returns no price for either wrapper:

```text
https://coins.llama.fi/prices/current/mezo:0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a
https://coins.llama.fi/prices/current/mezo:0xb894b11A78B762c82Cb095148F5BC11DC93C3560
```

(MUSD on Mezo is already priced.)

Wrapping is 1:1 with locked underlying on the ledger, but **market pricing is not a BTC/MEZO peg**.

## Price path

1. **avBTCm** — Onchain DEX pool **MUSD / avBTCm**  
   `0xB018BED3b3376cE95ee34db170348FA16d18e29D`  
   (MUSD already priced.)

2. **avMEZOm** — Onchain DEX pool **avBTCm / avMEZOm**  
   `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C`  
   then convert avBTCm via the MUSD pool (`avMEZOm → avBTCm → MUSD`).

Mezo’s pools API also publishes these spots when healthy: `https://api.mezo.org/pools?filter=none`.

## Tigris Mezo V3 without coins prices

With no wrapper coins prices, `getUniTVL` already values **MUSD/avBTCm** as **2× the MUSD reserve** (unknown-token vs core-asset path). The **avBTCm/avMEZOm** pool needs coins.llama.fi prices so both legs value through the MUSD path above.

## Live form structure

Sections and fields on https://forms.defillama.com/coin-price (as of 2026-11-20):

### The token

| Field | Control | Notes |
| --- | --- | --- |
| **Chain** | text (`#chain`) | Must match DefiLlama chain slug (`mezo`) |
| **Token contract address** | text (`#address`) | Main token to price. Form checks coins.llama.fi after entry |

### The problem

| Field | Control | Options / notes |
| --- | --- | --- |
| **Request type** | select (`#reqType`) | `No price at all` · `Price exists but is wrong` · `Price exists but is stale or frozen` · `Price is fine, but history is missing` |
| **Where is this visible on DefiLlama, and how much value does it affect?** | textarea (`#impact`) | Link the page showing the missing/wrong number; used for triage priority |

### The price source

| Field | Control | Options / notes |
| --- | --- | --- |
| **Where should the price come from?** | select (`#source`) | `CoinGecko or CoinMarketCap listing` · `CEX market` · `Onchain DEX pool` · `Onchain oracle (Chainlink, Pyth, RedStone, custom)` · `NAV / pricePerShare / convertToAssets on the contract` · `Same price as a token you already cover (wrapper, bridged, 1:1 peg)` |
| **Evidence** | textarea (`#evidence`) | For DEX: deepest pool link, TVL, 24h volume; depth without volume is not enough |
| **Other addresses the same source covers (optional)** | textarea (`#extra`) | One `chain:address` per line |

### Anything else

| Field | Control | Notes |
| --- | --- | --- |
| **Notes (optional)** | textarea (`#notes`) | Peg mechanics, prior PRs, unusual behaviour |
| **Your email (optional)** | email (`#email`) | Follow-up only |
| **Acknowledgment** | checkbox (`#ack`) | Confirms source is public / independently verifiable |

Then **Submit request**. Leave the honeypot (`botcheck`) unchecked.

Do **not** pick “Same price as a token you already cover” for these wrappers — market price tracks the DEX pools, not BTC/MEZO spot.

---

## Submission 1 — avBTCm (copy/paste)

### The token

- **Chain:** `mezo`
- **Token contract address:** `0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a`  
  Form lookup should show **unpriced** (`{"coins":{}}`).

### The problem

- **Request type:** `No price at all`
- **Where is this visible on DefiLlama, and how much value does it affect?**

```text
https://defillama.com/protocol/tigris-mezo-v3 and https://defillama.com/chain/mezo — avBTCm is token1 in the Mezo Tigris CL MUSD/avBTCm pool. Without a coins.llama.fi price the wrapper leg reads $0 and undercounts that pool (recently ~$413 TVL, ~$1.2k 24h volume one-side via Mezo pools API). Also needed for Aurove Mezo CL balances once listed: https://github.com/DefiLlama/DefiLlama-Adapters/pull/22323
```

### The price source

- **Where should the price come from?** `Onchain DEX pool`
- **Evidence:**

```text
Deepest pool: https://mezo.org/earn/pools?address=0xB018BED3b3376cE95ee34db170348FA16d18e29D
Explorer: https://explorer.mezo.org/address/0xB018BED3b3376cE95ee34db170348FA16d18e29D
Recent Mezo API (https://api.mezo.org/pools?filter=none): TVL ~$413, 24h volume ~$1.20k MUSD side / ~$1.24k avBTCm side.
token0 MUSD 0xdD468A1DDc392dcdbEf6db6e34E89AA338F9F186 (already priced on coins.llama.fi).
token1 avBTCm 0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a.
Derive avBTCm USD from this MUSD pair. Do not use a 1:1 BTC peg — market trades below BTC spot.
```

- **Other addresses the same source covers (optional):** _(leave blank)_

### Anything else

- **Notes (optional):**

```text
Aurove liquid managed-BTC ERC-20 (ID20). Wrap vs locked BTC is 1:1 on the ledger, but market price is the MUSD/avBTCm pool (~$58k recently vs BTC spot ~$62k). Do not redirect to coingecko:bitcoin. Companion request for avMEZOm prices via avBTCm→MUSD. TVL adapter PR: https://github.com/DefiLlama/DefiLlama-Adapters/pull/22323
```

- **Your email (optional):** `brightomex@gmail.com`
- **Acknowledgment:** checked

---

## Submission 2 — avMEZOm (copy/paste)

### The token

- **Chain:** `mezo`
- **Token contract address:** `0xb894b11A78B762c82Cb095148F5BC11DC93C3560`  
  Form lookup should show **unpriced** (`{"coins":{}}`).

### The problem

- **Request type:** `No price at all`
- **Where is this visible on DefiLlama, and how much value does it affect?**

```text
https://defillama.com/protocol/tigris-mezo-v3 and https://defillama.com/chain/mezo — avMEZOm is token0 in the Mezo Tigris CL avBTCm/avMEZOm pool. Without a coins price that pool undercounts (recently ~$127 TVL; ~$0.5k–$1.3k 24h volume across sides). Also needed for Aurove listing PR https://github.com/DefiLlama/DefiLlama-Adapters/pull/22323
```

### The price source

- **Where should the price come from?** `Onchain DEX pool`
- **Evidence:**

```text
Deepest pool: https://mezo.org/earn/pools?address=0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C
Explorer: https://explorer.mezo.org/address/0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C
Recent Mezo API (https://api.mezo.org/pools?filter=none): TVL ~$127, 24h volume ~$542 avMEZOm side / ~$1.28k avBTCm side.
token0 avMEZOm 0xb894b11A78B762c82Cb095148F5BC11DC93C3560; token1 avBTCm 0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a.
Price avBTCm first from MUSD/avBTCm https://mezo.org/earn/pools?address=0xB018BED3b3376cE95ee34db170348FA16d18e29D (MUSD already priced), then avMEZOm via this pool (avMEZOm → avBTCm → MUSD). Do not use a 1:1 MEZO peg.
```

- **Other addresses the same source covers (optional):** _(leave blank)_

### Anything else

- **Notes (optional):**

```text
Aurove liquid managed-MEZO ERC-20 (ID20). Wrap vs locked MEZO is 1:1 on the ledger, but market price is via avBTCm/avMEZOm then avBTCm/MUSD. Do not redirect to coingecko:mezo. Companion request filed for avBTCm. TVL adapter PR: https://github.com/DefiLlama/DefiLlama-Adapters/pull/22323
```

- **Your email (optional):** `brightomex@gmail.com`
- **Acknowledgment:** checked

---

## Submit status

Filled both submissions against the live form (lookup verdict **unpriced** for each). Automated Submit is blocked by Cloudflare Turnstile in headless browsers — complete the Turnstile challenge in a normal browser and click **Submit request** using the values above.

Optional faster path after triage: a coins adapter PR against  
https://github.com/DefiLlama/defillama-server/tree/master/coins/src/adapters
