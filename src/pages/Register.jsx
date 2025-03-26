import React, { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Register () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordChecks, setPasswordChecks] = useState({});
  const [showChecklist, setShowChecklist] = useState(false);               // used to show hints for the password when the user starts to type password
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // function to check the password for different parameters
  function getPasswordChecks(password) {
    return ({
      length: password.length >= 8,
      hasNumber: /[0-9]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    })
  }

  // function to check if the password passes in general
  function isPasswordStrong(checks) {
    return checks.length && checks.hasNumber && checks.hasUpper && checks.hasSymbol;          // returns true or false
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let checks = getPasswordChecks(password);         // returns object of results of passing requirements

    if (!isPasswordStrong(checks)) {
      setError("Password doesn't meet requirements.");
      return;
    }

    /* html approves test@example */
    if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      setError('Please enter a complete email address.');
      return;
    }

    try {
      setError('');
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setShowChecklist(false); // Hide checklist but show another (non-password) error (like email in use)
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');                  
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      {error && (                                    // Only display error if there's one; same as --> error ? <div>{error}</div> : null
        <div className='error-message'>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          {/* React reserve 'for' for for loop, so we use htmlFor */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            // When the page loads, email is empty since (useState(''))
            onChange={(e) => setEmail(e.target.value)}
            // even without onChange, the value constantly changes as the user type. 
            // Then we select that, and set it to email state
            required
            aria-label ="Enter you email"
          />
        </div>

        <div className='input-container'>
          <label htmlFor="password">Password</label>          
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={ (e) => {
                setPassword(e.target.value);
                setPasswordChecks(getPasswordChecks(e.target.value));
                if (!showChecklist) {
                  setShowChecklist(true);               // Show checklist when user starts typing
                }
            }}
            onFocus={() => { setError('') }}
            required
            aria-label ="Enter you password"
          />
          <div className='show-password'>
            <input
              type="checkbox"
              id="show-password"
              onChange={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            /> 
            <label htmlFor="show-password">Show Password</label>
          </div>            
        </div>


        { showChecklist && (  
            <ul className="password-checklist">
              <li className={passwordChecks.length ? 'check-pass' : 'check-fail' }>
                {passwordChecks.length ? '✔️' : '❌'} At least 8 characters
              </li>
              <li className={passwordChecks.hasNumber ? 'check-pass' : 'check-fail' }>
                {passwordChecks.hasNumber ? '✔️' : '❌'} Contains a number
              </li>
              <li className={passwordChecks.hasUpper ? 'check-pass' : 'check-fail' }>
                {passwordChecks.hasUpper ? '✔️' : '❌'} Contains an uppercase letter
              </li>
              <li className={passwordChecks.hasSymbol ? 'check-pass' : 'check-fail' }>
                {passwordChecks.hasSymbol ? '✔️' : '❌'} Contains a symbol
              </li>
            </ul>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  )
}