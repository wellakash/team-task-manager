package com.taskmanager.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable for development
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()) // Allow all for demo
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin())); // FIXES THE BLANK SCREEN
            
        return http.build();
    }
}