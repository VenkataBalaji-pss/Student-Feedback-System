package com.example.FeedbackSystem.Controller;

import com.example.FeedbackSystem.Entity.Feedback;
import com.example.FeedbackSystem.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return new ResponseEntity<>(savedFeedback, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @GetMapping("/course/{courseId}")
    public List<Feedback> getFeedbackByCourse(@PathVariable String courseId) {
        return feedbackRepository.findAll().stream()
                .filter(feedback -> feedback.getCourseId().equals(courseId))
                .collect(Collectors.toList());
    }

    // Controller to get distinct course IDs
    @GetMapping("/courses")
    public List<String> getAllCourses() {
        return feedbackRepository.findAll().stream()
                .map(Feedback::getCourseId)
                .distinct()
                .collect(Collectors.toList());
    }

    // DELETE endpoint to remove feedback by courseId and instructorId
    @DeleteMapping
    public ResponseEntity<String> deleteFeedback(@RequestParam String courseId, @RequestParam String instructorId) {
        Feedback feedback = feedbackRepository.findByCourseIdAndInstructorId(courseId, instructorId);

        if (feedback == null) {
            return new ResponseEntity<>("No feedback found for course ID: " + courseId + " and instructor ID: " + instructorId, HttpStatus.NOT_FOUND);
        }

        feedbackRepository.delete(feedback);
        return new ResponseEntity<>("Feedback deleted successfully for course ID: " + courseId + " and instructor ID: " + instructorId, HttpStatus.OK);
    }
}
