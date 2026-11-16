package com.demo.backend.todo;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.backend.todo.TodoDtos.CreateTodoRequest;
import com.demo.backend.todo.TodoDtos.TodoResponse;
import com.demo.backend.todo.TodoDtos.UpdateTodoRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/** Example CRUD resource. Copy this package as a template for your own features. */
@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService service;

    @GetMapping
    public List<TodoResponse> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public TodoResponse get(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<TodoResponse> create(@Valid @RequestBody CreateTodoRequest request) {
        TodoResponse created = service.create(request);
        return ResponseEntity.created(URI.create("/api/todos/" + created.id())).body(created);
    }

    @PatchMapping("/{id}")
    public TodoResponse update(@PathVariable Long id, @Valid @RequestBody UpdateTodoRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
