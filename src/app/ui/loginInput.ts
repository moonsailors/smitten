import { Component,
          Input,
          Output,
          EventEmitter } from '@angular/core';
import { LoginService } from '../services/loginService';
import { Button, InputText } from 'primeng/primeng';

@Component({
  selector: 'login-input',
  directives: [Button, InputText],
  styles: [`
    .login-page {
      width: 100%;
      text-align: center;
    }

    .login-container {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }

    .color-bar {
      background-color: #91204D;
      height: 9px;
      width: 100%;
    }

    p {
      font-size: 1.5625em;
      font-weight: 700;
    }

    .login-container img {
      width: 190px;
      height: auto;
      margin-top: 7px;
    }
  `
  ],
  template: `
  <div class="login-page">
    <div class="color-bar"></div>
    <div
      class="login-container"
      [hidden]="hitLoginButton || loggedIn">
      <p>welcome to smitten.</p>
      <img (click)="loginUser()" src="app/images/google-signin.png">
    </div>
    <div
        class="partner-link-container"
        [hidden]="!loggedIn">
        <p>please link your partner.</p>
        <input
            type="text"
            [(ngModel)]="partner.email"
            placeholder="your partner's gmail address">
        <button (click)="addPartner()"></button>
    </div>
  </div>
  `
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
      console.log("hit loginUser");
      this.hitLoginButton = true;
      this.emitLogin.next(this.user);

    };

    addPartner() {
      console.log("partner email is ", this.partner.email);
      this.emitPartner.next(this.partner);
    };

};
