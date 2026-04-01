function createPromise(name, delay){
    return new Promise((resolve) =>{
        setTimeout(() =>{
            resolve(name);
        }, delay);
    });
}
function withTimeout(promise, time){
    return new Promise((resolve, reject) =>{
        const timeout= setTimeout(() => {
            reject('Timeout');
        }, time);
        promise
            .then((res) => {
                clearTimeout(timeout);
                resolve(res);
            })
            .catch((err) =>{
                clearTimeout(timeout);
                reject(err);
            });
    });
}
const p1 = withTimeout(createPromise('fetch1', 400), 1000);
const p2 = withTimeout(createPromise('fetch2', 1200), 1000);
const p3 = withTimeout(createPromise('fetch3', 800), 1000);
const p4 = withTimeout(createPromise('fetch4', 2500), 1000);
const p5 = withTimeout(createPromise('fetch5', 600), 1000);
Promise.allSettled([p1, p2, p3, p4, p5])
    .then(results =>{
        let fulfilled = [];
        let timedOut = [];
        results.forEach((result, index) => {
            if(result.status === 'fulfilled'){
                fulfilled.push(result.value);
            }else{
                timedOut.push(`fetch${index + 1}`);
            }
        });
        console.log('Fulfilled:', fulfilled.join(', '));
        console.log('Timed out:', timedOut.join(', '));
    });
