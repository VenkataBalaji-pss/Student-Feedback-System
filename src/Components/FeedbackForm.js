import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';

function FeedbackForm() {
  const [feedback, setFeedback] = useState({
    name: '',
    feedbackText: '',
    courseId: '',
    instructorId: '',
    rating: 0,
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/feedback', feedback);
      alert('Feedback submitted successfully!');
      setFeedback({ name: '', feedbackText: '', courseId: '', instructorId: '', rating: 0, comments: '' });
    } catch (error) {
      console.error('There was an error submitting the feedback!', error);
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"><b>Name:</b></label>
          <input
            type="text"
            id="name"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedbackText"><b>Feedback:</b></label>
          <textarea
            id="feedbackText"
            name="feedbackText"
            value={feedback.feedbackText}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseId"><b>Course ID:</b></label>
          <input
            type="text"
            id="courseId"
            name="courseId"
            value={feedback.courseId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructorId"><b>Instructor ID:</b></label>
          <input
            type="text"
            id="instructorId"
            name="instructorId"
            value={feedback.instructorId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating"><b>Rating (1 to 5):</b></label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={feedback.rating}
            onChange={handleChange}
            required
            min="1"
            max="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments"><b>Comments:</b></label>
          <textarea
            id="comments"
            name="comments"
            value={feedback.comments}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>
        <button type="submit"><b>Submit Feedback</b></button>
      </form>
    </div>
  );
}

export default FeedbackForm;
