import { BaseElectronEntity } from '../../shared/repository/base.electron.entity';

export class ClientEntity extends BaseElectronEntity {

  public constructor(init?: Partial<ClientEntity>) {
    super();
    Object.assign(this, init);
  }

  public type = 'client';
  public fullName: string;
}
