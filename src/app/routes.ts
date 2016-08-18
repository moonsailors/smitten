import { RouterConfig } from '@angular/router';
import { Main,
        Wishes,
        Calendar,
        Login,
        Logout } from './containers/index';
import { AuthGuard } from './services/index';
import { SoundCloudSearchComponent } from './mixtape/search/search.component';


export const routes: RouterConfig = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Calendar, canActivate: [AuthGuard] },
      { path: 'login', component: Login},
      { path: 'logout', component: Logout},
      { path: 'wishes', component: Wishes, canActivate: [AuthGuard] },
      { path: 'mixtape', component: SoundCloudSearchComponent, canActivate: [AuthGuard]}
    ]
  },
  { path: '**', redirectTo: '' }
];

