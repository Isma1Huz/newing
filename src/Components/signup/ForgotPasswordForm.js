import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgotten password form submission here (e.g., API call)
    console.log('Forgotten password form submitted');
  };
  function handleClick(){
    alert("A login link sent to your email")
  }
  return (
    <div className="forgot-password-form">
         <Link to="/login"><button className='Back-button'>
        Login
      </button></Link>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleClick}>Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
