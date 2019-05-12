import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingsService } from 'src/app/services';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {

    settings: {
        provider: string,
        language: string
    } = {
        provider: 'java',
        language: 'es-ES'
    }
    dirty: boolean = false;

    constructor(
        private location: Location,
        private userSettingsSService: UserSettingsService,
        public translate: TranslateService
    ) {
        this.settings.provider = this.userSettingsSService.getDataProvider();
        this.settings.language = this.userSettingsSService.getLanguage();
    }

    goBack(): void {
        this.location.back();
    }

    apply(): void {
        this.userSettingsSService.setSettings(
            this.settings.provider,
            this.settings.language
        );
        this.dirty = false;
    }
}