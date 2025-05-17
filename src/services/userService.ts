import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../utils/firebaseConfig"

export async function ensureUserDoc() {
	const user = auth.currentUser
	if (!user) {
		throw new Error("User is not logged in")
	}

	const userRef = doc(db, "users", user.uid)
	const userSnap = await getDoc(userRef)

	if (!userSnap.exists()) {
		await setDoc(userRef, {
			likeCount: 0
		})
		console.log("User doc created")
	} else {
		console.log("User doc exists")
	}
}
