import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/internal/operators/first';
import { AuthenticationService } from 'src/app/services';

/**
 * Login view, where user can get access to the application.
 */
@Component({
    selector: 'app-view-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: { 'class': 'app-login' }
})
export class LoginComponent implements OnInit {

    /**
     * The login's form.
     */
    loginForm: FormGroup;

    /**
     * Flag to indicate if user has tried to submit the data yet.
     */
    submitted = false;

    /**
     * Stores any possible error happened while trying to connect to server.
     */
    error = '';

    /**
     * The url we want to return after login.
     */
    returnUrl: string;

    /**
     * Default language for login.
     */
    activeLang = 'en-US';

    constructor(
        public translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) {
        this.translate.addLangs(['en-US', 'es-ES']);
        this.translate.setDefaultLang(this.activeLang);
    }

    ngOnInit(): void {
        this.authenticationService.logout();

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app/employees';
    }

    /**
     * Accessor in order to ease the access to the form controls.
     */
    get f() { return this.loginForm.controls; }

    /**
     * Method executed when user wants to do login.
     */
    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                });
    }
}
