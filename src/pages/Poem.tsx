import { useParams } from "react-router-dom"
import PoemLayout from "../components/PoemLayout"
import { useEffect, useState } from "react"
import type { Poem } from "../utils/types"
import { getPoemBySlug } from "../services/poemService"
import LikeButton from "../components/buttons/LikeButton"
import RandomPoemButton from "../components/buttons/RandomPoemButton"

export default function PoemPage() {
	const { slug } = useParams<{ slug: string }>()
	const [poem, setPoem] = useState<Poem | null>(null)

	useEffect(() => {
		const fetchPoem = async () => {
			if (!slug) {
				console.error("No slug provided")
				return
			}

			try {
				const response = await getPoemBySlug(slug)
				console.log(response)
				setPoem(response)
			} catch (error) {
				console.error("Error fetching poem:", error)
			}
		}
		fetchPoem()
	}, [slug])

	return (
		<>
			<div>Poem slug: {slug}</div>
			<hr />
			{poem ? (
				<>
					<PoemLayout poem={poem} />
					<RandomPoemButton setNewPoem={setPoem} poem={poem} />
					<LikeButton poem={poem} />
				</>
			) : (
				<div>Loading...</div>
			)}
		</>
	)
}
