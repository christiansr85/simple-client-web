import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

    activeLang = 'es-ES';

    constructor(public translate: TranslateService) {
        this.translate.addLangs(['en-US', 'es-ES']);
        this.translate.setDefaultLang(this.activeLang);
    }

    doLogin(): void {
        console.log(this.login);
    }
}
