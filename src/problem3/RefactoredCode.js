import { useMemo } from 'react';

const WalletPage = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain) => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  // Step 1: Filter out zero or negative balances
  const filteredBalances = useMemo(() => {
    return balances.filter((balance) => balance.amount > 0);
  }, [balances]);

  // Step 2: Sort the balances based on priority
  const sortedBalances = useMemo(() => {
    return filteredBalances.sort((lhs, rhs) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      return rightPriority - leftPriority;
    });
  }, [filteredBalances]);

  const rows = sortedBalances.map((balance) => {
    const formattedBalance = {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
    const usdValue = prices[formattedBalance.currency] * formattedBalance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={formattedBalance.currency} // Using currency as the key (or any unique identifier)
        amount={formattedBalance.amount}
        usdValue={usdValue}
        formattedAmount={formattedBalance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage;
