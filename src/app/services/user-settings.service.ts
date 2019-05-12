import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { User } from '../models';
import { EmployeesService } from './employees.service';

@Injectable()
export class UserSettingsService {

    settings = {
        provider: '',
        language: ''
    };
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
            }
        }
    }

    setSettings(provider: string, language: string): void {
        this.employeesService.setSource(provider);
        this.translate.use(language);

        this.settings.provider = provider;
        this.settings.language = language;
        localStorage.setItem('settings_' + this.user.id, JSON.stringify(this.settings));
    }

    setDataProvider(provider: string): void {
        this.employeesService.setSource(provider);
    }

    getDataProvider(): string {
        return this.settings.provider || this.employeesService.source;
    }

    getLanguage(): string {
        return this.settings.language || this.translate.currentLang || this.translate.defaultLang;
    }

    applySettings(): void {
        this.setDataProvider(this.getDataProvider());
        this.translate.use(this.getLanguage());
    }
}