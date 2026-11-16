package com.demo.backend.todo;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.demo.backend.common.NotFoundException;
import com.demo.backend.todo.TodoDtos.CreateTodoRequest;
import com.demo.backend.todo.TodoDtos.TodoResponse;
import com.demo.backend.todo.TodoDtos.UpdateTodoRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoService {

    private final TodoRepository repository;

    public List<TodoResponse> findAll() {
        return repository.findAllByOrderByCreatedAtAscIdAsc().stream().map(TodoResponse::from).toList();
    }

    public TodoResponse findById(Long id) {
        return TodoResponse.from(getOrThrow(id));
    }

    @Transactional
    public TodoResponse create(CreateTodoRequest request) {
        return TodoResponse.from(repository.save(new Todo(request.title().strip())));
    }

    @Transactional
    public TodoResponse update(Long id, UpdateTodoRequest request) {
        Todo todo = getOrThrow(id);
        if (request.title() != null) {
            todo.setTitle(request.title().strip());
        }
        if (request.completed() != null) {
            todo.setCompleted(request.completed());
        }
        return TodoResponse.from(todo);
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(getOrThrow(id));
    }

    private Todo getOrThrow(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Todo " + id + " not found"));
    }
}
