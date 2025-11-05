package com.thegoddo.noteM.services;

import com.thegoddo.noteM.dto.LoginRequest;
import com.thegoddo.noteM.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

        private final AuthenticationManager authenticationManager;
        private final JwtUtil jwtUtil;

        @Autowired
        public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
            this.authenticationManager = authenticationManager;
            this.jwtUtil = jwtUtil;
        }

        public String authenticateAndGenerateToken(LoginRequest request) throws AuthenticationException {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            if (authentication.isAuthenticated()) {
                return jwtUtil.generateToken(request.getEmail());
            } else {
                throw new RuntimeException("Authentication failed");
            }

        }
}
