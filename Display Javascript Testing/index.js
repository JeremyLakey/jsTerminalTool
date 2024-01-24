
const Terminal = require('./terminal')
var fs = require('fs');

//process.stdin.setNoDelay(true)
process.stdin.setRawMode(true)

const term = new Terminal()

console.log(Terminal.width)
console.log(Terminal.height)
    
var tex = ''
process.stdin.on("data", (b) => {
    tex = tex + b.toString('utf8')
    console.clear();
    console.log(tex);
})