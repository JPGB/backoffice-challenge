package com.backoffice.backoffice.clients;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*")
public class ClientsController {

  @Autowired
  private ClientsRepository clientsRepository;

  @GetMapping("/clients")
  public List<ClientEntity> GetAllClients() {
    return clientsRepository.findAll();
  }

  @SuppressWarnings("null")
  @GetMapping("/clients/{id}")
  public Optional<ClientEntity> GetAllClients(@PathVariable Long id) {
    return clientsRepository.findById(id);
  }

  @SuppressWarnings("null")
  @PostMapping("/clients")
  public void addUser(@RequestBody ClientEntity client) {
    clientsRepository.save(client);
  }

  @PutMapping("/clients/{id}")
  public ClientEntity updateUser(@PathVariable Long id, @RequestBody ClientEntity userDetails) {
    @SuppressWarnings("null")
    Optional<ClientEntity> client = clientsRepository.findById(id);

    if (client.isPresent()) {
      ClientEntity existingClient = client.get();
      existingClient.setName(userDetails.getName());
      existingClient.setEmail(userDetails.getEmail());
      existingClient.setIdentification(userDetails.getIdentification());
      existingClient.setAgency(userDetails.getAgency());
      existingClient.setActive(userDetails.isActive());
      return clientsRepository.save(existingClient);
    } else {
      return null;
    }
  }
}
