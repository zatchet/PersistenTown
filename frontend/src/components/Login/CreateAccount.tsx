import { getAuth, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { Heading, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function CreateAccount() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

  function createAcc() {
    setIsCreating(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // after creating the account, the user is automatically logged in,
      // so we can redirect them to somewhere useful once we have that
      const user = userCredential.user;
      setLoggedInUser(user);
    })
    .catch((error: Error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      
    });

    setIsCreating(false)
  }

  return (
      <>
      {
        (!loggedInUser && (
        <>
        <Heading>Create Account</Heading>
        <FormControl>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              autoFocus
              name='email'
              placeholder='Your email'
              value={email}
              onChange={event => setEmail(event.target.value)} />

            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              autoFocus
              name='password'
              placeholder='Password'
              value={password}
              onChange={event => setPassword(event.target.value)} />
          </FormControl>
          <Button
            data-testid='joinTownByIDButton'
            onClick={() => createAcc()}
            isLoading={isCreating}
            disabled={isCreating}>
              Connect
            </Button>
            </>)
            || <>
            <Text>Logged in as {loggedInUser?.displayName}</Text>
            </>
      )
      }
      </>
  );
}