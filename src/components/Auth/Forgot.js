import React, { useState } from 'react';
import axios from 'axios';

function Forgot() {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  return (
    <form onSubmit={handleForgotPassword} className="max-w-md mx-auto my-10 p-5 bg-white shadow-md">
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4 w-full">Reset Password</button>
    </form>
  );
}

export default Forgot;
