/** safe-ish host dimensions when not running in TTY */
const SAFE_WIDTH  = 80
const SAFE_HEIGHT = 24


class TerminalOutput {
    static _ = process.stdout.on('resize', () => Terminal.resize())
    static width = Terminal.get_width()
    static height = Terminal.get_height()
    static cache = []

    static clear() {
        process.stdout.write("\u001b[2J\u001b[0;0H"); // somewhat clears terminal
        process.stdout.cursorTo(0)
        process.stdout.clearScreenDown()
    }

    static resize = () => {
        this.width = Terminal.get_width
        this.height = Terminal.get_height
        
        process.stdout.cursorTo(0)
        process.stdout.clearScreenDown()

        this.cache = []
        for (let i = 0; i < this.height; i++) this.cache.push("")
    }

    // r = row, s = string
    static write(r, s) {
        let rStart = this.width * r
        let cs = cache[r]
        
        for (let i = 0; i < s.length; i++) {
            if (i < cs.length && s[i] != cs[i]) this.updateCursor(rStart + i, s[i])
        }

        if (s.length < cs.length) {
            for (let i = s.length; i < cs.length; i++) {
                this.updateCursor(rStart + i, ' ')
            }
        }

        cache[r] = s
    }

    static updateCursor(i, v) {
        process.stdout.cursorTo(i)
        process.stdout.write(v)
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

}

module.exports = TerminalOutput