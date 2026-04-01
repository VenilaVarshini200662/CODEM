
function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
function asyncTask(id){
  const duration = Math.floor(Math.random() * 1000) + 500;
  console.log(`Task ${id} started`);
  const start = Date.now();
  return wait(duration).then(() =>{
    console.log(`Task ${id} done — ${Date.now() - start}ms`);
  });
}
async function limitConcurrency(tasks,limit){
  let running = 0;
  let index = 0;
  return new Promise(resolve =>{
    function next(){
      while(running < limit && index < tasks.length){
        const taskIndex = index++;
        running++;
        tasks[taskIndex]().then(() => {
          running--;
          next(); 
        });
      }
      if(running === 0 && index === tasks.length){
        resolve();
      }
    }
    next();
  });
}
async function main(){
  const tasks = Array.from({ length: 10 }, (_, i) => () => asyncTask(i + 1));
  console.time("All done — concurrent");
  await limitConcurrency(tasks, 3);
  console.timeEnd("All done — concurrent");
  console.time("All done — sequential");
  for(const task of tasks){
    await task();
  }
  console.timeEnd("All done — sequential");
}
main();
