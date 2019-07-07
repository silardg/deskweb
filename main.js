// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')

const Window = require("./src/window")
const CMenu = require("./src/menu")

let window_main, menu_main, window_page_setup

var properties_main_menu = [
  {
    label: 'DeskWeb',
    submenu: [{
        label: 'Setup pages',
        accelerator: 'CmdOrCtrl+S',
        click: () => {
          window_main.change_file('page_setup.html')
        }
      },
      {
        label: 'Developer',
        submenu: [
          {
            label: 'Toggle Dev tool',
            click: () => {
              window_main.toggle_dev()
            }
          }
        ]
      }
    ]
  }
];


function main() {

  require('./src/cookies')

  window_main = new Window({
    file: 'index.html',
    properties_preload_script: path.join(__dirname, 'preload.js'),
    properties_enable_dev: true,
    width: 1024,
    height: 600
  })

  

  menu_main = new CMenu({
    properties_application_menu: properties_main_menu
  })
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', main)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  require('./src/cookies')

  window_main = new Window({
    file: 'index.html',
    properties_preload_script: path.join(__dirname, 'preload.js'),
    properties_enable_dev: true,
    width: 1024,
    height: 600
  })
})
