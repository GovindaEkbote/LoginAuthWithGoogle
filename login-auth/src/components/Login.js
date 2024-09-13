import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import '../style/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., call an API to log the user in)
    console.log('Login submitted:', { email, password });

    // Simulate successful login and redirect to home page
    // Replace this with actual API call and check for success
    navigate('/');  // Redirect to home page after successful login
  };

  const loginWithGoogle = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type='email' 
          placeholder='Enter Your Email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type='password' 
          placeholder='Enter Your Password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type='submit' id='btn' style={{ margin: '10px 0' }}>Submit</button>

        <div className="label-link-container">
          <label>If Not Create an Account</label>
          <a href='/signup' style={{ color: 'blue' }}>Signup</a>
        </div>

        <button 
          type="button" 
          onClick={loginWithGoogle} 
          style={{ backgroundColor: "blue", color: "white", padding: "10px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}
        >
          Login With Google
        </button>
      </form>
    </>
  );
};

export default Login;
