package com.thegoddo.noteM.controller;

import com.thegoddo.noteM.dto.LoginRequest;
import com.thegoddo.noteM.entity.User;
import com.thegoddo.noteM.services.AuthService;
import com.thegoddo.noteM.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    @Autowired
    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            String jwt = authService.authenticateAndGenerateToken(loginRequest);
            return ResponseEntity.ok(jwt);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials or account not verified.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.registerNewUser(user);
        return ResponseEntity.ok("Registration successful. Please check your email for verification.");
    }
}
