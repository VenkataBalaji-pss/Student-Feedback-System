// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FeedbackForm from './Components/FeedbackForm';
import FeedbackListByCourse from './Components/FeedbackListByCourse'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <center>
          <h1>Student Feedback System</h1>
          <Link to="/feedback">
            <button>Go to Feedback Form</button>
          </Link>
          <Link to="/feedbacks">
            <button>View Feedback for CS101</button> 
          </Link>
        </center>
        <Routes>
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/feedbacks" element={<FeedbackListByCourse />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
