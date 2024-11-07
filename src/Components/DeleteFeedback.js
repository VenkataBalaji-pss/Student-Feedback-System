import React, { useState } from 'react';
import axios from 'axios';
import './DeleteFeedback.css'; // Include your styles

const DeleteFeedback = () => {
  const [courseId, setCourseId] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteFeedback = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/api/feedback', {
        params: {
          courseId: courseId,
          instructorId: instructorId,
        },
      });
      setMessage({
        text: response.data,
        type: 'success',
      });
    } catch (error) {
      setMessage({
        text: error.response?.data || 'Something went wrong!',
        type: 'error',
      });
    }
  };

  return (
    <div className="delete-feedback-container">
      <h2>Delete Feedback</h2>
      <div className="delete-input-container">
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instructor ID"
          value={instructorId}
          onChange={(e) => setInstructorId(e.target.value)}
        />
        <button onClick={handleDeleteFeedback}>Delete Feedback</button>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default DeleteFeedback;
