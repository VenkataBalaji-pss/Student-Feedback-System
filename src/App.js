// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FeedbackForm from './Components/FeedbackForm';
import FeedbackListByCourse from './Components/FeedbackListByCourse';
import FeedbackList from './Components/FeedbackList';
import CoursesList from './Components/CoursesList';
import DeleteFeedback from './Components/DeleteFeedback';  // Import DeleteFeedback
import './App.css';  // Importing the CSS file

function App() {
  return (
    <Router>  {/* Wrap your entire app with BrowserRouter */}
      <div className="App">
        {/* Header section with background */}
        <center className="center-header">
          <h1 className="scrolling-text">Student Feedback System</h1>
        </center>

        {/* Navigation buttons */}
        <div className="button-container">
          <Link to="/feedback">
            <button className="feedback-button">Go to Feedback Form</button>
          </Link>
          <Link to="/feedbacks">
            <button className="feedback-button">View All Feedback</button>
          </Link>
          <Link to="/feedbacks/course/CS101">
            <button className="feedback-button">View Feedback</button>
          </Link>
          <Link to="/courses">
            <button className="feedback-button">View All Courses</button>  {/* New button */}
          </Link>
          <Link to="/delete-feedback">
            <button className="feedback-button">Delete Feedback</button>  {/* Button to delete feedback */}
          </Link>
        </div>

        {/* Routes for components */}
        <Routes>
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/feedbacks" element={<FeedbackList />} />
          <Route path="/feedbacks/course/:courseId" element={<FeedbackListByCourse />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/delete-feedback" element={<DeleteFeedback />} />  {/* Route for delete */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
