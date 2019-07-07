// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow, session, util} = electron
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, currentSession

function createWindow () {

  
  var cookies = electron.session.defaultSession.cookies;
  cookies.on('changed', function(event, cookie, cause, removed) {
    if (cookie.session && !removed) {
      var url = `${cookie.secure ? 'https' : 'http'}://${cookie.domain}${cookie.path}`
      cookies.set({
        url: url,
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expirationDate: Math.floor(new Date().getTime()/1000)+1209600
      }, function(err) {
        if (err) {
          log.error('Error trying to persist cookie', err, cookie);
        }
      });
    }
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')


  mainWindow.loadURL('http://github.com')

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
    for (const versionType of ['chrome', 'electron', 'node']) {
      console.log(process.versions[versionType])
    }
  
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
