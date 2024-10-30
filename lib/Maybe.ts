// Implements the maybe functor and some basic functions, shows naturality and pattern matching
import { Functor } from "./Functor";

class Maybe<T> extends Functor<T> {
    private _value: T | null;

    constructor(value: T | null) {
        super();
        this._value = value;
    }

    map<U>(func: (t: T) => U): Maybe<U> {
        return this._value ? new Maybe<U>(func(this._value)) : new Maybe<U>(null);
    }

    toString(): string {
        return this._value ? `Maybe(${this._value})` : 'nothing';
    }
}

const maybe = new Maybe<number>(1);
const result = maybe.map((x) => x * 2);
console.log(result);

const safeDivide = (a: number, b: number) => b !== 0 ? new Maybe<number>(a / b) : new Maybe<number>(null);
const result2 = safeDivide(1, 0);
console.log(result2.toString());
