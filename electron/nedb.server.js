const nedb = require('nedb');

class NedbServer {
  constructor(filename, mainProcess) {
    this.db = new nedb({
      filename: filename,
      autoload: true,
      timestampData: true
    });

    this.mainProcess = mainProcess;
  }

  listen() {
    this.mainProcess.on('dbInsert', (event, arg) => {
      this.db.insert(arg.value, (err, docs) => event.sender.send(arg.timestamp, { error: err, value: docs }));
    });

    this.mainProcess.on('dbFind', (event, arg) => {
      this.db.find(arg.value, (err, docs) => event.sender.send(arg.timestamp, { error: err, value: docs }));
    });
  }
}

module.exports = NedbServer;
