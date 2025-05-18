// Example in App.tsx or your routes file
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import Login from "./pages/Login.tsx"
import Home from "./pages/Home.tsx"
import SignUp from "./pages/SignUp.tsx"
import PublicRoute from "./routes/PublicRoute.tsx"
import NavBar from "./components/NavBar.tsx"
import MyPoems from "./pages/MyPoems.tsx"
import PoemPage from "./pages/Poem.tsx"
import { FONT_OPTIONS, THEME_OPTIONS } from "./utils/staticData.ts"
import { useState } from "react"

export default function App() {
	const [fontIndex, setFontIndex] = useState(() => {
		const stored = localStorage.getItem("font_index")
		return stored ? Number(stored) : 0
	})

	const [themeIndex, setThemeIndex] = useState(() => {
		const stored = localStorage.getItem("theme_index")
		return stored ? Number(stored) : 0
	})

	function updateFont(newIndex: number) {
		setFontIndex(newIndex)
		localStorage.setItem("font_index", String(newIndex))
	}

	function updateTheme(newIndex: number) {
		setThemeIndex(newIndex)
		localStorage.setItem("theme_index", String(newIndex))
	}

	return (
		<BrowserRouter>
			<NavBar
				updateFont={updateFont}
				fontIndex={fontIndex}
				updateTheme={updateTheme}
				themeIndex={themeIndex}
			/>
			{/* TODO: Slider for font-size - use EM for actual sizes? Also add some options for line height ALSO fix nav bar and move all of this into a pop-up */}

			<div
				style={{
					fontFamily: FONT_OPTIONS[fontIndex].value,
					background: THEME_OPTIONS[themeIndex].background,
					color: THEME_OPTIONS[themeIndex].color,
					width: "100vw",
					fontSize: "120%"
				}}
			>
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
					<Route
						path='/my-poems'
						element={
							<ProtectedRoute>
								<MyPoems />
							</ProtectedRoute>
						}
					/>
					<Route path='/poem/:slug' element={<PoemPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}
