import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-route.module';
import { LoginComponent } from './login.component';
import { CoreModule } from 'src/app/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    FormsModule,
    CoreModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
