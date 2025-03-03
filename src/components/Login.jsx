import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();                      // get the login function from AuthContext.jsx
  const navigate = useNavigate();                   

  const handleSubmit = async (e) => {
    e.preventDefault();                             // prevent page refresh when submit
    try {
      setError('');
      await login(email, password);                 // pass credentials to login function, if match,
      navigate('/');                                // navigate to index page
    } catch (err) {
      setError('Failed to log in');
    }
  };

  return (
    <div>
      <h2>Login</h2>

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

// Study note:
// 'value' in '(e.target.value)' is not the same as 'value' in 'value={email}'
// e.target.value is the value to the target event, which is the key I just typed.
// this is then set to email state
// and only then, value={email} gets the new value from there

// e.target.value
// e is the event itself (the whole action happening when you type). 
// target is the HTML element that triggered the event (in this case, the input box).
// value is the actual text inside that input box at that exact moment.
// in short: "Get the value in the targeted area, where the event that is happening."