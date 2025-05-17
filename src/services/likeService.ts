import { auth, db } from "../utils/firebaseConfig"
import {
	collection,
	doc,
	getDocs,
	runTransaction,
	serverTimestamp,
	query,
	orderBy,
    getDoc
} from "firebase/firestore"
import type { LikedPoem, Poem } from "../utils/types"

function getLikeId(poem: Poem): string {
	return encodeURIComponent(`${poem.title}::${poem.author}::${poem.numLines}`)
}

export async function likePoem(poem: Poem) {
	const uid = auth.currentUser?.uid
	if (!uid) {
		throw new Error("User is not logged in")
	}

	const userRef = doc(db, "users", uid)
	const likeId = getLikeId(poem)
	const likeRef = doc(db, "users", uid, "likes", likeId)

	await runTransaction(db, async (transaction) => {
		const likeSnap = await transaction.get(likeRef)

		if (!likeSnap.exists()) {
			// Add the like
			transaction.set(likeRef, {
				title: poem.title,
				author: poem.author,
				numLines: poem.numLines,
				peekLines: poem.lines.slice(0, 4),
				createdAt: serverTimestamp()
			})

			// Increment likeCount on user doc
			const userSnap = await transaction.get(userRef)
			const currentCount = userSnap.exists()
				? userSnap.data().likeCount || 0
				: 0

			transaction.update(userRef, {
				likeCount: currentCount + 1
			})
		}
	})
}

export async function unlikePoem(poem: Poem) {
	const uid = auth.currentUser?.uid
	if (!uid) {
		throw new Error("User is not logged in")
	}

	const userRef = doc(db, "users", uid)
	const likeId = getLikeId(poem)
	const likeRef = doc(db, "users", uid, "likes", likeId)

	await runTransaction(db, async (transaction) => {
		const likeSnap = await transaction.get(likeRef)

		if (likeSnap.exists()) {
			transaction.delete(likeRef)

			// Decrement likeCount on user doc
			const userSnap = await transaction.get(userRef)
			const currentCount = userSnap.exists()
				? userSnap.data().likeCount || 0
				: 0

			transaction.update(userRef, {
				likeCount: Math.max(currentCount - 1, 0) // prevent negative count
			})
		}
	})
}

export async function getAllLikedPoems(): Promise<Array<LikedPoem>> {
	const uid = auth.currentUser?.uid
	if (!uid) {
		throw new Error("User is not logged in")
	}

	const likesRef = collection(db, "users", uid, "likes")

	// Initial order: sort by createdAt (descending = newest first)
	const q = query(likesRef, orderBy("createdAt", "desc"))

	const snapshot = await getDocs(q)

	return snapshot.docs.map((doc) => {
		return {
			...(doc.data() as LikedPoem)
		}
	})
}

export async function poemIsLiked(poem: Poem): Promise<boolean> {
    const uid = auth.currentUser?.uid
    if (!uid) {
        throw new Error("User is not logged in")
    }

    const likeId = getLikeId(poem)
    const likeRef = doc(db, "users", uid, "likes", likeId)

    const likeSnap = await getDoc(likeRef)
    return likeSnap.exists()
}

