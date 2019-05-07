import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/internal/operators/first';
import { AuthenticationService } from 'src/app/services';

@Component({
    selector: 'app-view-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: { 'class': 'app-login' }
})
export class LoginComponent implements OnInit {

    login: {
        email?: string,
        password?: string
    } = {};

    loading = false;
    error = '';
    returnUrl: string;
    activeLang = 'en-US';

    constructor(
        public translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.translate.addLangs(['en-US', 'es-ES']);
        this.translate.setDefaultLang(this.activeLang);
    }

    ngOnInit(): void {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    doLogin(): void {
        this.loading = true;
        this.authenticationService.login(this.login.email, this.login.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });

    }
}
