import type { Poem } from "../../utils/types"
import { getRandomPoem } from "../../services/poemService"

export default function RandomPoemButton({
	setNewPoem,
	poem
}: {
	setNewPoem: (poem: Poem | null) => void
	poem: Poem | null
}) {
	const handleClick = async () => {
		const fetchedPoem = await getRandomPoem(poem)
		setNewPoem(fetchedPoem)
	}

	return <button onClick={handleClick}>Get Random Poem</button>
}
