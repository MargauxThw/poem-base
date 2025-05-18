import type { Poem } from "../../utils/types"
import { getRandomPoem } from "../../services/poemService"

type RandomPoemButtonProps = {
	setNewPoem: (poem: Poem | null) => void
	poem: Poem | null
}
export default function RandomPoemButton({
	setNewPoem,
	poem
}: RandomPoemButtonProps) {
	const handleClick = async () => {
		const fetchedPoem = await getRandomPoem(poem)
		setNewPoem(fetchedPoem)
	}

	return <button onClick={handleClick}>Get Random Poem</button>
}
