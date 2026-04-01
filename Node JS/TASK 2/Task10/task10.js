const fs = require('fs');
const start = Date.now();
function log(phase, description){
    const ms= Date.now() - start;
    console.log(`[${ms}ms] ${phase} — ${description}`);
}
log('Sync','call stack');
process.nextTick(() => log('nextTick','microtask queue'));
Promise.resolve().then(() => log('Promise','microtask queue'));
setTimeout(() => log('setTimeout','timers phase'), 0);
setImmediate(() => log('setImmediate','check phase'));
fs.readFile(__filename, 'utf8',() => log('fs.readFile','I/O callbacks phase'));
