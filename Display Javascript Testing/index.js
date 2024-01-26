var csi = require("control-sequence-introducer")

const hideCursorString = () => {
  return csi + "?25l"
}

const hideCursor = () => {
  process.stdout.write(hideCursorString())
}

hideCursor()

process.stdout.write("\u001b[2J\u001b[0;0H"); // somewhat clears terminal


const Terminal = require('./terminal')

//process.stdin.setNoDelay(true)
process.stdin.setRawMode(true)

const term = new Terminal()
    
var currentCommand = ""
var lastCommand = ""
var updateScreen = false

var doClear = false


process.stdin.on("data", (b) => {
    
    let temp = b.toString()
    for(let i = 0; i < temp.length; i++) {
        if (temp[i] == '\r') {
            if (currentCommand == "exit") {
                process.exit(0)
            }
            currentCommand = ""
            doClear = true
            updateScreen = true
        }
        else if (temp[i] == '\b') {
            currentCommand = currentCommand.slice(0, -1)
            updateScreen = true
        }
        else {
            currentCommand += temp[i]
            updateScreen = true

        }
    }

})

const clear = () => {
    if (doClear) {
        doClear = false
        process.stdout.cursorTo(0)
        process.stdout.clearScreenDown()
    }
}

const updateCursor = (i, v) => {
    process.stdout.cursorTo(i)
    process.stdout.write(v)
}

const update = () => {setTimeout(() => {
    if (updateScreen) {
        for (let i = 0; i < currentCommand.length; i++) {
            if (i >= lastCommand.length || currentCommand[i] !== lastCommand[i]) updateCursor(i, currentCommand[i])
        }
        if (currentCommand.length < lastCommand.length) {
            for (let i = currentCommand.length; i < lastCommand.length; i++) {
                updateCursor(i, " ")
            }
        }
        lastCommand = currentCommand
        clear()
        updateScreen = false
    }
    update()
}, 15)}

update()


clear()