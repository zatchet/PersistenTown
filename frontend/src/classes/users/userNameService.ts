import { getDoc, doc, DocumentSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebaseconfig';

const COLLECTION = 'Usernames';

// checks if a username exists in the firestore db
export async function userNameExists(username: string): Promise<boolean> {
  const docSnap: DocumentSnapshot = await getDoc(doc(db, COLLECTION, username));
  return docSnap.exists();
}

// adds a username to the firestore db
export async function addUsernameIfNotPresent(username: string, uid: string): Promise<void> {
  if (await userNameExists(username)) {
    throw new Error('non-unique username');
  }
  const docRef = doc(db, COLLECTION, username);
  await setDoc(docRef, {
    uid: uid,
  });
}
