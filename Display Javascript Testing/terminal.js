const { Buffer } = require('node:buffer');

/** safe-ish host dimensions when not running in TTY */
const SAFE_WIDTH  = 80
const SAFE_HEIGHT = 24


class Terminal {
    static _ = process.stdout.on('resize', () => Terminal.resize())
    static width = Terminal.get_width()
    static height = Terminal.get_height()

    static buffer = Buffer.alloc((Terminal.width + 1) * Terminal.height)
    static resize = () => {
        this.width = Terminal.get_width
        this.height = Terminal.get_height
        this.buffer = Buffer.alloc((this.width + 1) * this.height)
    }

    /** Returns the current width of the terminal or SAFE_WIDTH if not TTY. */
    static get_width() {
        return process.stdout.isTTY 
            ? process.stdout.columns 
            : SAFE_WIDTH
    }

    /** Returns the current height of the terminal - 1 or SAFE_HEIGHT if not TTY. */
    static get_height() {
        if(process.stdout.isTTY) {
            return (process.stdout.rows >= 3)
                ? process.stdout.rows - 1
                : 1
        } else {
            return SAFE_HEIGHT
        }
    }

    static write(t, r, c) {
        this.buffer.set(buffer, this.pointer)
    }

    static display() {
        process.stdout.write(this.buffer)
    }
}

module.exports = Terminal