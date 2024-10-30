const compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (a: A) => f(g(a));

const add1 = (x: number) => x + 1;
const double = (x: number) => x * 2;
const add1ThenDouble = compose(double, add1);
console.log(add1ThenDouble(5));