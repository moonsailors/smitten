import { Component,
          Input,
          Output,
          EventEmitter } from '@angular/core';
import { LoginService } from '../services/loginService';
import { Button, InputText } from 'primeng/primeng';

@Component({
  selector: 'login-input',
  directives: [Button, InputText],
  styleUrls: ['app/ui/css/loginInput.css'],
  templateUrl: 'app/ui/templates/loginInput.html'
})

export class LoginInput {
    @Input()
    @Output () emitLogin =  new EventEmitter();
    @Output () emitPartner = new EventEmitter();

    constructor (private loginService: LoginService) {
        this.loggedIn = this.loginService.isLoggedIn;
    }

    user = {};
    partner = {
      email: ''
    };
    loggedIn;
    hitLoginButton = false;

    loginUser() {
      this.hitLoginButton = true;
      this.emitLogin.next(this.user);

    };

    addPartner() {
      this.emitPartner.next(this.partner);
    };

};
