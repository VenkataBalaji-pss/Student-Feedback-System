import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackListByCourse() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios.get('http://localhost:8080/api/feedback/course/CS101')
      .then(response => {
        setFeedbacks(response.data); // Assuming the response data is an array
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the feedback:', error);
        setError('Error fetching feedback.');
        setLoading(false);
      });
  }, []); 

  
  if (loading) return <div>Loading...</div>;

  
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Feedback for Course CS101</h2>
      <ul>
        {feedbacks.length === 0 ? (
          <li>No feedback available for this course.</li>
        ) : (
          feedbacks.map(feedback => (
            <li key={feedback.id}>
              <strong>{feedback.courseId}</strong>: {feedback.comments} (Rating: {feedback.rating})
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FeedbackListByCourse;
