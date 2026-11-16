package com.demo.backend.common;

/** Throw from a service to return a 404 problem response. */
public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}
