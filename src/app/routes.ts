import { RouterConfig } from '@angular/router';
import { Main,
        Wishes,
        Calendar,
        Login } from './containers/index';
import { SoundCloudSearchComponent } from './mixtape/search/index';
import { AuthGuard } from './services/index';


export const routes: RouterConfig = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Calendar, canActivate: [AuthGuard] },
      { path: 'login', component: Login},
      { path: 'wishes', component: Wishes, canActivate: [AuthGuard] },
      { path: 'mixtape', component: SoundCloudSearchComponent, canActivate: [AuthGuard]}
    ]
  },
  { path: '**', redirectTo: '' }
];

