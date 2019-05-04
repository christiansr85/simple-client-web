import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'app-login' }
})
export class LoginComponent {

    login: {
        user?: string,
        password?: string
    } = {};

    doLogin(): void {
        console.log(this.login);
    }
}
