import { Component, computed, effect, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faSquare, faSquareCheck, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { ClientsService } from '../service/clients-service'
import { ClientsEdit } from "../edit/clients-edit";
import { ClientsCreate } from "../create/clients-create";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-list',
  imports: [FontAwesomeModule, ClientsEdit, ClientsCreate, FormsModule],
  templateUrl: './clientsList.html',
  styleUrl: './clientsList.css',
})
export class ClientsList {
  clientsService = inject(ClientsService);

  searchValue = signal("");

  icons = {
    regular: {
      user: faUser,
      square: faSquare,
      squareCheck: faSquareCheck,
      penToSquare: faPenToSquare,
      trashCan: faTrashCan,
    },
    solid: {
      userPlus: faUserPlus,
      ban: faBan,
    }
  }

  filteredClients = computed(() => {
    const searchValue = this.searchValue().trim().toLowerCase();
    // const activeFilter = this.filters().active;

    if (searchValue) {
      return this.clientsService.getClients().filter(({ agency, email, identification, name, active }) =>
      (agency.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue) ||
        identification.toLowerCase().includes(searchValue) ||
        name.toLowerCase().includes(searchValue))
        // && active == activeFilter
      )
    }
    else {
      return this.clientsService.getClients()
      // .filter(({ active }) => active === activeFilter);
    }

  })


  selectedId!: number;

  filters = signal({
    active: true
  });

  showModal = this.clientsService.showModal;

  toggleActiveClient(id: number) {
    this.clientsService.toggleActive(id, this.clientsService.getClientById(id)!);
  }

  toggleActiveFilter() {
    this.filters.update((filter) => {
      filter.active = !filter.active;
      return { ...filter };
    })
  }

  setModalSignal(modal: "edit" | "create" | undefined) {
    this.showModal.set(modal);
  }
}
