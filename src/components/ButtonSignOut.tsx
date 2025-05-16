// You can place this Sign Out button in any component, e.g., Dashboard.tsx

import { signOut } from "firebase/auth"
import { auth } from "../utils/firebaseConfig"
import { useNavigate } from "react-router-dom"

export default function ButtonSignOut() {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  )
}