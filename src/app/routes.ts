import { RouterConfig } from '@angular/router';
import { Main, Wishes } from './containers';

export const routes: RouterConfig = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Wishes }
    ]
  },
  { path: '**', redirectTo: '' }
];
