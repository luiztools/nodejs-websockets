const WebSocket = require('ws');

/*exemplo 1

const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcbusd@bookTicker");
ws.onmessage = (event) => {
    process.stdout.write('\033c');
    const obj = JSON.parse(event.data);
    console.log(`Symbol: ${obj.s}`);
    console.log(`Best ask: ${obj.a}`);
    console.log(`Best bid: ${obj.b}`);
}

*/

const readlineSync = require('readline-sync');
const symbol = readlineSync.question('Qual par de moedas deseja monitorar? ');

const ws = new WebSocket("wss://stream.binance.com:9443/ws/bookTicker");
ws.on('open', () => {
    ws.send(JSON.stringify({
        "method": "SUBSCRIBE",
        "params": [`${symbol.toLowerCase()}@bookTicker`],
        "id": 1
    }))
})

ws.onmessage = (event) => {
    process.stdout.write('\033c');
    const obj = JSON.parse(event.data);
    console.log(`Symbol: ${obj.s}`);
    console.log(`Best ask: ${obj.a}`);
    console.log(`Best bid: ${obj.b}`);
}
