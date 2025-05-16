// Example in App.tsx or your routes file
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import Login from "./pages/Login.tsx"
import Home from "./pages/Home.tsx"
import SignUp from "./pages/SignUp.tsx"
import PublicRoute from "./routes/PublicRoute.tsx"

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/login'
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<PublicRoute>
							<SignUp />
						</PublicRoute>
					}
				/>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}
