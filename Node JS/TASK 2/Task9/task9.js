const fs = require('fs').promises;
async function fetchRemoteData(){
    return new Promise((resolve) => {
        setTimeout(() =>{
            const remoteData = [
                { id: 1, value: 'A' },
                { id: 2, value: 'B' }
            ];
            console.log(`Remote fetched: ${remoteData.length} records`);
            resolve(remoteData);
        }, 600);
    });
}
async function fetchLocalData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const localData =[
                { id: 2, value:'C' }, 
                { id: 3, value:'D' }
            ];
            console.log(`Local fetched: ${localData.length} records`);
            resolve(localData);
        }, 400);
    });
}
async function syncData(remote, local){
    return new Promise((resolve) =>{
        setTimeout(() =>{
            const merged =[...local]; 
            let conflicts = 0;
            remote.forEach(r =>{
                const index = merged.findIndex(l => l.id === r.id);
                if(index >= 0){
                    merged[index] = r; 
                    conflicts++;
                }else{
                    merged.push(r);
                }
            });
            console.log(`Synced: ${merged.length} records (${conflicts} conflict${conflicts > 1 ? 's': ''} resolved)`);
            resolve(merged);
        }, 300);
    });
}
async function saveResult(data){
    return new Promise(async (resolve, reject) =>{
        try{
            await fs.writeFile('sync.json',JSON.stringify(data,null, 2));
            setTimeout(() => {
                console.log('Saved to sync.json');
                resolve();
            }, 200);
        }catch(err){
            reject(err);
        }
    });
}
async function runPipeline(){
    try{
        const [remote,local]= await Promise.all([fetchRemoteData(),fetchLocalData()]);
        const merged = await syncData(remote, local);
        await saveResult(merged);
    }catch(err){
        console.error(err);
    }
}
runPipeline();
