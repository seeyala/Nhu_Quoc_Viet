import React from 'react';

export interface TokenOption {
  value: string;
  label: string;
  price: number;
  icon: string;
}

interface TokenSelectProps {
  tokens: TokenOption[];
  label: string;
  selectedToken: TokenOption | null;
  onChange: (token: TokenOption | null) => void;
}

const TokenSelect: React.FC<TokenSelectProps> = ({
  tokens,
  label,
  selectedToken,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium">{label}</label>

      <select
        className="w-full border p-3 mt-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
        value={selectedToken?.value || ''}
        onChange={(e) => {
          const selectedValue = e.target.value;
          const selected = tokens.find((token) => token.value === selectedValue);
          onChange(selected || null);
        }}
      >
        <option value="" disabled>
          Select a token
        </option>
        {tokens.map((token) => (
          <option key={token.value} value={token.value}>
            <div className="flex items-center">
              <img
                src={token.icon}
                alt={token.label}
                className="w-6 h-6 mr-2 rounded-full"
              />
              {token.label}
            </div>
          </option>
        ))}
      </select>

      <div className="mt-2">
        {selectedToken && (
          <div className="flex items-center">
            <img
              src={selectedToken.icon}
              alt={selectedToken.label}
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-gray-700">{selectedToken.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenSelect;
