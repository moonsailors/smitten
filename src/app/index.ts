export { App } from './app';
export { routes } from './routes';
export { Store } from './store';
export { Wishes, Main, Calendar, Login } from './containers/index';
export { PostCard, CalendarInput } from './ui/index';

import * as services from './services/index';
const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
  ...mapValuesToArray(services)
];
