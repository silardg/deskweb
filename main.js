// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')

const Window = require("./src/window")
const CMenu = require("./src/menu")

let window_main, menu_main

var application_menu = [
  {
    label: 'DeskWeb',
    submenu: [{
        label: 'Setup pages',
        accelerator: 'CmdOrCtrl+S',
        click: () => {
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
if (process.platform == 'darwin') {
  const name = app.getName();
  application_menu.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => { app.quit(); }
      },
    ]
  });
}

function main() {

  require('./src/cookies')

  window_main = new Window({
    url: "https://github.com",
    properties_preload_script: path.join(__dirname, 'preload.js'),
    properties_enable_dev: false
  })

  menu_main = new CMenu({
    properties_application_menu: application_menu
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
  main()
})
