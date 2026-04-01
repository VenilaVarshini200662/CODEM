const http = require('http');
function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
function validateOrder(order){
  return delay(200).then(() =>{
    const { item,qty,userId } = order;
    if(!item || !qty || !userId)
         throw{status: 400, message:'Invalid order data'};
    return order;
  });
}
function checkInventory(order){
  return delay(300).then(() => {
    if(order.qty > 10) 
        throw {status: 409,message:'Not enough stock'};
    return order;
  });
}
function chargePayment(order){
  return delay(400).then(() => {
    if(order.userId ==='failPayment') 
        throw{status:402, message:'Payment failed'};
    return order;
  });
}

function createShipment(order){
  return delay(300).then(() => {
    return {trackingId:'TRK-8821', ...order};
  });
}

function sendConfirmation(order){
  return delay(200).then(() => {
    return {emailSent: true, ...order};
  });
}
const server= http.createServer(async (req, res) => {
  if(req.method === 'POST' && req.url === '/orders'){
    let body = '';
    req.on('data',chunk => body += chunk.toString());
    req.on('end',async () => {
      try{
        const order = JSON.parse(body);
        const validOrder = await validateOrder(order);
        await Promise.all([checkInventory(validOrder), chargePayment(validOrder)]);
        const [shipment, confirmation] = await Promise.all([
          createShipment(validOrder),
          sendConfirmation(validOrder)
        ]);
        const response = {
          orderId: 'ORD-1042',
          status: 'confirmed',
          trackingId: shipment.trackingId,
          emailSent: confirmation.emailSent
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response, null, 2));

      }catch (err){
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';
        res.writeHead(status,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: message}));
      }
    });
  }
  else{
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end('Not Found');
  }
});

server.listen(3000,() => console.log('Server running on http://localhost:3000'));
