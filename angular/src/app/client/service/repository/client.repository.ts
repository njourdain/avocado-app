import { ClientEntity } from '../client.entity';
import { Observable } from 'rxjs/Observable';

export interface ClientRepository {
    getClients(): Observable<ClientEntity[]>;
    addClients(clients: ClientEntity[]): Observable<ClientEntity[]>;
}

export const CLIENT_REPOSITORY = 'ClientRepository';
