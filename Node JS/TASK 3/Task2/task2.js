const EventEmitter= require('events');
const eventEmitter= new EventEmitter();
let orderCount=0;
eventEmitter.on('orderPlaced',() => {
    orderCount++;  
    console.log('Order placed successfully');
    console.log('Total Orders:',orderCount);
    console.log();
});
eventEmitter.emit('orderPlaced');
eventEmitter.emit('orderPlaced');
eventEmitter.emit('orderPlaced');
eventEmitter.emit('orderPlaced');
eventEmitter.emit('orderPlaced');
