import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-wrapper-view',
  templateUrl: './wrapper-view.component.html',
  styleUrls: ['./wrapper-view.component.scss']
})
export class WrapperViewComponent {
  constructor(
    private authenticationService: AuthenticationService,
    public router: Router,
    public translate: TranslateService
    ) {}

    doLogout(): void {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}
