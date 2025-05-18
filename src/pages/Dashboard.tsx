import { useState } from "react"
import RandomPoemButton from "../components/buttons/RandomPoemButton"
import SignOutButton from "../components/buttons/SignOutButton"
import type { Poem } from "../utils/types"
import PoemLayout from "../components/PoemLayout"
import LikeButton from "../components/buttons/LikeButton"

export default function Dashboard() {
	const [poem, setPoem] = useState<Poem | null>(null)
    
    function setNewPoem(newPoem: Poem | null) {
        setPoem(newPoem)
        console.log("New poem set:", newPoem)
    }

	return (
		<>
			<h1>Dashboard</h1>
			<SignOutButton />
			<PoemLayout poem={poem} />
			<RandomPoemButton setNewPoem={setNewPoem} poem={poem} />
			{poem ? <LikeButton poem={poem} /> : <></>}
		</>
	)
}
