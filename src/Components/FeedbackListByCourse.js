import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackListByCourse.css';  // Import the CSS for styling

function FeedbackListByCourse() {
  const [courseId, setCourseId] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [mostFrequentComment, setMostFrequentComment] = useState('');

  // Handle change in course ID input
  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };

  // Fetch feedback based on course ID
  const fetchFeedback = () => {
    setLoading(true);
    setError(null);
    setFeedbacks([]);
    setAverageRating(null);
    setMostFrequentComment('');

    // Fetch feedback from API
    axios
      .get(`http://localhost:8080/api/feedback/course/${courseId}`)
      .then((response) => {
        const feedbackData = response.data;
        setFeedbacks(feedbackData); // Update the feedback list
        calculateStatistics(feedbackData); // Calculate average rating and frequent comment
        setLoading(false);
      })
      .catch((err) => {
        console.error("There was an error fetching the feedback:", err);
        setError("Error fetching feedback.");
        setLoading(false);
      });
  };

  // Calculate the average rating and most frequent comment
  const calculateStatistics = (feedbackData) => {
    if (feedbackData.length === 0) return;

    const totalRating = feedbackData.reduce((acc, feedback) => acc + feedback.rating, 0);
    setAverageRating(totalRating / feedbackData.length);

    const commentFrequency = {};
    feedbackData.forEach((feedback) => {
      const comment = feedback.comments.trim();
      commentFrequency[comment] = (commentFrequency[comment] || 0) + 1;
    });

    let mostFrequent = '';
    let maxCount = 0;
    for (let comment in commentFrequency) {
      if (commentFrequency[comment] > maxCount) {
        maxCount = commentFrequency[comment];
        mostFrequent = comment;
      }
    }
    setMostFrequentComment(mostFrequent);
  };

  // Show loading message
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Show error message
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="feedback-list-container">
      <h2 style={{ backgroundColor: 'lightgoldenrodyellow' }}>
        Enter Course ID to View Feedback
      </h2>

      {/* Input field and button */}
      <div className="feedback-input-container">
        <input
          type="text"
          value={courseId}
          onChange={handleCourseIdChange}
          placeholder="Enter Course ID (e.g., CS101 or CS101-Java)"
        />
        <button onClick={fetchFeedback} style={{marginTop:'0px'}}>View Feedback</button>
      </div>

      {/* Display Average Rating */}
      {averageRating !== null && (
        <div className="average-rating">
          <strong>Average Rating:</strong> {averageRating.toFixed(2)}
        </div>
      )}

      {/* Display Most Frequent Comment */}
      {mostFrequentComment && (
        <div className="most-frequent-comment">
          <strong>Most Frequent Comment:</strong> "{mostFrequentComment}"
        </div>
      )}

      {/* Feedback List */}
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p>No feedback available for this course.</p>
        ) : (
          feedbacks.map((feedback) => (
            <div className="feedback-item" key={feedback.id}>
              <div className="feedback-header">
                <strong>Course ID:</strong> {feedback.courseId}
              </div>
              <div className="feedback-instructor">
                <strong>Instructor ID:</strong> {feedback.instructorId}
              </div>
              <div className="feedback-comment">
                <strong>Comments:</strong> {feedback.comments}
              </div>
              <div className="feedback-rating">
                <strong>Rating:</strong> {feedback.rating}
              </div>

              {/* Add feedback provided by (Instructor's or user’s feedback) */}
              {feedback.feedback && (
                <div className="feedback-text">
                  <strong>Feedback:</strong> {feedback.feedback}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeedbackListByCourse;
