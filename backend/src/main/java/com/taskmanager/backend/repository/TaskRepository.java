package com.taskmanager.backend.repository;

import com.taskmanager.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // This interface now has all SQL methods like save(), findById(), and delete()
}