import 'zone';
import 'reflect-metadata';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { routes } from './routes';
import { providers } from './index';
import { App } from './app';
import { Store } from './store/store';

console.log("App ", App);
console.log("routes", routes);

bootstrap(App, [
  ...HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  Store,
  provideRouter(routes),
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  ...providers
])
.catch(console.error);
