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
      body {
        background-image:url(/app/ui/heart-broken.jpeg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .container {
        margin-left: auto;
        margin-right: auto;
      }
      .login {
        float:left;
        margin: 10px;
        padding: 10px;
        max-width:300px;
        height: 300px;
      }
      .field {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -100px 0 0 -150px;
      }
      legend {
        font-size: 250%;
      }
    `
  ],
  template: `
    <body>
      <div class="login">
        <div>
        <form>
          <fieldset class="field">
            <legend>Login to Smitten</legend>
            <container id="container">
            <p [hidden]="loggedIn" class="submit">
            <button pButton type="button" (click)="loginUser()"
            label="Sign in with Google">
            </button>
            </p>
            <p [hidden]="!loggedIn"> Please link your partner
            <input pInputText type="text" name="login" [(ngModel)]="partner.email" value="" placeholder="Partner Email">
            </p>
            <p [hidden]="!loggedIn" class="link-partner">
            <button pButton type="button" (click)="addPartner()" label="Link partner account">
            </button>
            </p>
            </container>
          </fieldset>
        </form>
        </div>
      </div>
    </body>
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

    loginUser() {
      console.log("hit loginUser");
      this.emitLogin.next(this.user);

    };

    addPartner() {
      console.log("partner email is ", this.partner.email);
      this.emitPartner.next(this.partner);
    };

};
