package com.demo.backend.hello;

import java.time.Instant;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hello")
public class HelloController {

    public record HelloResponse(String message, Instant timestamp) {}

    @GetMapping
    public HelloResponse hello() {
        return new HelloResponse("Hello from Spring Boot!", Instant.now());
    }
}
