import { useState } from "react"
import RandomPoemButton from "../components/buttons/RandomPoemButton"
import SignOutButton from "../components/buttons/SignOutButton"
import type { Poem } from "../utils/types"
import PoemLayout from "../components/PoemLayout"
import LikeButton from "../components/buttons/LikeButton"

export default function Dashboard() {
	const emptyPoem: Poem = {
		title: "",
		author: "",
		numLines: 0,
		lines: []
	}
	const [poem, setPoem] = useState<Poem>(emptyPoem)

	async function getRandomPoem() {
		await fetch("https://poetrydb.org/linecount/10")
			.then((response) => response.json())
			.then((data) => {
                console.log("DATA: ", data)
				if (data && data.length > 0) {
					let randomPoem = data[Math.random() * data.length | 0]
                    while (randomPoem.title === poem.title && data.length > 1) {
                        randomPoem = data[Math.random() * data.length | 0]
                    }

					setPoem({
						title: randomPoem.title,
						author: randomPoem.author,
						numLines: randomPoem.lines.length,
						lines: randomPoem.lines
					})
				}
			})
	}

	return (
		<>
			<h1>Dashboard</h1>
			<SignOutButton />
			<PoemLayout poem={poem} />
			<RandomPoemButton getRandomPoem={getRandomPoem} />
			<LikeButton poem={poem} />
		</>
	)
}
