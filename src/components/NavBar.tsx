import { Link } from "react-router-dom"

export default function NavBar() {
	return (
		<nav style={{ display: 'flex', gap: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc', width: '100vw', position: 'fixed', top: 0 }}>
			<Link to='/'>Home</Link>
			<Link to='/dashboard'>Dashboard</Link>
			<Link to='/login'>Log in</Link>
			<Link to='/my-poems'>My Poems</Link>
		</nav>
	)
}
