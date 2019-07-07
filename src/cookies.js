const electron = require('electron')
const {app} = electron

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