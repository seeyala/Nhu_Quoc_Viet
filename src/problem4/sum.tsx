function sum_to_n_a2(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sum_to_n_b2(n: number): number {
    return (n * (n + 1)) / 2;
}

function sum_to_n_c2(n: number): number {
    if (n === 1) return 1;
    return n + sum_to_n_c2(n - 1);
}