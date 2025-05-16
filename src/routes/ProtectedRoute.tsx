import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { auth } from "../utils/firebaseConfig"
import type { ReactNode } from "react"

interface ProtectedRouteProps {
	children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(() => auth.currentUser)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((u) => {
			setUser(u)
			setLoading(false)
		})
		return unsubscribe
	}, [])

	if (loading) return null

	if (!user) {
		return <Navigate to='/login' replace />
	}
	return <>{children}</>
}
