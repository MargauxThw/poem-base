import { auth, db } from '../utils/firebaseConfig';
import {
    collection,
    doc,
    getDocs,
    runTransaction,
    serverTimestamp,
    query,
    orderBy,
    getDoc,
} from 'firebase/firestore';
import type { BasePoem, LikedPoem, Poem } from '../utils/types';

export const getLikeId = (poem: BasePoem): string => {
    return encodeURIComponent(`${poem.title}::${poem.author}::${poem.linecount}`);
};

export const getLikeIdFromSlug = (slug: string): string => {
    return encodeURIComponent(slug);
};

export const getSlugFromPoem = (poem: BasePoem): string => {
    return `${poem.title}::${poem.author}::${poem.linecount}`;
};

export const getDateValue = (
    createdAt: string | { seconds: number; nanoseconds: number } | undefined
): number => {
    if (!createdAt) return 0;
    if (typeof createdAt === 'string') {
        // ISO string
        return Date.parse(createdAt);
    }
    if (typeof createdAt === 'object' && 'seconds' in createdAt) {
        // Firestore Timestamp
        return createdAt.seconds * 1000 + Math.floor(createdAt.nanoseconds / 1e6);
    }
    return 0;
};

export const likePoem = async (poem: Poem) => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error('User is not logged in');
    }

    if (!auth.currentUser?.emailVerified) {
        throw new Error('Email not verified');
    }

    const userRef = doc(db, 'users', uid);
    const likeId = getLikeId(poem);
    const likeRef = doc(db, 'users', uid, 'likes', likeId);

    await runTransaction(db, async (transaction) => {
        const likeSnap = await transaction.get(likeRef);
        const userSnap = await transaction.get(userRef);

        if (!likeSnap.exists()) {
            // Add the like
            transaction.set(likeRef, {
                title: poem.title,
                author: poem.author,
                linecount: poem.linecount,
                peekLines: poem.lines.slice(0, 4),
                createdAt: serverTimestamp(),
            });

            // Increment likeCount on user doc
            const currentCount = userSnap.exists() ? userSnap.data().likeCount || 0 : 0;

            transaction.update(userRef, {
                likeCount: currentCount + 1,
            });
        }
    });

    localStorage.setItem(getSlugFromPoem(poem), JSON.stringify(poem));

    return true;
};

export const unlikePoem = async (poem: Poem) => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error('User is not logged in');
    }

    if (!auth.currentUser?.emailVerified) {
        throw new Error('Email not verified');
    }

    const userRef = doc(db, 'users', uid);
    const likeId = getLikeId(poem);
    const likeRef = doc(db, 'users', uid, 'likes', likeId);

    await runTransaction(db, async (transaction) => {
        const likeSnap = await transaction.get(likeRef);
        const userSnap = await transaction.get(userRef);

        if (likeSnap.exists()) {
            transaction.delete(likeRef);

            // Decrement likeCount on user doc
            const currentCount = userSnap.exists() ? userSnap.data().likeCount || 0 : 0;

            transaction.update(userRef, {
                likeCount: Math.max(currentCount - 1, 0), // prevent negative count
            });
        }
    });

    return true;
};

export const getAllLikedPoems = async (): Promise<Array<LikedPoem>> => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error('User is not logged in');
    }

    const likesRef = collection(db, 'users', uid, 'likes');

    // Initial order: sort by createdAt (descending = newest first)
    const q = query(likesRef, orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
        return {
            ...(doc.data() as LikedPoem),
        };
    });
};

export const poemIsLiked = async (poem: Poem): Promise<boolean> => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error('User is not logged in');
    }

    const likeId = getLikeId(poem);
    const likeRef = doc(db, 'users', uid, 'likes', likeId);

    const likeSnap = await getDoc(likeRef);
    return likeSnap.exists();
};

export const unlikeAllPoems = async () => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User is not logged in');
    }

    if (!auth.currentUser?.emailVerified) {
        throw new Error('Email not verified');
    }

    const uid = user.uid;

    const likesRef = collection(db, 'users', uid, 'likes');
    const userRef = doc(db, 'users', uid);

    const likesSnapshot = await getDocs(likesRef);

    await runTransaction(db, async (transaction) => {
        const userSnap = await transaction.get(userRef);
        let failedUnlikes = 0;

        likesSnapshot.docs.forEach((likeDoc) => {
            try {
                transaction.delete(likeDoc.ref);
            } catch {
                failedUnlikes += 1;
            }
        });

        if (userSnap.exists()) {
            transaction.update(userRef, {
                likeCount: failedUnlikes,
            });
        }
    });
};
