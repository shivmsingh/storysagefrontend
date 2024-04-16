// Import React and useState hook
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Define the LoginForm component
const LoginForm = () => {
  // Define state variables for username, password, and token
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make the API call to authenticate user
      const response = await fetch('http://localhost:8083/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'JSESSIONID=D98B56B5FBBE444AFADEEB71EACE715C'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      // Parse the response
      const data = await response.json();

      // If the response code is 200, save the token to state
      if (data.code === 200) {
        setToken(data.message);
        localStorage.setItem('token', data.message);
        navigate("/")
      } else {
        // If there's an error, display the error message
        console.log('Error: ' + data.message);
      }
    } catch (error) {
      // If there's a network error, display an alert
      alert('Network error: Unable to fetch data.');
    }
  };

  // JSX for the login form
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

// Export the LoginForm component
export default LoginForm;
