import { computed, inject, Injectable, signal } from '@angular/core';
import { IClient } from '../clients.types';
import { ClientForm } from '../clients.form';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  showModal = signal<"edit" | "create" | undefined>(undefined);

  httpClient = inject(HttpClient);

  constructor() {
    this.getClientsRequest();
  }

  getClientsRequest() {
    this.httpClient.get<IClient[]>('http://localhost:8080/clients').subscribe((clients) => {
      this.clients.set(clients);
    });
  }

  private clients = signal<IClient[]>([]);

  getClients = computed(() => this.clients());

  getClientById(id: number) {
    return this.getClients().find((client) => client.id === id);
  }

  updateClientById(id: number, client: ClientForm) {
    this.httpClient.put<IClient[]>(`http://localhost:8080/clients/${id}`, client).subscribe(() => {
      this.getClientsRequest();
      this.showModal.set(undefined);
    });
    // this.clients.update((clients) => {

    //   const foundClient = clients.find((thisClient) => thisClient.id == id);

    //   if (foundClient) {
    //     foundClient.agency = client.agency;
    //     foundClient.email = client.email;
    //     foundClient.identification = client.identification;
    //     foundClient.active = foundClient.active;
    //     foundClient.name = client.name;
    //   }

    //   return [...clients];
    // });
  }

  toggleActive(id: number, client: ClientForm) {
    console.warn(client.active);

    console.warn({ ...client, active: !client.active });

    this.httpClient.put(`http://localhost:8080/clients/${id}`, { ...client, active: !client.active }).subscribe(() => {
      this.getClientsRequest();
    });
    // this.clients.update((clients) => {
    //   const foundClient = clients.find((thisClient) => thisClient.id == id);

    //   if (foundClient) {
    //     foundClient.active = !foundClient.active;
    //   }

    //   return [...clients];
    // });
  }

  addClient(client: ClientForm) {
    this.httpClient.post(`http://localhost:8080/clients`, client).subscribe(() => {
      this.getClientsRequest();
      this.showModal.set(undefined);

    });
    // this.clients.set([
    //   ...this.clients(),
    //   {
    //     id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    //     name: client.name,
    //     email: client.email,
    //     identification: client.identification,
    //     agency: client.agency,
    //     active: client.active,
    //   }
    // ])
  }
}
