import { Button, Heading, Input } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../classes/users/firebaseconfig';
import React, { useState } from 'react';

export default function SignInInput() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  function attemptLogin() {
    setSigningIn(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        setIsSignedIn(true);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    setSigningIn(false);
  }

  // absolutely horrendous signin form - will polish once it has a more permanent home ie. not in the town selection screen
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
            onClick={() => attemptLogin()}
            isLoading={signingIn}
            disabled={signingIn || isSignedIn}>
            Sign In
          </Button>
        </>
      )}
    </>
  );
}
