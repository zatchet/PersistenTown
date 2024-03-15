// imports the firebase config file at project root
import { collection, getDocs } from 'firebase/firestore';
// eslint-disable-next-line import/no-relative-packages
import { db } from '../firebaseconfig';

export default class UserService {
  public static async getGameHistory(userId: string): Promise<any> {
    // retrieves a user's game history from the firestore db
    const querySnapshot = await getDocs(collection(db, 'GameHistory'));
    return querySnapshot.docs.filter(doc => doc.id === userId)?.[0]?.data();
  }
}
