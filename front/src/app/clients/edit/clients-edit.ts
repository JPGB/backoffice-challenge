import { Component, inject, Input } from '@angular/core';
import { ClientsService } from '../service/clients-service';
import { IClient } from '../clients.types';
import { ClientForm } from '../clients.form';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-edit',
  imports: [FormsModule],
  templateUrl: './clients-edit.html',
  styleUrl: './clients-edit.css',
})
export class ClientsEdit {
  clientService = inject(ClientsService);
  router = inject(Router);

  client!: ClientForm;

  @Input() id!: number;

  ngOnInit() {
    const foundClient = this.clientService.getClientById(Number(this.id));

    if (foundClient) {
      this.client = new ClientForm(foundClient.name, foundClient.email, foundClient.identification, foundClient.agency, foundClient.active);
    }
  }

  onSubmit() {
    this.clientService.updateClientById(Number(this.id), this.client);
    this.router.navigateByUrl("/client/list");
  }
}
