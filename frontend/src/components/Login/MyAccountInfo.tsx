import { Button, Heading, Avatar, HStack, Text, Divider } from '@chakra-ui/react';
import { onAuthStateChanged, User, signOut, onIdTokenChanged } from 'firebase/auth';
import { auth } from '../../classes/users/firebaseconfig';
import React, { useState, useEffect, useMemo } from 'react';
import GameResult from '../../classes/users/GameResult';
import getGameHistory from '../../classes/users/gameHistoryService';
import GameHistoryTable from './GameHistoryTable';
import GameStats from './GameStats';

export default function MyAccountInfo() {
  const [isSignedIn, setIsSignedIn] = useState(auth.currentUser !== null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  //const userInfo = auth.currentUser;
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [displayName, setDisplayName] = useState<string>('');

  const getHistory = async (userId: string) => {
    setGameHistory(await getGameHistory(userId));
  };
  // const isSignedIn = auth.currentUser !== null;

  useEffect(() => {
    if (isSignedIn && userInfo) {
      getHistory(userInfo.uid);
    }
  }, [isSignedIn, userInfo]);

  async function getDispName() {
    console.log('getting disp name');
    console.log('refreshed user');
    return auth.currentUser?.displayName || auth.currentUser?.email || '';
  }

  onAuthStateChanged(auth, user => {
    console.log('in profile on auth state changed');
    if (user) {
      setIsSignedIn(true);
      setUserInfo(user);
      console.log('user disp name:');
      console.log(user.displayName);
      setDisplayName(user.displayName || '');
    } else {
      setIsSignedIn(false);
    }
  });

  useMemo(() => {
    auth.currentUser?.reload();
    onIdTokenChanged(auth, async fbuser => {
      if (fbuser) {
        console.log('in id token changed');
        const dispName = await getDispName();
        console.log(dispName);
        setDisplayName(await getDispName());
        console.log('updated name');
      } else {
        console.log('not updating');
        setDisplayName('');
      }
    });
  }, []);

  return (
    <>
      <Heading size={'md'}>My Account Information</Heading>
      <br />
      {isSignedIn && userInfo && auth.currentUser !== null ? (
        <>
          <HStack>
            <Avatar name={displayName} />
            {/* userInfo.displayName */}
            <Text fontSize='3xl'>{displayName}</Text>
          </HStack>
          <br />
          <Text fontSize='sm'>Email: {userInfo.email}</Text>
          <br />
          <Divider borderWidth='2px' />
          <br />
          {gameHistory && (
            <>
              <GameStats gameHistory={gameHistory} />
              <br />
              <Divider borderWidth='2px' />
              <br />
              <GameHistoryTable gameHistory={gameHistory} />
            </>
          )}
          {!gameHistory && (
            <>
              <Text>No game history yet.</Text>
              <br />
            </>
          )}
          <Button
            datatype-testid='signin-button'
            onClick={() => signOut(auth)}
            isLoading={false}
            disabled={false}>
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Text>Sign in to see account information</Text>
        </>
      )}
    </>
  );
}
