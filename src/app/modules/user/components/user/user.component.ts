import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/internal/operators/filter';
import { pairwise } from 'rxjs/operators';
import { UserSettingsService } from 'src/app/services';
import { Subscription } from 'rxjs/internal/Subscription';

/**
 * User's preferences view. Here we can change the language and the data provider.
 */
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnDestroy {

    /**
     * Local setings model object.
     */
    settings: {
        provider: string,
        language: string
    } = {
            provider: 'java',
            language: 'es-ES'
        }

    /**
     * Flag to know when the user has modified the settings.
     */
    dirty: boolean = false;

    /**
     * If previous url is the login page, then we try to avoid to go back to it.
     */
    private previousUrlIsLogin: boolean = true;

    private subscription: Subscription = new Subscription();

    constructor(
        private location: Location,
        private router: Router,
        private userSettingsSService: UserSettingsService,
        public translate: TranslateService
    ) {
        this.settings.provider = this.userSettingsSService.getDataProvider();
        this.settings.language = this.userSettingsSService.getLanguage();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * Returns to the previous url. If the previous one is the login page, then we redirect to the employees' view list.
     */
    goBack(): void {
        if (this.previousUrlIsLogin) {
            this.router.navigate(['app', 'employees']);
        } else {
            this.location.back();
        }
    }

    /**
     * Applies the current settings.
     */
    apply(): void {
        this.userSettingsSService.setSettings(
            this.settings.provider,
            this.settings.language
        );
        this.dirty = false;
    }
}