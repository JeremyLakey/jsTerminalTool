/** safe-ish host dimensions when not running in TTY */
const SAFE_WIDTH  = 80
const SAFE_HEIGHT = 24


class TerminalInput {
    static callbacks = []

    static addCallback(c) {
        this.callbacks.push(c)
    }

    static startListening() {
        process.stdin.setRawMode(true)
        process.stdin.on("data", (data) => {         
            let temp = data.toString()
            for (let i = 0; i < this.callbacks.length; i++) {
                callbacks[i](temp)
            }
        })
    }
}

module.exports = TerminalInput