import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import { deleteUser } from 'firebase/auth';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export async function ensureUserDoc() {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User is not logged in');
    }

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            likeCount: 0,
        });
    }
}

export async function deleteUserAccount() {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User is not logged in');
    }

    const uid = user.uid;

    const likesRef = collection(db, 'users', uid, 'likes');
    const userRef = doc(db, 'users', uid);

    // Delete user's likes collection
    const likesSnapshot = await getDocs(likesRef);
    const deleteLikesPromises = likesSnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deleteLikesPromises);

    // Delete user document
    await deleteDoc(userRef);

    // Delete the user account
    await deleteUser(user);
}

export const resetPassword = async (currentPassword: string, newPassword: string) => {
    const user = auth.currentUser;
    if (!user || !user.email) {
        throw new Error('No user is currently signed in');
    }

    // Re-authenticate the user before changing password
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update the password
    await updatePassword(user, newPassword);

    // Update password length in Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
        passwordLength: newPassword.length,
    });
};
