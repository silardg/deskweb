const { app, Menu } = require('electron')

class CMenu {
    constructor({properties_application_menu}) {

        if (process.platform == 'darwin') {
          const name = app.getName();
          properties_application_menu.unshift({
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

        Menu.setApplicationMenu(Menu.buildFromTemplate(properties_application_menu))

    }
}

module.exports = CMenu
