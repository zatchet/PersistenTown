import {
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../classes/users/firebaseconfig';

type CreateAccountProps = {
  updateDisplayName: (newName: string) => void;
};

export default function CreateAccount({ updateDisplayName }: CreateAccountProps) {
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);
  const toast = useToast();

  function extractErrorMsg(error: Error) {
    const firebaseLength = 'Firebase: '.length;
    return error.message.substring(firebaseLength, error.message.length - 1);
  }

  function errorToStr(error: Error) {
    if (error.message.startsWith('Firebase: Error (auth/email-already-in-use)')) {
      return 'Email address is already in use. Please use a different email address.';
    } else if (
      error.message.startsWith(
        'Firebase: Password should be at least 6 characters (auth/weak-password)',
      )
    ) {
      return 'Password must be at least 6 characters.';
    } else {
      return extractErrorMsg(error);
    }
  }

  function resetForm() {
    setDisplayName(undefined);
    setEmail(undefined);
    setPassword(undefined);
    setIsCreating(false);
  }

  async function createAcc() {
    setIsCreating(true);
    if (
      displayName === undefined ||
      displayName === '' ||
      email === undefined ||
      email === '' ||
      password === undefined ||
      password === ''
    ) {
      console.log('displayname: ', displayName);
      console.log('email: ', email);
      console.log('password: ', password);
      resetForm();
      toast({
        title: 'Error creating account',
        description: 'All fields are required.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      console.log('displayname: ', displayName);
      updateDisplayName(displayName);
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast({
            title: 'Account created',
            description: 'Enjoy Covey.Town!',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error: Error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          resetForm();
          toast({
            title: 'Error creating account',
            description: errorToStr(error),
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    }
  }

  const formFilled = displayName !== '' && email !== '' && password != '';

  return (
    <Box mb='2' p='4' borderWidth='1px' borderRadius='lg'>
      <>
        <Heading>Create Account</Heading>
        <FormControl isRequired isInvalid={!formFilled}>
          <FormLabel htmlFor='displayName'>Display Name</FormLabel>
          <Input
            autoFocus
            name='displayName'
            placeholder='Display name'
            value={displayName}
            isRequired={true}
            onChange={event => setDisplayName(event.target.value)}
          />
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            autoFocus
            name='email'
            placeholder='Your email'
            value={email}
            type='email'
            isRequired={true}
            onChange={event => setEmail(event.target.value)}
          />
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            autoFocus
            name='password'
            placeholder='Password'
            value={password}
            type='password'
            isRequired={true}
            onChange={event => setPassword(event.target.value)}
          />
          {!formFilled && <FormErrorMessage>All fields are required.</FormErrorMessage>}
        </FormControl>
        <Button
          data-testid='createAccountButton'
          onClick={() => createAcc()}
          isLoading={isCreating}
          disabled={isCreating}>
          Create Account
        </Button>
      </>
    </Box>
  );
}
