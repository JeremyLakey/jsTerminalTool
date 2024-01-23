
const Terminal = require('./terminal')
var fs = require('fs');


const term = new Terminal(10)

console.log(Terminal.width)
console.log(Terminal.height)
    
    
read = async (stream) => {
    const chunks = [];
    for await (const chunk of stream) console.log(chunk)//chunks.push(chunk); 
    return Buffer.concat(chunks).toString('utf8');
}

const input = fs.readFile(0, 'utf-8');

console.log(input)