function recursiveChain(n, current = 1){
    if(current > n){
        return Promise.resolve(); 
    }
    return Promise.resolve()
        .then(() =>{
            console.log(`Step ${current}`);
        })
        .then(() =>{
            return recursiveChain(n, current + 1);
        });
}

recursiveChain(5).then(() =>{
    process.nextTick(() =>{
        console.log('nextTick after chain');
    });
    setTimeout(() =>{
        console.log('timeout after chain');
    }, 0);
    setImmediate(() =>{
        console.log('immediate after chain');
    });
});
