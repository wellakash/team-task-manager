package com.taskmanager.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String status;
    private String projectName; 

    // New field for the timestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // This method runs automatically before the task is saved to the database
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Default Constructor (Required by JPA)
    public Task() {}

    // Parameterized Constructor
    public Task(String title, String status, String projectName) {
        this.title = title;
        this.status = status;
        this.projectName = projectName;
    }

    // Getters and Setters
    public Long getId() { 
        return id; 
    }
    
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getTitle() { 
        return title; 
    }
    
    public void setTitle(String title) { 
        this.title = title; 
    }

    public String getStatus() { 
        return status; 
    }
    
    public void setStatus(String status) { 
        this.status = status; 
    }

    public String getProjectName() { 
        return projectName; 
    }
    
    public void setProjectName(String projectName) { 
        this.projectName = projectName; 
    }

    // Getter for createdAt (No setter needed as it's automatic)
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}