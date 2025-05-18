import { useEffect, useState } from "react"
import type { LikedPoem } from "../utils/types"
import { getAllLikedPoems, getLikeId } from "../services/likeService"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { Link } from "react-router-dom"

export default function MyPoems() {
	const [likedPoems, setLikedPoems] = useState<LikedPoem[]>([])

	useEffect(() => {
		const fetchLikedPoems = async () => {
			try {
				const response = await getAllLikedPoems()
				setLikedPoems(response)
			} catch (error) {
				console.error("Error fetching liked poems:", error)
			}
		}
		fetchLikedPoems()
	}, [])

	return (
		<>
			<h1>My Poems</h1>
			<ul>
				{likedPoems.map((poem) => (
					<li key={getLikeId(poem)}>
                        <Link to={`/poem/${getLikeId(poem)}`}>
						<div>
							<h2>{poem.title}</h2>
							<h3>{poem.author}</h3>
							{poem.peekLines.map((line, index) => (
								<Markdown rehypePlugins={[rehypeRaw]} key={index}>
									{`${line.trimStart()}<br/>`}
								</Markdown>
							))}
						</div>
					</Link>
					<hr/>
				</li>
			))}
		</ul>
		</>
	)
}
