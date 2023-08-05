import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/LoginForm.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Perform form validation here (e.g., check if passwords match)
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    const form = {
      username,
      email,
      password,
    }

    // Make a POST request to save the user data to db.json
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => console.log(data))

    alert('User created successfully!');
    navigate('/login'); // Navigate to the login page after successful sign up
  };

  return (
    <div className="login-form">
         <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link> </li>
              <li>
                <Link to="/login">Login</Link> 
              </li>
              <li>
                <Link to="/signup">Sign Up</Link> 
              </li>
              <li>
                <Link to="/forgot-password">Forgot Password</Link> 
              </li>
            </ul>
          </nav>
        </header>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link> 
      </p>
    </div>
  );
};

export default SignUpForm;