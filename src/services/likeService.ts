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

export function getLikeId(poem: BasePoem): string {
    return encodeURIComponent(`${poem.title}::${poem.author}::${poem.linecount}`);
}

export function getLikeIdFromSlug(slug: string): string {
    return encodeURIComponent(slug);
}

export function getSlugFromPoem(poem: BasePoem): string {
    return `${poem.title}::${poem.author}::${poem.linecount}`;
}

export function getDateValue(
    createdAt: string | { seconds: number; nanoseconds: number } | undefined
): number {
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
}

export async function likePoem(poem: Poem) {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error('User is not logged in');
    }

    console.log('LIKING POEM', poem);

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
}

export async function unlikePoem(poem: Poem) {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error('User is not logged in');
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
}

export async function getAllLikedPoems(): Promise<Array<LikedPoem>> {
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
}

export async function poemIsLiked(poem: Poem): Promise<boolean> {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error('User is not logged in');
    }

    console.log('CHECKING IS LIKED', poem);

    const likeId = getLikeId(poem);
    const likeRef = doc(db, 'users', uid, 'likes', likeId);

    const likeSnap = await getDoc(likeRef);
    return likeSnap.exists();
}
