const { BrowserWindow } = require('electron')

const properties_window_default = {
    width: 800,
    height: 600,
    show: false
}

let properties

class Window extends BrowserWindow {
    constructor({ file, url, width, height, properties_preload_script, ...properties_enable_dev }) {


        // creates new browserwindow
        super({width: width, height: height,webPreferences: { preload: properties_preload_script }, resizable: false})

        //this.setSize(_width, _height)

        if(file == null) {
            this.loadURL(url)
        } else {
            this.loadFile(file)
        }
        
        this.webContents.openDevTools()
        
        // prevent flickering shit
        this.once('ready-to-show', () => {
            this.show()
        })
    }

    toggle_dev() {
       this.webContents.toggleDevTools()
    }

    change_file(file) {
        this.loadFile(file)
    }
}

module.exports = Window