import { Heading, Button, FormControl, FormLabel, Input, Box, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, User, updateProfile } from 'firebase/auth';
import { auth } from '../../classes/users/firebaseconfig';

export default function CreateAccount() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
  const toast = useToast();

  function extractErrorMsg(error: Error) {
    const firebaseLength = 'Firebase: '.length;
    return error.message.substring(firebaseLength, error.message.length - 1);
  }

  function resetForm() {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setIsCreating(false);
  }

  function createAcc() {
    setIsCreating(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        updateProfile(user, { displayName: displayName });
        setLoggedInUser(user);
        console.log(user);
      })
      .catch((error: Error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        resetForm();
        toast({
          title: 'Error creating account',
          description: extractErrorMsg(error),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Box mb='2' p='4' borderWidth='1px' borderRadius='lg'>
      {!loggedInUser && (
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
      )}
    </Box>
  );
}
