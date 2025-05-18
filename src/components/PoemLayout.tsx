import { useEffect, useState } from "react"
import type { Poem } from "../utils/types"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { samplePoem } from "../utils/staticData"

export default function PoemLayout({ poem }: { poem: Poem | null }) {
	const [poemState, setPoemState] = useState<Poem>(poem ? poem : (samplePoem))

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
		setPoemState(poem ? poem : samplePoem)
	}, [poem])

	return (
		<>
			<div>
				<h2>{poemState.title}</h2>
				<h3>{poemState.author}</h3>
			</div>

			<hr />
			<section>
				{poemState.lines.map((str, index) => (
					<Markdown rehypePlugins={[rehypeRaw]} key={index}>
						{`${str.trimStart()}<br/>`}
					</Markdown>
				))}
			</section>
		</>
	)
}
