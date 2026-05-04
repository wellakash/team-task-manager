package com.taskmanager.backend.controller;

import com.taskmanager.backend.model.User;
import com.taskmanager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        // This is the line showing red. We use 'Optional' because your Repository returns it.
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Check if password matches
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        if (user.getRole() == null) {
            user.setRole("MEMBER");
        }
        return userRepository.save(user);
    }
}