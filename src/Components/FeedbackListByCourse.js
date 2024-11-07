import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackListByCourse.css';  // Import the CSS for styling

function FeedbackListByCourse() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [averageRating, setAverageRating] = useState(null);
  const [mostFrequentComment, setMostFrequentComment] = useState('');

  useEffect(() => {
    // Make a GET request to fetch feedback for a specific course
    axios.get('http://localhost:8080/api/feedback/course/CS101')
      .then(response => {
        const feedbackData = response.data;
        setFeedbacks(feedbackData); // Assuming the response data is an array
        calculateStatistics(feedbackData);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the feedback:', error);
        setError('Error fetching feedback.');
        setLoading(false);
      });
  }, []);  // Empty dependency array means this runs only once when the component mounts

  // Calculate average rating and most frequent comment
  const calculateStatistics = (feedbackData) => {
    if (feedbackData.length === 0) {
      return;
    }

    // Calculate average rating
    const totalRating = feedbackData.reduce((acc, feedback) => acc + feedback.rating, 0);
    setAverageRating(totalRating / feedbackData.length);

    // Calculate most frequent comment
    const commentFrequency = {};
    feedbackData.forEach(feedback => {
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

  // If feedback is still loading
  if (loading) return <div className="loading">Loading...</div>;

  // If there was an error fetching the feedback
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="feedback-list-container">
      <h2>Feedback for Course CS101</h2>

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

      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p>No feedback available for this course.</p>
        ) : (
          feedbacks.map(feedback => (
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
