const http = require('http');
function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
function getSales(){
  return delay(300).then(() => 85000);
}
function getExpenses(){
  return delay(200).then(() => 32000);
}
function getRefunds(){
  return delay(150).then(() => 5000);
}
function calcProfit(sales,expenses,refunds){
  return delay(200).then(() => sales - expenses - refunds);
}
function calcTax(profit){
  return delay(150).then(() => Math.round(profit * 0.18));
}
function formatReport(sales,expenses,profit,tax){
  return delay(100).then(() => ({
    sales,
    expenses,
    profit,
    tax,
    netAfterTax: profit - tax
  }));
}
const server =http.createServer(async(req,res) =>{
  if(req.method === 'GET' && req.url === '/aggregate'){
    const startTime = Date.now();
    try{
      const [sales,expenses,refunds] = await Promise.all([
        getSales(),
        getExpenses(),
        getRefunds()
      ]);
      const profit= await calcProfit(sales,expenses,refunds);
      const tax= await calcTax(profit);
      const report=await formatReport(sales,expenses,profit,tax);
      const endTime= Date.now();
      const timeTakenMs = endTime - startTime;
      report.timeTaken =`${timeTakenMs}ms`;
      res.writeHead(200,{'Content-Type':'application/json' });
      res.end(JSON.stringify(report,null,2));
    } catch(err){
      res.writeHead(500,{'Content-Type':'application/json'});
      res.end(JSON.stringify({error:'Something went wrong'}));
    }
  }
  else{
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});
server.listen(3000,() => console.log('Server running on http://localhost:3000'));
