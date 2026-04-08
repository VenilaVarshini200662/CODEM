const EventEmitter= require('events');
const eventEmitter= new EventEmitter();
eventEmitter.on('productAdded',(productName) => {
    console.log('Product saved to database');
});
eventEmitter.on('productAdded',(productName) => {
    console.log('Email notification sent');
});
eventEmitter.on('productAdded',(productName) => {
    console.log('Inventory updated');
});
eventEmitter.emit('productAdded','Laptop');
console.log('Product Name:','Laptop');
