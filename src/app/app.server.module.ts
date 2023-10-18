import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { LOCATION } from './providers/location.provider';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
    ],
    providers: [
        {
            provide: LOCATION,
            useFactory: () => {
                const hostname = process.env['HOSTNAME'] || 'wimme.net';
                return { hostname: hostname, origin: `https://${hostname}`, replace: () => {} }
            }
        }
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule { }
