import { Injectable } from '@angular/core';
import { ClientRepository } from './client.repository';
import { BaseElectronRepository } from '../../../shared/repository/base.electron.repository';
import { ClientEntity } from '../client.entity';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientElectronRepository extends BaseElectronRepository implements ClientRepository {
  public getClients(): Observable<ClientEntity[]> {
    return super.find<ClientEntity>({ type: 'client'});
  }

  public addClients(clients: ClientEntity[]): Observable<ClientEntity[]> {
    return super.insert(clients);
  }
}
