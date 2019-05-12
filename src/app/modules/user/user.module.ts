import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core';

import { UserComponent } from './components';

const COMPONENTS = [
  UserComponent
];

@NgModule({
  imports: [
    FormsModule,
    CoreModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
  ]
})
export class UserModule { }
