import { RouterConfig } from '@angular/router';
import { Main,
        Wishes,
        Calendar,
        Login,
        Logout } from './containers/index';
import { AuthGuard } from './services/index';
import { MixtapeComponent } from './mixtape/index';
import { LandingPageComponent } from './landing/index';


export const routes: RouterConfig = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Calendar, canActivate: [AuthGuard] },
      { path: 'login', component: Login },
      { path: 'logout', component: Logout },
      { path: 'wishes', component: Wishes, canActivate: [AuthGuard] },
      { path: 'mixtape', component: MixtapeComponent, canActivate: [AuthGuard] },
      { path: 'landing', component: LandingPageComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];
