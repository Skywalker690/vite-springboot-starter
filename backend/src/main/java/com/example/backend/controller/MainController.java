package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.example.backend.Message;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @GetMapping("/hello")
    public Message sayHello() {
        return new Message("Hello from Spring Boot as JSON!");
    }
}
