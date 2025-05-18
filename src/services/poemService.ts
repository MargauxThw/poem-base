import type { Poem } from "../utils/types"

export async function getPoemBySlug(slug: string): Promise<Poem | null> {
	const params = slug.split("::")
	const url = `https://poetrydb.org/title,author,linecount/${encodeURIComponent(
		params[0]
	)}:abs;${encodeURIComponent(params[1])}:abs;${params[2]}`

    try {
		const response = await fetch(url).then((res) => {
			if (!res.ok) {
				throw new Error(
					`Error fetching poem with slug ${slug}: ${res.statusText}`
				)
			}
			return res.json()
		})

		console.log("RESPONSE: ", response)

		if (response && response.length > 0) {
			const poemData = response[0]
			const poem: Poem = {
				title: poemData.title,
				author: poemData.author,
				numLines: poemData.linecount,
				lines: poemData.lines
			}
			return poem
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}
