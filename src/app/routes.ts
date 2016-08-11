import { RouterConfig } from '@angular/router';
import { Main,
        Wishes,
        Calendar,
        AmazonSearchComponent,
        Login } from './containers/index';


export const routes: RouterConfig = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Calendar },
      { path: 'amazon-search', component: AmazonSearchComponent},
      { path: 'login', component: Login},
      { path: 'wishes', component: Wishes}
    ]
  },
  { path: '**', redirectTo: '' }
];
