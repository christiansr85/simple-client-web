import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services';

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

    activeLang = 'en-US';

    constructor(
        public translate: TranslateService,
        private loginService: LoginService,
        private router: Router
    ) {
        this.translate.addLangs(['en-US', 'es-ES']);
        this.translate.setDefaultLang(this.activeLang);
    }

    doLogin(): void {
        this.loginService.login(this.login.user, this.login.password)
            .subscribe(
                result => {
                    this.router.navigate(['app', 'employees']);
                },
                err => {
                    console.log(err);
                }
            );
    }
}
