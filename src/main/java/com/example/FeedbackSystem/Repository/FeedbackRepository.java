package com.example.FeedbackSystem.Repository;

import com.example.FeedbackSystem.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Feedback findByCourseIdAndInstructorId(String courseId, String instructorId);
}
