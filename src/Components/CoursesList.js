import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoursesList.css';  // Your styling

function CoursesList() {
  const [courses, setCourses] = useState([]); // State to store the list of course IDs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the list of distinct course IDs from the backend
    axios.get('http://localhost:8080/api/feedback/courses')
      .then(response => {
        console.log(response.data);  // Log the course IDs returned from the backend
        setCourses(response.data);   // Set the course IDs in state
        setLoading(false);            // Stop loading
      })
      .catch(error => {
        console.error('There was an error fetching the courses:', error);
        setError('Error fetching courses.'); // Set error message
        setLoading(false);                // Stop loading even on error
      });
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  if (loading) return <div className="loading">Loading courses...</div>; // Show loading message while fetching
  if (error) return <div className="error">{error}</div>; // Show error message if fetch fails

  return (
    <div className="courses-list-container" style={{marginLeft:'200px'}}>
      <h2>All Courses</h2>
      <div className="courses-list">
        {courses.length === 0 ? (
          <p>No courses available.</p>  // If no course IDs were returned
        ) : (
          courses.map(courseId => (
            <div className="course-item" key={courseId}>
              <div className="course-header">
                <strong>Course ID:</strong> {courseId}  {/* Display each courseId */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CoursesList;
