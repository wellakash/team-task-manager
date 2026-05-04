package com.taskmanager.backend.repository;

import com.taskmanager.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; // Added this import

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // We change 'User' to 'Optional<User>' so the Controller can handle missing users safely
    Optional<User> findByUsername(String username);
}