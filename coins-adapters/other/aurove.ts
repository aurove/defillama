import { getApi } from "../utils/sdk";
import getWrites from "../utils/getWrites";

const projectName = "aurove";

// Tigris Mezo CL slot0 (no feeProtocol field — differs from canonical UniV3)
const slot0Abi =
  "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, bool unlocked)";

const MUSD = "0xdD468A1DDc392dcdbEf6db6e34E89AA338F9F186";
const AVBTCM = "0xf333171788dE7005695b2E8FB9cAE97Ba9c4dD7a";
const AVMEZOM = "0xb894b11A78B762c82Cb095148F5BC11DC93C3560";

// token0=MUSD, token1=avBTCm
const POOL_MUSD_AVBTCM = "0xB018BED3b3376cE95ee34db170348FA16d18e29D";
// token0=avMEZOm, token1=avBTCm
const POOL_AVBTCM_AVMEZOM = "0xE639b9B1fb72C8ea2Fea246Ba0ad0ed7ddfB0E1C";

/**
 * UniV3/CL human price of token1 per token0:
 *   1.0001^tick * 10^(dec0 - dec1)
 */
function token1PerToken0(tick: number, dec0: number, dec1: number): number {
  return Math.pow(1.0001, tick) * 10 ** (dec0 - dec1);
}

export function aurove(timestamp: number = 0) {
  return getTokenPrices(timestamp);
}

async function getTokenPrices(timestamp: number) {
  const chain = "mezo";
  const api = await getApi(chain, timestamp);

  const pools = [POOL_MUSD_AVBTCM, POOL_AVBTCM_AVMEZOM];
  const [token0s, token1s, slot0s] = await Promise.all([
    api.multiCall({ abi: "address:token0", calls: pools }),
    api.multiCall({ abi: "address:token1", calls: pools }),
    api.multiCall({ abi: slot0Abi, calls: pools }),
  ]);

  const allTokens = Array.from(
    new Set(
      [...token0s, ...token1s].map((t: string) => t.toLowerCase()),
    ),
  );
  const decimals: number[] = await api.multiCall({
    abi: "erc20:decimals",
    calls: allTokens,
  });
  const dec: Record<string, number> = {};
  allTokens.forEach((t, i) => {
    dec[t] = Number(decimals[i]);
  });

  // --- MUSD/avBTCm: price avBTCm in MUSD ---
  const musdPoolTick = Number(slot0s[0].tick ?? slot0s[0][1]);
  const musdT0 = token0s[0].toLowerCase();
  const musdT1 = token1s[0].toLowerCase();
  const avbtcmPerMusdRaw = token1PerToken0(
    musdPoolTick,
    dec[musdT0],
    dec[musdT1],
  );
  // token1 (avBTCm) per token0 (MUSD) → invert for avBTCm priced in MUSD
  const avbtcmInMusd =
    musdT1 === AVBTCM.toLowerCase()
      ? 1 / avbtcmPerMusdRaw
      : avbtcmPerMusdRaw;

  // --- avMEZOm/avBTCm: price avMEZOm in avBTCm, then → MUSD ---
  const mezPoolTick = Number(slot0s[1].tick ?? slot0s[1][1]);
  const mezT0 = token0s[1].toLowerCase();
  const mezT1 = token1s[1].toLowerCase();
  const token1Per0 = token1PerToken0(mezPoolTick, dec[mezT0], dec[mezT1]);
  // avMEZOm is token0 → price in avBTCm (token1) = token1Per0
  const avmezomInAvbtcm =
    mezT0 === AVMEZOM.toLowerCase() ? token1Per0 : 1 / token1Per0;
  const avmezomInMusd = avmezomInAvbtcm * avbtcmInMusd;

  const pricesObject: any = {
    [AVBTCM]: { underlying: MUSD, price: avbtcmInMusd },
    [AVMEZOM]: { underlying: MUSD, price: avmezomInMusd },
  };

  // Thin Mezo CL pools — keep confidence below bluechips but high enough to publish
  return getWrites({
    chain,
    timestamp,
    pricesObject,
    projectName,
    confidence: 0.8,
  });
}
