import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TokenSelect, { TokenOption } from './TokenSelect';

const SwapForm: React.FC = () => {
  const [tokens, setTokens] = useState<TokenOption[]>([]);
  const [fromToken, setFromToken] = useState<TokenOption | null>(null);
  const [toToken, setToToken] = useState<TokenOption | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios
      .get('https://interview.switcheo.com/prices.json')
      .then(({ data }) => {
        const predefinedIcons: Record<string, string> = {
          BLUR: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BLUR.svg',
          bNEO: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/bNEO.svg',
          BUSD: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BUSD.svg',
          USD: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USD.svg',
          ETH: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg',
          GMX: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/GMX.svg',
          LUNA: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LUNA.svg',
          STRD: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/STRD.svg',
          EVMOS: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/EVMOS.svg',
          IBCX: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/IBCX.svg',
          IRIS: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/IRIS.svg',
          ampLUNA: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ampLUNA.svg',
          KUJI: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KUJI.svg',
          USDC: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDC.svg',
          ATOM: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ATOM.svg',
        };
  
        const availableTokens: TokenOption[] = data.map((item: any) => ({
          value: item.currency,
          label: item.currency,
          price: item.price,
          icon: predefinedIcons[item.currency] || `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`,
        }));
        setTokens(availableTokens);
      })
      .catch(() => setError('Failed to fetch token data.'));
  }, []);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value)) || Number(value) < 0) {
      setError('Please enter a valid amount.');
    } else {
      setError('');
      setFromAmount(value);
      if (fromToken && toToken) {
        const rate = toToken.price / fromToken.price;
        setExchangeRate(rate);
      } else {
        setExchangeRate(null);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white shadow-lg rounded-xl p-8 w-96">
      <h2 className="text-2xl font-extrabold text-indigo-600 text-center mb-6">
        Currency Swap
      </h2>
      <TokenSelect
        tokens={tokens}
        label="From"
        selectedToken={fromToken}
        onChange={setFromToken}
      />
      <input
        type="text"
        className="w-full border mt-2 p-3 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Enter amount"
        value={fromAmount}
        onChange={handleFromAmountChange}
      />
      <TokenSelect
        tokens={tokens}
        label="To"
        selectedToken={toToken}
        onChange={setToToken}
      />
      <div className="mt-4 text-gray-600 bg-indigo-50 rounded-md p-4">
      <p className="flex justify-between">
        <span>Exchange Rate:</span>
        <span className="font-semibold text-indigo-600">
          {fromToken && toToken
            ? `1 ${fromToken.label} = ${exchangeRate?.toFixed(6) || '--'} ${toToken.label}`
            : 'Select tokens to calculate rate'}
        </span>
      </p>
      <p className="flex justify-between mt-2">
        <span>You will receive:</span>
        <span className="font-semibold text-indigo-600">
          {fromAmount && exchangeRate
            ? (Number(fromAmount) * exchangeRate).toFixed(2)
            : '--'}
        </span>
      </p>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
      <button
        className="bg-indigo-600 text-white mt-4 py-3 px-6 rounded-lg w-full font-semibold hover:bg-indigo-700 transition"
        disabled={!(fromToken && toToken && fromAmount && !error)}
      >
        Swap
      </button>
    </div>
  );
};

export default SwapForm;
