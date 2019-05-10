import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialog } from './components';
import { CoreModule } from './core';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { LoginModule } from './modules/login/login.module';
import { WrapperViewModule } from './modules/wrapper-view/wrapper-view.module';
import { AuthenticationService, EmployeesService } from './services';

const MODULES = [
  LoginModule,
  WrapperViewModule
];

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialog
  ],
  imports: [
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
    CoreModule,
    ...MODULES
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    EmployeesService
  ],
  entryComponents: [
    ConfirmDialog
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  activeLang = 'es-ES';
  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en-US', 'es-ES']);
    this.translate.setDefaultLang(this.activeLang);
  }
}
