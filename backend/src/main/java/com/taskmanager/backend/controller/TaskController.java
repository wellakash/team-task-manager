package com.taskmanager.backend.controller;

import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*") 
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // 1. DELETE: Remove a task by ID
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }

    // 2. PUT: Update a task's status to DONE (Step 2 Implementation)
    @PutMapping("/{id}/complete")
    public Task completeTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        task.setStatus("DONE");
        return taskRepository.save(task);
    }

    // 3. PUT: General update for all fields (Title, Status, ProjectName)
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        task.setTitle(taskDetails.getTitle());
        task.setStatus(taskDetails.getStatus());
        task.setProjectName(taskDetails.getProjectName());
        
        return taskRepository.save(task);
    }
}