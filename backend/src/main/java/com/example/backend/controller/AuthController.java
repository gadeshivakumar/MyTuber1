package com.example.backend.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.repository.UserRepository;

import com.example.backend.models.User;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        userRepository.save(user);
        return ResponseEntity.ok("Signup successful");
    }

    @PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
    User existingUser = userRepository.findByEmail(user.getEmail());
    if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid email or password"));
    }
    return ResponseEntity.ok(Map.of("message", "Login successful"));
}

    

}