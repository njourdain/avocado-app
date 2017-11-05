import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientElectronRepository } from './service/repository/client.electron.repository';
import { CLIENT_REPOSITORY } from './service/repository/client.repository';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [{ provide: CLIENT_REPOSITORY, useClass: ClientElectronRepository }]
})
export class ClientModule { }
