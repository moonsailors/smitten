export { App } from './app';
export { routes } from './routes';
export { Store } from './store';
export { Wishes, Main, Calendar, Login } from './containers/index';
export { PostCard, CalendarInput } from './ui/index';

import * as services from './services/index';
console.log("services are ", services);
const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

console.log("services map ", mapValuesToArray(services));
export const providers = [
  ...mapValuesToArray(services)
];
