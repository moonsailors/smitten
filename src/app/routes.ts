import { RouterConfig } from '@angular/router';
import { Main,
         Wishes,
         Calendar,
         Login,
         Logout,
         Graph } from './containers/index';
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
      { path: 'index', component: LandingPageComponent },
      { path: 'wishes', component: Wishes, canActivate: [AuthGuard] },
      { path: 'sentiment', component: Graph, canActivate: [AuthGuard] },
      { path: 'mixtape', component: MixtapeComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];
