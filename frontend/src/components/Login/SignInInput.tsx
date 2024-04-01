import { Button, Heading, Input } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../classes/users/firebaseconfig';
import React, { useState } from 'react';

export default function SignInInput() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(auth.currentUser !== null);
  const [signingIn, setSigningIn] = useState(false);

  const attemptLogin = async () => {
    setSigningIn(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(auth.currentUser?.email);
        setIsSignedIn(true);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    setSigningIn(false);
  };

  const attemptSignout = async () => {
    setSigningIn(true);
    auth.signOut().then(() => {
      console.log('Signed out');
      setIsSignedIn(false);
      setEmail('');
      setPassword('');
    });
    setSigningIn(false);
  };

  return (
    <>
      {isSignedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <>
          <Heading>Sign In</Heading>
          <Input type='text' placeholder='email' onChange={event => setEmail(event.target.value)} />
          <Input
            type='password'
            placeholder='password'
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            datatype-testid='signin-button'
            onClick={attemptLogin}
            isLoading={signingIn}
            disabled={signingIn || isSignedIn}>
            Sign In
          </Button>
          {/* <Button
            datatype-testid='signout-button'
            onClick={attemptSignout}
            isLoading={signingIn}
            disabled={signingIn}>
            Sign Out
          </Button> */}
        </>
      )}
    </>
  );
}
