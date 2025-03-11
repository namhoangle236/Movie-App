import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Register () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {error && (                                    // Only display error if there's one; same as --> error ? <div>{error}</div> : null
        <div style={{ color: 'red' }}>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          {/* React reserve 'for' for for loop, so we use htmlFor */}
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            value={email}
            // When the page loads, email is empty since (useState(''))
            onChange={(e) => setEmail(e.target.value)}
            // even without onChange, the value constantly change as the user type. 
            // Then we select that, and set it to email state
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}