/*
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var csi = require("control-sequence-introducer")


class TerminalInput {
    static callbacks = []

    static addCallback(c) {
        this.callbacks.push(c)
    }

    static clearCallbacks() {
        this.callbacks = []
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

    static hideCursorString () {
        return csi + "?25l"
    }
    
    static showCursorString () {
        return csi + "?25l"
    }

    static hideCursor() {
        process.stdout.write(this.hideCursorString())
    }

    static showCursor() {
        process.stdout.write(this.showCursorString())
    }
      
}

module.exports = TerminalInput