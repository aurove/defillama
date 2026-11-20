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
~$1.7k (Ledger avBTCm + avMEZOm supplies valued as Mezo BTC + MEZO)

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
None for TVL. Shares are minted 1:1 with locked underlying on Mezo Earn managed veNFTs.

##### Implementation Details: Briefly describe how the oracle is integrated into your project:
N/A — TVL uses Ledger `totalSupply(trancheId)` mapped to native Mezo BTC / MEZO.

##### Documentation/Proof: Provide links to documentation or any other resources that verify the oracle's usage:
https://www.aurove.xyz/docs/protocol/overview
https://github.com/aurove/core
https://github.com/aurove/id20

##### forkedFrom (Does your project originate from another project):


##### methodology (what is being counted as tvl, how is tvl being calculated):
TVL counts Aurove Ledger ERC-1155 `totalSupply` for managed tranches avBTCm (65540) and avMEZOm (131280), valued as native Mezo BTC and MEZO. Marked `doublecounted` because the same underlying is already included in Mezo Earn. CL pool balances are tracked under Tigris Mezo V3. This PR also adds `fixBalancesTokens` pegs for avBTCm→bitcoin and avMEZOm→mezo so Tigris Mezo V3 can price those pool sides until coins.llama.fi lists the wrappers.

##### Github org/user (Optional, if your code is open source, we can track activity):
aurove

##### Does this project have a referral program?
No
