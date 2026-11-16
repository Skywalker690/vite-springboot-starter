package com.demo.backend.todo;

import java.time.Instant;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/** Request/response shapes for the todo API. Entities are never exposed directly. */
public final class TodoDtos {

    private TodoDtos() {}

    public record CreateTodoRequest(@NotBlank @Size(max = 200) String title) {}

    /** Partial update: null fields are left unchanged. */
    public record UpdateTodoRequest(
            @Size(max = 200) @Pattern(regexp = ".*\\S.*", message = "must not be blank") String title,
            Boolean completed) {}

    public record TodoResponse(Long id, String title, boolean completed, Instant createdAt) {

        static TodoResponse from(Todo todo) {
            return new TodoResponse(todo.getId(), todo.getTitle(), todo.isCompleted(), todo.getCreatedAt());
        }
    }
}
