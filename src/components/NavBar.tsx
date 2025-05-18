import { Link } from "react-router-dom"
import { FONT_OPTIONS, THEME_OPTIONS } from "../utils/staticData"
import FontButton from "./buttons/FontButton"
import ThemeButton from "./buttons/ThemeButton"

type NavBarProps = {
	updateFont: (newIndex: number) => void
	fontIndex: number,
    updateTheme: (newIndex: number) => void
	themeIndex: number
}

export default function NavBar({ updateFont, fontIndex, updateTheme, themeIndex }: NavBarProps) {
	return (
		<nav
			style={{
				display: "flex",
				gap: "10px",
				padding: "10px",
				backgroundColor: "#f0f0f0",
				borderBottom: "1px solid #ccc",
				width: "100vw",
				position: "fixed",
				top: 0
			}}
		>
			<Link to='/'>Home</Link>
			<Link to='/dashboard'>Dashboard</Link>
			<Link to='/login'>Log in</Link>
			<Link to='/my-poems'>My Poems</Link>
			{FONT_OPTIONS.map((_font, index) => (
				<FontButton
					key={index}
					index={index}
					currentFontIndex={fontIndex}
					updateFont={updateFont}
				/>
			))}
			{THEME_OPTIONS.map((_theme, index) => (
				<ThemeButton
					key={index}
					index={index}
					currentThemeIndex={themeIndex}
					updateTheme={updateTheme}
				/>
			))}
		</nav>
	)
}
