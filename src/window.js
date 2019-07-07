const { BrowserWindow } = require('electron')

const properties_window_default = {
    width: 800,
    height: 600,
    show: false
}

class Window extends BrowserWindow {
    constructor({ file, url, properties_window_new, properties_preload_script, ...properties_enable_dev }) {

        // creates new browserwindow
        super({properties_window_default, properties_window_new, webPreferences: { preload: properties_preload_script }})

        if(file == null) {
            this.loadURL(url)
        } else {
            this.loadFile(file)
        }
        if(properties_enable_dev) { this.webContents.openDevTools() }
        
        // prevent flickering shit
        this.once('ready-to-show', () => {
            this.show()
        })
    }

    toggle_dev() {
       this.webContents.toggleDevTools()
    }
}

module.exports = Window