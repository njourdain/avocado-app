import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxElectronModule } from 'ngx-electron';
import { ClientModule } from './client/client.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    SharedModule,
    ClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
