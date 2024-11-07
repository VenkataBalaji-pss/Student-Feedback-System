import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FeedbackForm from './Components/FeedbackForm';
import FeedbackListByCourse from './Components/FeedbackListByCourse'; // For viewing feedback by specific course (e.g., CS101)
import FeedbackList from './Components/FeedbackList'; // Import the new component to view all feedback

import './App.css'
function App() {
  return (
    <Router>
      <div className="App" >
        <center style={{backgroundColor:'lightgoldenrodyellow',marginBottom:'20px'}}>
          <h1 className="scrolling-text" >Student Feedback System</h1>
          </center>
      
          <Link to="/feedback">
            <button style={{fontSize: 15,backgroundColor: 'whitesmoke', marginRight: '15px',border: '2px solid #007bff', borderRadius: '8px', padding: '10px 20px',marginLeft:'370px'}} >Go to Feedback Form</button>
          </Link>
          <Link to="/feedbacks">
            <button style={{fontSize: 15,backgroundColor: 'whitesmoke', marginRight: '15px',border: '2px solid #007bff', borderRadius: '8px', padding: '10px 20px'}}>View All Feedback</button> 
          </Link>
          <Link to="/feedbacks/course/CS101">
            <button style={{fontSize: 15,backgroundColor: 'whitesmoke',border: '2px solid #007bff', borderRadius: '8px', padding: '10px 20px'}}>View Feedback for CS101</button> 
          </Link>
       

        <Routes>
          <Route path="/feedback" element={<FeedbackForm />} />  
          <Route path="/feedbacks" element={<FeedbackList />} />  
          <Route path="/feedbacks/course/:courseId" element={<FeedbackListByCourse />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
