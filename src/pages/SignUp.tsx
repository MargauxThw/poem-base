import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../utils/firebaseConfig"
import { Link, useNavigate } from "react-router-dom"
import { ensureUserDoc } from "../services/userService"

export default function SignUp() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		try {
			await createUserWithEmailAndPassword(auth, email, password)
			navigate("/dashboard")
			await ensureUserDoc()
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError("An unknown error occurred.")
			}
		}
	}

	return (
		<div>
			<h1>Sign up</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type='submit'>Sign Up</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<Link to='/login'>Already have an account? Log in</Link>
		</div>
	)
}
