export default function ButtonRandomPoem({getRandomPoem}: {getRandomPoem: () => void}) {
	const handleClick = () => {
		getRandomPoem()
	}

	return <button onClick={handleClick}>Get Random Poem</button>
}
