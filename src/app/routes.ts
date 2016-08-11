import { RouterConfig } from '@angular/router';
import { Main, Wishes, Calendar, AmazonSearchComponent } from './containers/index';

export const routes: RouterConfig = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Calendar },
      { path: 'wishes', component: Wishes},
      { path: 'amazon-search', component: AmazonSearchComponent}
    ]
  },
  { path: '**', redirectTo: '' }
];
