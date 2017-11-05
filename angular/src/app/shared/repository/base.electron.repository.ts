import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs/Observable';
import { BaseElectronEntity } from './base.electron.entity';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class BaseElectronRepository {
  constructor(private _electronService: ElectronService) {}

  public insert<T extends BaseElectronEntity>(documents: T[]): Observable<T[]> {
    return this.callAndListen('dbInsert', documents);
  }

  public find<T extends BaseElectronEntity>(query: any): Observable<T[]> {
    return this.callAndListen<T>('dbFind', query);
  }

  private callAndListen<T>(command: string, arg: any): Observable<T[]> {
    const timestamp = Date.now().toString();

    // Important : use promise instead of subject because the renderer callback runs outside of zone.js and will not
    // trigger component update
    return Observable.fromPromise(new Promise((resolve, reject) => {
      this._electronService.ipcRenderer.once(timestamp, (event, arg) => {
        if (arg.error) {
          reject(arg.error);
        }
        else {
          resolve(arg.value);
        }
      });

      this._electronService.ipcRenderer.send(command, { timestamp: timestamp, value: arg });
    }));
  }
}
