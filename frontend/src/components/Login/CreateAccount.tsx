import { Heading, Button, FormControl, FormLabel, Input, Text, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  // connectAuthEmulator,
  updateProfile,
} from 'firebase/auth';

export default function CreateAccount() {
  const auth = getAuth();
  // connectAuthEmulator(auth, 'http://localhost:9099');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

  function createAcc() {
    setIsCreating(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // so we should redirect them to somewhere useful (like the join town page) once we have that
        const user = userCredential.user;
        updateProfile(user, { displayName: displayName });
        setLoggedInUser(user);
        console.log(user);
      })
      .catch((error: Error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    setIsCreating(false);
  }

  return (
    <Box mb='2' p='4' borderWidth='1px' borderRadius='lg'>
      {(!loggedInUser && (
        <>
          <Heading>Create Account</Heading>
          <FormControl>
            <FormLabel htmlFor='displayName'>Display Name</FormLabel>
            <Input
              autoFocus
              name='displayName'
              placeholder='Display name'
              value={displayName}
              onChange={event => setDisplayName(event.target.value)}
            />
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              autoFocus
              name='email'
              placeholder='Your email'
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              autoFocus
              name='password'
              placeholder='Password'
              value={password}
              type='password'
              onChange={event => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            data-testid='joinTownByIDButton'
            onClick={() => createAcc()}
            isLoading={isCreating}
            disabled={isCreating}>
            Connect
          </Button>
        </>
      )) || (
        <Box p='4' borderWidth='1px' borderRadius='lg'>
          <Text>
            Logged in with email {loggedInUser?.email} UID: {loggedInUser?.uid}
          </Text>
        </Box>
      )}
    </Box>
  );
}
