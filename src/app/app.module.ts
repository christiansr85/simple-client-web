import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { LoginModule } from './modules/login/login.module';
import { WrapperViewModule } from './modules/wrapper-view/wrapper-view.module';
import { EmployeesService, LoginService } from './services';

const MODULES = [
  LoginModule,
  WrapperViewModule
];

@NgModule({
  declarations: [
    AppComponent
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
          deps: [HttpClient]
        }
      }
    ),
    AppRoutingModule,
    CoreModule,
    ...MODULES
  ],
  providers: [LoginService, EmployeesService],
  bootstrap: [AppComponent]
})
export class AppModule {
  activeLang = 'es-ES';
  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en-US', 'es-ES']);
    this.translate.setDefaultLang(this.activeLang);
  }
}
