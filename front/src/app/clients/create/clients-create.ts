import { Component, inject } from '@angular/core';
import { ClientForm } from '../clients.form';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../service/clients-service';

@Component({
  selector: 'app-clients-create',
  imports: [FormsModule],
  templateUrl: './clients-create.html',
  styleUrl: './clients-create.css',
})
export class ClientsCreate {
  clientService = inject(ClientsService);

  client = new ClientForm("", "", "", "", true);

  onSubmit() {
    this.clientService.addClient(this.client);
  }
}
