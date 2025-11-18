import { Routes } from '@angular/router';
import { Core } from './core/core';
import { ClientsList } from './clients/list/clientsList';
import { Clients } from './clients/clients';
// import { PaymentProcessing } from './payment-processing/payment-processing';
// import { PaymentProcessinglist } from './payment-processing/list/payment-processinglist';
import { authGuard } from './login/auth-guard';
import { Login } from './login/login';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: "login",
    component: Login
  },
  {
    path: "",
    component: Core,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        redirectTo: "client/list",
        pathMatch: "full"
      },
      {
        path: "client",
        component: Clients,
        children: [
          {
            path: "",
            redirectTo: "client/list",
            pathMatch: "full"
          },
          {
            path: "list",
            component: ClientsList,
          },
        ]
      },
      // {
      //   path: "payment",
      //   component: PaymentProcessing,
      //   children: [
      //     {
      //       path: "list",
      //       component: PaymentProcessinglist,
      //     },
      //   ]
      // }
    ]
  },
  {
    path: '**',
    component: NotFound
  }
];
