function makeArmy() {
    const shooters = [];

    for (let i = 0; i < 10; i++) {
        const shooter = () => {console.log(i)};
        shooters.push(shooter);
    }
    return shooters;
}

function  makeArmy2(){
    return Array.from({length: 10}, (_, i) => () => console.log(i));
}

const army = makeArmy();
army[0]();
army[5]();