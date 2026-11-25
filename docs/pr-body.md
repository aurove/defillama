**NOTE**

#### Please enable "Allow edits by maintainers" while putting up the PR.

---

##### Name (to be shown on DefiLlama):
Aurove

##### Twitter Link:
https://x.com/aurove_xyz

##### List of audit links if any:


##### Website Link:
https://www.aurove.xyz

##### Logo (High resolution, will be shown with rounded borders):
https://raw.githubusercontent.com/aurove/defillama/main/assets/aurove.png

##### Current TVL:
~$1.7k (Ledger avBTCm + avMEZOm supplies valued at Id20 CL pool mids → MUSD)

##### Treasury Addresses (if the protocol has treasury)


##### Chain:
Mezo

##### Coingecko ID (so your TVL can appear on Coingecko, leave empty if not listed):


##### Coinmarketcap ID (so your TVL can appear on Coinmarketcap, leave empty if not listed):


##### Short Description (to be shown on DefiLlama):
Aurove turns Mezo Earn veBTC / veMEZO managed locks into fungible liquid claims (avBTCm / avMEZOm) that can be held, wrapped as ERC-20, swapped, and used as LP on Mezo’s Tigris CL pools.

##### Token address and ticker if any:
- avBTCm (ERC-20 ID20): `0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a`
- avMEZOm (ERC-20 ID20): `0xb894b11A78B762c82Cb095148F5BC11DC93C3560`

##### Category (full list at https://defillama.com/categories) *Please choose only one:
Liquid Staking

##### Oracle Provider(s): Specify the oracle(s) used (e.g., Chainlink, Band, API3, TWAP, etc.):
None for TVL. Shares mint 1:1 with locked underlying. Liquid-token market prices are from Mezo CL pools (avBTCm vs MUSD; avMEZOm via avBTCm → MUSD), not a BTC/MEZO peg.

##### Implementation Details: Briefly describe how the oracle is integrated into your project:
TVL quantity is Ledger `totalSupply(trancheId)`. USD uses on-chain UniV3-style `slot0` on MUSD/avBTCm `0xB018BED3b3376cE95ee34db170348FA16d18e29D` and avBTCm/avMEZOm `0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C`, converted to MUSD (already priced). Coin-price form still requested so Tigris can price the Id20 legs directly.

##### Documentation/Proof: Provide links to documentation or any other resources that verify the oracle's usage:
https://www.aurove.xyz/docs/protocol/overview
https://github.com/aurove/defillama/blob/main/docs/pricing.md
https://github.com/aurove/core
https://github.com/aurove/id20

##### forkedFrom (Does your project originate from another project):


##### methodology (what is being counted as tvl, how is tvl being calculated):
TVL counts Aurove Ledger ERC-1155 `totalSupply` for managed tranches avBTCm (65540) and avMEZOm (131280). Shares mint 1:1 with locked underlying, but USD valuation uses Id20 market prices from Aurove CL pools (MUSD/avBTCm and avBTCm/avMEZOm `slot0`), converted to MUSD — not BTC/MEZO spot pegs — because the wrappers trade off-peg. Marked `doublecounted` because the same underlying locks are already in Mezo Earn. CL pool balances stay under Tigris Mezo V3. Coin-price form still requested for avBTCm/avMEZOm so Tigris can price those legs without the 2×-MUSD approximation.

##### Github org/user (Optional, if your code is open source, we can track activity):
aurove

##### Does this project have a referral program?
No
