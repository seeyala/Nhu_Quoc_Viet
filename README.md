# Nhu_Quoc_Viet

Problem 1: Three ways to sum to n

sum_to_n_a: Uses a loop to calculate the sum from 1 to n.

sum_to_n_b: Uses the mathematical formula (n * (n + 1)) / 2 to calculate the sum.

sum_to_n_c: Uses recursion to calculate the sum by calling the function itself until reaching the base case.

Problem 2: Fancy Form

1. Setup:  Using Vite with React and Tailwind CSS

2. Features
Token Selection
Use a dropdown powered by react-select to display tokens. Each token will have an icon (from the provided repo) and a name.

Input Validation
- Ensure users can only input numeric values.
- Validate that the "From" field is not empty and the value is positive.
- Ensure users have selected tokens for both "From" and "To."

Real-time Exchange Rate
- Fetch token prices from the provided URL and calculate the exchange rate dynamically. Display the equivalent amount for the "To" field as the user types.

UI/UX Design
- Use Tailwind CSS to make the form responsive and visually appealing.
- Include animations for interactivity (e.g., hover effects on buttons).
- Show error messages inline with the fields.
3. API Integration
- Use axios to fetch token prices.
- Filter tokens with available prices and map them into a format suitable for react-select.

Problem 3:
Inefficient useMemo Dependency List:

- Issue: The useMemo hook is dependent on both balances and prices. However, prices is used only in the formattedBalances and rows mapping functions, not directly in the useMemo callback. Including prices in the dependency list causes unnecessary recomputation of the sortedBalances when prices change, even though it doesn't impact the sorting.
- Improvement: Only include balances in the dependency list for useMemo since it directly affects the sorting operation.

Sorting and Filtering in the Same useMemo:

- Issue: Sorting and filtering operations are combined in a single useMemo callback. Sorting is computationally expensive, and doing both filtering and sorting inside the useMemo can degrade performance, especially if balances contains many items. These operations could be optimized by separating concerns and reusing previous computations when possible.
- Improvement: Refactor to separate filtering and sorting logic into separate steps to enhance readability and performance.

Redundant Filtering and Sorting:

- Issue: You are using filter to remove entries with non-positive amounts, but then sorting the entire list after filtering. Sorting is a costly operation, and it will sort even the entries that were discarded by the filter. This is unnecessary.
- Improvement: Filter the balances first, then perform the sorting on the filtered results. This avoids unnecessary sorting of balances that are already removed by the filter.

Map Function in formattedBalances and rows:

- Issue: Both formattedBalances and rows are computed from sortedBalances, which means both mappings are redundant and could result in extra renders. These two mappings can be combined into a single function to avoid multiple iterations over the same data.
- Improvement: Combine formattedBalances and rows into a single map operation, where you directly compute the formatted balances and rows in one step.

Inefficient key Prop in WalletRow:

- Issue: The key prop in React should be stable, and using index as the key is discouraged if the list can change dynamically (e.g., sorting). This can lead to issues with component re-renders and state retention.
- Improvement: If possible, use a unique identifier for each balance (e.g., balance.currency or a combination of properties) as the key.