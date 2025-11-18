package com.backoffice.backoffice.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsersRepository extends JpaRepository<UsersEntity, Long> {

  @Query(value = "SELECT * FROM USERS_ENTITY WHERE username = ?1 AND password = ?2", nativeQuery = true)
  Optional<UsersEntity> findUserWithPassword(String username, String password);
}
