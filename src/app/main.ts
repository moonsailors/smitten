import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { routes } from './routes';
import { App } from './app';
import { WishService, CalendarService, ApiService } from './services/index';

console.log("services are ", WishService, CalendarService, ApiService);
console.log("App ", App);
console.log("routes", routes);

bootstrap(App, [
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  provideRouter(routes),
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  WishService, CalendarService, ApiService
])
.catch(console.error);
