// imports the firebase config file at project root
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { db } from './firebaseconfig';
import GameResult from './GameResult';

/**
 * Retrieves a user's game history from the firestore db.
 * @param userId the user's id
 * @returns the user's game history
 */
export default async function getGameHistory(userId: string): Promise<GameResult[]> {
  // retrieves a user's game history from the firestore db
  const querySnapshot = await getDocs(collection(db, 'GameHistory'));
  const userDoc = querySnapshot.docs;
  return querySnapshot.docs
    .filter(doc => doc.id === userId)?.[0]
    ?.data()
    .Results?.map(
      (doc: DocumentData) =>
        new GameResult(doc.GameType, doc.Date, doc.GamePlayers, doc.GameWinner),
    );
}
