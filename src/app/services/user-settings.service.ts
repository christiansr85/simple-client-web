import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { User } from '../models';
import { EmployeesService } from './employees.service';

/**
 * Manages the settings of the application.
 */
@Injectable()
export class UserSettingsService {

    /**
     * Settings model object.
     */
    settings = {
        provider: '',
        language: ''
    };

    /**
     * User logged.
     */
    user: User;

    constructor(
        private employeesService: EmployeesService,
        private translate: TranslateService
    ) {
        const userStored = localStorage.getItem('currentUser');
        if (userStored) {
            this.user = JSON.parse(userStored);
            const settingsStored = localStorage.getItem('settings_' + this.user.id);
            if (settingsStored) {
                const settings = JSON.parse(settingsStored);
                this.settings = settings;
                this.applySettings();
            }
        }
    }

    /**
     * Updates the settings model object.
     * @param provider The new provider source to use.
     * @param language The new language to use.
     */
    setSettings(provider: string, language: string): void {
        // this.employeesService.setSource(provider);
        // this.translate.use(language);

        this.settings.provider = provider;
        this.settings.language = language;
        localStorage.setItem('settings_' + this.user.id, JSON.stringify(this.settings));
        this.applySettings();
    }

    /**
     * Sets the new data source provider.
     * @param provider The new data source provider to use in requests.
     */
    setDataProvider(provider: string): void {
        this.employeesService.setSource(provider);
    }

    /**
     * Gets the current data source provider.
     */
    getDataProvider(): string {
        return this.settings.provider || this.employeesService.source;
    }

    /**
     * Gets the current language used.
     */
    getLanguage(): string {
        return this.settings.language || this.translate.currentLang || this.translate.defaultLang;
    }

    /**
     * Applies the current selected configuration.
     */
    applySettings(): void {
        this.setDataProvider(this.getDataProvider());
        this.translate.use(this.getLanguage());
    }
}