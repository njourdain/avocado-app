import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ClientEntity } from './client/service/client.entity';
import { NedbWrapper } from './shared/repository/nedb.wrapper';
import * as fs from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _electronService: ElectronService, private _nedb: NedbWrapper) {}

  public testSourceMaps() {
    // const db = new Nedb({
    //   filename: path.join(this._electronService.remote.app.getPath('documents'), 'test.db'),
    //   autoload: true
    // });

    const doc = new ClientEntity({
      _id: '123456',
      fullName: 'Valerie Plante'
    });

    this._nedb.insert(doc, (err, newDoc) => {   // Callback is optional
      const test1 = err;
      const test2 = newDoc;
      debugger;
      // newDoc is the newly inserted document, including its _id
      // newDoc has no key called notToBeSaved since its value was undefined
    });

    this._nedb.find({ type: 'client' }, (err, docs) => {
      const test1 = err;
      const test2 = docs;
      debugger;
    });
    alert(this._electronService.remote.app.getPath('documents'));
  }

  public compactDb() {
    this._nedb.persistence.compactDatafile();
  }
}
