import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const SignOutUser = () => {
    setLoading(true);
    return signOut(auth)
  }

  const updateUser = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('Current User', currentUser);
      if(currentUser){
        const loggedUser = {email: currentUser.email}

        fetch('http://localhost:3000/getToken', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(loggedUser),
        })
        .then(res => res.json())
        .then(data => {
          console.log('After getting token', data);
          localStorage.setItem('token', data.token)
        })
      }
      else {
        localStorage.removeItem('token');
      }
      setLoading(false);
    })

    return () => {
      unsubscribe();
    }
  }, [])
  
  const authInfo = {
    createUser, user, setUser, loading, setLoading, signInUser, signInWithGoogle, SignOutUser, updateUser
  }
  
  return (
    <div>
      <AuthContext value={authInfo}>
        {children}
      </AuthContext>
    </div>
  );
};

export default AuthProvider;