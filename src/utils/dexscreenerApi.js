// Dexscreener API utility functions
const DEXSCREENER_API_BASE = 'https://api.dexscreener.com';

/**
 * Fetch token pair data from Dexscreener API
 * @param {string} chainId - The blockchain chain ID (e.g., 'solana')
 * @param {string} pairAddress - The pair contract address
 * @returns {Promise<Object>} Token pair data
 */
export async function fetchTokenPairData(chainId, pairAddress) {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/latest/dex/pairs/${chainId}/${pairAddress}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token pair data:', error);
    throw error;
  }
}

/**
 * Fetch token data by token address
 * @param {string} chainId - The blockchain chain ID (e.g., 'solana')
 * @param {string} tokenAddress - The token contract address
 * @returns {Promise<Object>} Token data
 */
export async function fetchTokenData(chainId, tokenAddress) {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/latest/dex/tokens/${chainId}/${tokenAddress}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
}

/**
 * Format price with appropriate decimal places (max 6 characters, no scientific notation)
 * @param {string|number} price - The price to format
 * @returns {string} Formatted price
 */
export function formatPrice(price) {
  if (!price || isNaN(price)) return '0.00';
  
  const numPrice = parseFloat(price);
  
  if (numPrice >= 1) {
    // For prices >= 1, show 2 decimal places but limit total to 6 chars
    const formatted = numPrice.toFixed(2);
    return formatted.length <= 6 ? formatted : numPrice.toFixed(1);
  } else if (numPrice >= 0.1) {
    return numPrice.toFixed(3); // 0.123
  } else if (numPrice >= 0.01) {
    return numPrice.toFixed(4); // 0.0123
  } else if (numPrice >= 0.001) {
    return numPrice.toFixed(5); // 0.01234
  } else if (numPrice >= 0.0001) {
    return numPrice.toFixed(6); // 0.012345
  } else {
    // For very small numbers, find the first significant digit
    const str = numPrice.toString();
    if (str.includes('e')) {
      // Handle scientific notation by converting to fixed
      const fixed = numPrice.toFixed(10);
      const match = fixed.match(/0\.0*[1-9]/);
      if (match) {
        const significantStart = match[0].length - 1;
        return fixed.substring(0, Math.min(significantStart + 2, 8));
      }
    }
    return numPrice.toFixed(6);
  }
}

/**
 * Format percentage change with color indicator
 * @param {string|number} change - The percentage change
 * @returns {Object} Object with formatted change and color
 */
export function formatPriceChange(change) {
  if (!change || isNaN(change)) return { formatted: '0.00%', color: '#888' };
  
  const numChange = parseFloat(change);
  const formatted = `${numChange > 0 ? '+' : ''}${numChange.toFixed(2)}%`;
  const color = numChange > 0 ? '#39ff14' : numChange < 0 ? '#ff4444' : '#888';
  
  return { formatted, color };
}