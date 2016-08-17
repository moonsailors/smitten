import { RouterConfig } from '@angular/router';
import { Main,
        Wishes,
        Calendar,
        Login } from './containers/index';
import { SoundCloudSearchComponent } from './mixtape/search/search.component';


export const routes: RouterConfig = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Calendar },
      { path: 'login', component: Login },
      { path: 'wishes', component: Wishes },
      { path: 'mixtape', component: SoundCloudSearchComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

