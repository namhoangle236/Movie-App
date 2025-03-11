import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';


// Create context
const AuthContext = createContext();


// function to use context
export const useAuth = () => {
  return useContext(AuthContext);
};

// function to provide context
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);     // stores the currently logged-in user
  const [loading, setLoading] = useState(true);             // prevents the app from rendering before Firebase authentification is ready

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);     // Calls Firebase’s finction
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);         // Calls Firebase’s finction
  };

  const logout = () => {
    return signOut(auth);                                             // Calls Firebase’s finction
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {    // note: firebase will pass in the 'user' values behind the scene
      setCurrentUser(user);
      setLoading(false);                                        // ensures that the app doesn’t display the wrong UI before authentication is ready.
    });

    return unsubscribe;
  }, []);   // only run once when page load or on refresh

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};