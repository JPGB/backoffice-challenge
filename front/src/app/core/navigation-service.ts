import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { faMoneyCheckDollar, faUsers } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private routes = signal([
    {
      id: "client",
      routerLink: "client/list",
      text: "Clients",
      icon: faUsers,
      active: false
    },
    // {
    //   id: "payment",
    //   routerLink: "payment/list",
    //   text: "Payment processing",
    //   icon: faMoneyCheckDollar,
    //   active: false
    // }
  ])

  getRoutes = computed(() => this.routes())

  setRouteAsActive(id: string) {
    this.routes.update((routes) => {
      routes = routes.map(route => {
        route.active = route.id === id;
        return route
      })
      return routes;
    })
  }
}
