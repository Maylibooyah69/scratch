const partial = <A, B, C>(f: (a: A, b: B) => C, a: A) => (b: B) => f(a, b);

const add = (a: number, b: number) => a + b;
const add5 = partial(add, 5);
console.log(add5(10));