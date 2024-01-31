/*
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


/** safe-ish host dimensions when not running in TTY */
const SAFE_WIDTH  = 80
const SAFE_HEIGHT = 24


class TerminalOutput {
    static _ = process.stdout.on('resize', () => TerminalOutput.resize())
    static width = TerminalOutput.get_width()
    static height = TerminalOutput.get_height()
    static cache = []
    static callbacks = []

    static clear() {
        process.stdout.write("\u001b[2J\u001b[0;0H"); // somewhat clears terminal text before program
        process.stdout.cursorTo(0)
        process.stdout.clearScreenDown()
    }

    static addResizeCallback(c) {
        this.callbacks.push(c)
    }

    static clearResizeCallbacks() {
        this.callbacks = []
    }

    static resize = () => {
        this.width = TerminalOutput.get_width
        this.height = TerminalOutput.get_height
        
        process.stdout.cursorTo(0)
        process.stdout.clearScreenDown()

        this.cache = []
        for (let i = 0; i < this.height; i++) this.cache.push("")

        for (let i = 0; i < this.callbacks; i++) this.callbacks[i](this.width, this.height)
    }

    // r = row, s = string
    static write(r, s) {
        if (s.length >= this.width) {
            throw new Error('Invalid Width')
        }
        this.writeUnsafe(r, s)
    }

    // write, but with out a length check
    static writeUnsafe(r, s) {
        let rStart = this.width * r
        let cs = this.cache[r]
        if (!cs) {
            cs = ""
        }
        
        for (let i = 0; i < s.length; i++) {
            if (i >= cs.length || s[i] != cs[i]) this.updateCursor(rStart + i, s[i])
        }

        if (s.length < cs.length) {
            for (let i = s.length; i < cs.length; i++) {
                this.updateCursor(rStart + i, ' ')
            }
        }

        this.updateCursor(rStart + this.width, '\n')

        this.cache[r] = s
    }

    // Force update row
    // r = row, s = string
    static writeForce(r, s) {
        this.cache[r] = s
        process.stdout.cursorTo(i)
        process.stdout.clearLine()
        process.stdout.write(s)
    }

    static updateCursor(i, v) {
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