import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import '../style/SignUp.css'; // Make sure the path to your CSS file is correct

const SignUp = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    mobile: '',
    email: '',
    password: ''
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Make a POST request to the signup endpoint
      const response = await axios.post('http://localhost:4000/signup', formData);

      // Handle success (you can redirect or show a message)
      if (response.data.success) {
        alert('Sign Up Successful');
        // You can redirect the user to login or another page
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('Error during sign up');
    }
  };

  // Handle input change to update the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text' 
        name='name' 
        placeholder='Enter Your Name' 
        value={formData.name} 
        onChange={handleChange} 
      />
      <input 
        type='text' 
        name='username' 
        placeholder='Enter Username' 
        value={formData.username} 
        onChange={handleChange} 
      />
      <input 
        type='email' 
        name='email' 
        placeholder='Enter Your Email' 
        value={formData.email} 
        onChange={handleChange} 
      />
      <input 
        type='password' 
        name='password' 
        placeholder='Enter Your Password' 
        value={formData.password} 
        onChange={handleChange} 
      />
      <button type='submit'>Submit</button>
      <a href='/login' style={{ color: 'blue' }}>Login here</a>
    </form>
  );
}

export default SignUp;
