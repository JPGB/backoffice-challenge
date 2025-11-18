package com.backoffice.backoffice.users;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
public class UsersController {

  @Autowired
  private UsersRepository usersRepository;

  // @GetMapping("/users")
  // public List<UsersEntity> GetAllClients() {
  // return usersRepository.findAll();
  // }

  // @SuppressWarnings("null")
  // @GetMapping("/users/{id}")
  // public Optional<UsersEntity> GetAllClients(@PathVariable Long id) {
  // return usersRepository.findById(id);
  // }

  @SuppressWarnings("null")
  @PostMapping("/users")
  public void addUser(@RequestBody UsersEntity client) {
    usersRepository.save(client);
  }

  @PutMapping("/users/{id}")
  public UsersEntity updateUser(@PathVariable Long id, @RequestBody UsersEntity userDetails) {
    @SuppressWarnings("null")
    Optional<UsersEntity> client = usersRepository.findById(id);

    if (client.isPresent()) {
      UsersEntity existingClient = client.get();
      existingClient.setUsername(userDetails.getUsername());
      existingClient.setPassword(userDetails.getPassword());
      return usersRepository.save(existingClient);
    } else {
      return null;
    }
  }

  @PostMapping("/users/login")
  public ResponseEntity<String> postMethodName(@RequestBody UsersEntity UserEntity) {
    Optional<UsersEntity> foundUser = usersRepository.findUserWithPassword(UserEntity.getUsername(),
        UserEntity.getPassword());
    if (foundUser.isPresent()) {
      return ResponseEntity.ok("{\"result\":\"ok\"}");
    } else {
      return ResponseEntity.status(401).body("{\"result\":\"invalid\"}");
    }
  }

}
