const electron = require('electron');
var { app, ipcMain } = electron;
var nedb = require('nedb');

const filename = path.join(app.getPath('documents'), 'test.db');
console.log('Using persistant database located at ' + filename);
const db = new nedb({
  filename: filename,
  autoload: true,
  timestampData: true
});


ipcMain.on('db', (event, arg) => {
  console.log(arg);
  event.sender.send('async-reply', 2);
});

export class 
