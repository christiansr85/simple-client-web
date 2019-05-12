import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialog } from './components';
import { CoreModule } from './core';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { effects, metaReducers, reducerProvider, reducerToken } from './modules/employees/store';
import { LoginModule } from './modules/login/login.module';
import { WrapperViewModule } from './modules/wrapper-view/wrapper-view.module';
import { AuthenticationService, EmployeesService, UserSettingsService } from './services';

const MODULES = [
  BrowserModule,
  HttpClientModule,
  TranslateModule.forRoot(
    {
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [
          HttpClient
        ]
      }
    }
  ),
  AppRoutingModule,
  StoreModule.forRoot(reducerToken, { metaReducers }),
  EffectsModule.forRoot(effects),
  CoreModule,
  LoginModule,
  WrapperViewModule
];

const devModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25, //  Retains last 25 states
  }),
];

const importModules = !environment.production ? [MODULES, ...devModules] : MODULES;

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialog
  ],
  imports: [
    ...importModules
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    reducerProvider,
    AuthenticationService,
    EmployeesService,
    UserSettingsService
  ],
  entryComponents: [
    ConfirmDialog
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
    private settingsService: UserSettingsService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en-US', 'es-ES']);
    this.settingsService.applySettings();
  }
}
