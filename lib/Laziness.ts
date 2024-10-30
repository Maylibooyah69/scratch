function lazyFind<T>(arr: T[], predicate: (t: T) => boolean): T  {
    let hero: T | undefined = undefined;
    const proxy = new Proxy(
        {},
        {
            get: (target, prop) => {
                console.log('Filtering...');
                if (!hero) {
                    hero = arr.find(predicate)
                }
                return hero ? hero[prop as keyof T] : undefined;
            }
        }
    )
    return proxy as T;
}


const heros = [
    {name: 'Superman', power: 'flight'},
    {name: 'Batman', power: 'money'},
    {name: 'Wonder Woman', power: 'strength'},
]

console.log('A')
const superman = lazyFind(heros, (hero) => hero.power === 'flight');
console.log('B')
console.log(superman.name)
console.log(superman.power)


