import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faDoorOpen, faMoneyCheckDollar, faPiggyBank, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from './navigation-service';
import { AuthService } from './../login/auth-service';

@Component({
  selector: 'app-core',
  imports: [RouterOutlet, RouterModule, FaIconComponent,],
  templateUrl: './core.html',
  styleUrl: './core.css',
})
export class Core {
  navigationService = inject(NavigationService);
  authService = inject(AuthService);

  icons = {
    solid: {
      piggyBank: faPiggyBank,
      users: faUsers,
      moneyCheckDollar: faMoneyCheckDollar,
      doorOpen: faDoorOpen
    }
  }

  navigationItems = this.navigationService.getRoutes;

  logoff() {
    this.authService.logout();
  }
}
