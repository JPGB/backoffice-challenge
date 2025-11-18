import { Component, inject } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NavigationService } from './../core/navigation-service';

@Component({
  selector: 'app-clients',
  imports: [RouterModule],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {
  navigationService = inject(NavigationService);

  ngOnInit() {
    this.navigationService.setRouteAsActive("client")
  }
}
