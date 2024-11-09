import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackList.css'; // Import the CSS for styling

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch all feedback
    axios.get('http://localhost:8080/api/feedback')
      .then(response => {
        setFeedbacks(response.data); // Assuming the response data is an array
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the feedback:', error);
        setError('Error fetching feedback.');
        setLoading(false);
      });
  }, []);  // Empty dependency array means this runs only once when the component mounts

  // If feedback is still loading
  if (loading) return <div className="loading">Loading...</div>;

  // If there was an error fetching the feedback
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="feedback-list-container">
      <h2>All Feedbacks</h2>
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          feedbacks.map(feedback => (
            <div className="feedback-item" key={feedback.id}>
              <div className="feedback-header">
                <strong>Course ID:</strong> {feedback.courseId}
              </div>
              <div className="feedback-details">
                <strong>Instructor ID:</strong> {feedback.instructorId}
              </div>
              <div className="feedback-details">
                <strong>Rating:</strong>
                {/* Rating as dropdown */}
                <select value={feedback.rating} disabled>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
              <div className="feedback-details">
                <strong>Comments:</strong> {feedback.comments}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeedbackList;
