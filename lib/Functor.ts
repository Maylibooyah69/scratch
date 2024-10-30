export abstract class Functor<T> {
    constructor() {}
    abstract map<U>(func: (t: T) => U): Functor<U>;
}



class Container<T> extends Functor<T> {
    private _value: T;

    constructor(value: T) {
        super();
        this._value = value;
    }

    map<U>(func: (t: T) => U): Container<U> {
        return new Container<U>(func(this._value));
    }

    toString(): string {
        return `Container(${this._value})`;
    }
}

const double = (x: number) => x * 2;
const container = new Container<number>(1);
const result = container.map(double);
console.log(result);
