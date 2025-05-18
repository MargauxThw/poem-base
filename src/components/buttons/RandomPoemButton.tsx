export default function RandomPoemButton({
	getRandomPoem
}: {
	getRandomPoem: () => void
}) {
	const handleClick = () => {
		getRandomPoem()
	}

	return <button onClick={handleClick}>Get Random Poem</button>
}
