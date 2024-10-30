function addDelay(func: () => void, delay: number) {
    console.log('Adding delay...');
    return () => {
        setTimeout(func, delay);
    }
}

// const delayedPrint = addDelay(() => console.log('Hello'), 1000);
// delayedPrint();


function addLogging(func: () => void, log: string) {
    console.log('logging', log);
    return () => {
        console.log('Calling function...');
        func();
    }
}

const loggedPrint = addLogging(() => console.log('Saying Hello'), 'Logging Hello');
loggedPrint();
