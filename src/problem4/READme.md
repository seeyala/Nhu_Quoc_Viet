1. Iterative Approach

How it works:
- Initialize a variable sum to 0.
- Use a for loop to iterate from 1 to n.
- In each iteration, add the current value i to sum.
- After the loop finishes, return the total sum.

Complexity Analysis:
- Time Complexity (O(n)): The loop runs exactly n times, performing a simple addition each time.
- Space Complexity (O(1)): Uses a few temporary variables (sum and i).

2. Formula-Based Approach

How it works:
- Use the mathematical formula: The sum of numbers from 1 to n is (n.(n+1))/2
(n⋅(n+1))/2.
- Perform the calculation directly and return the result.

Complexity Analysis:
- Time Complexity (O(1)): Performs a single calculation regardless of the value of n.
- Space Complexity (O(1)): Requires no additional memory, using only basic arithmetic operations.

Advantages:
- This is the most efficient approach, as it computes the result in constant time.
- Ideal for large values of n.

3. Recursive Approach

How it works:
- If n is 1, return 1 (base case to stop recursion).
- Otherwise, return n added to the result of sum_to_n_c(n - 1).
- The function keeps calling itself with smaller values until it reaches 1.

Complexity Analysis:
- Time Complexity (O(n)): The function is called n times before reaching the base case.
- Space Complexity (O(n)): Each function call creates a new stack frame. For large n, this can lead to a stack overflow.