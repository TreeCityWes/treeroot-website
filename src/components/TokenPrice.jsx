import { useState, useEffect } from 'react';
import { fetchTokenPairData, formatPrice, formatPriceChange } from '../utils/dexscreenerApi';
import './TokenPrice.css';

const ROOT_TOKEN_ADDRESS = 'J7hX5qVuJuiUiuZ1AkqE7eVS3sjTJ5kgFnuJwR2Rpump';
const ROOT_SOL_PAIR_ADDRESS = '4LDHt1EqW8UuRh9954t5j7KMCFdTu6XgSPuaNKccXHHm';

function TokenPrice() {
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrice = async () => {
    try {
      setError(null);
      const data = await fetchTokenPairData('solana', ROOT_SOL_PAIR_ADDRESS);
      
      if (data && data.pairs && data.pairs.length > 0) {
        const pair = data.pairs[0];
        setPriceData(pair);
      } else {
        throw new Error('No pair data found');
      }
    } catch (err) {
      console.error('Failed to fetch token price:', err);
      setError('Failed to load price');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    
    // Refresh price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="token-price loading">
        <div className="price-skeleton">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="token-price error">
        <span className="error-text">Price unavailable</span>
      </div>
    );
  }

  if (!priceData) {
    return null;
  }

  const price = formatPrice(priceData.priceUsd);
  const priceChange24h = formatPriceChange(priceData.priceChange?.h24);

  return (
    <div className="token-price">
      <div className="price-info">
        <div className="token-symbol">$ROOT</div>
        <div className="price-details">
          <span className="price-value">${price}</span>
          <span 
            className="price-change" 
            style={{ color: priceChange24h.color }}
          >
            {priceChange24h.formatted}
          </span>
        </div>
        <div className="price-indicator">
          <div className="pulse-dot"></div>
        </div>
      </div>
    </div>
  );
}

export default TokenPrice;