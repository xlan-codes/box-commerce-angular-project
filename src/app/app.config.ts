import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor, httpInterceptorFn } from './http-interceptor/auth.interceptor';
import { DBConfig } from './constants';
import { NgxIndexedDBModule } from 'ngx-indexed-db';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  // },
  importProvidersFrom(
    NgxIndexedDBModule.forRoot(DBConfig)
  ),
    provideHttpClient(withInterceptors([httpInterceptorFn])),
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideAnimationsAsync(), provideAnimationsAsync()]
};
