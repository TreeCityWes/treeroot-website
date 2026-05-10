// Phase 2 claim snapshot: maps original Solana holder addresses to the X1
// mint addresses they're entitled to claim.
//
// Shape: { [solanaAddress]: [{ x1MintAddress, name, image }] }
//
// Currently empty — populated when the Phase 2 mint runs and pre-mints the
// 470 unclaimed-side assets into the migration wallet. Until then no one is
// eligible and the API returns { items: [] } for every wallet, which is the
// correct behavior.
export const snapshot = {}
export default snapshot
