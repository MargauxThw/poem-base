import type { Poem } from '../utils/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function intersectSets(setA: Set<number>, setB: Set<number>): number[] {
    // Use the smaller set for iteration to optimize performance
    if (setB.size < setA.size) [setA, setB] = [setB, setA];

    return [...setA].filter((item) => setB.has(item));
}

function getPoemFromCache(slug: string): Poem | null {
    const poem = localStorage.getItem(slug);
    if (poem) {
        console.log('Poem found in cache', slug);
        return JSON.parse(poem);
    }
    console.log('Poem not found in cache', slug);
    return null;
}

export async function getPoemBySlug(slug: string): Promise<Poem | null> {
    const poem = getPoemFromCache(slug);
    if (poem) {
        return poem;
    }

    const params = slug.split('::');
    const url = `https://poetrydb.org/title,author/${encodeURIComponent(
        params[0]
    )}:abs;${encodeURIComponent(params[1])}:abs`;

    console.log(url, 'URL');
    try {
        const response = await fetch(url).then((res) => {
            if (!res.ok) {
                throw new Error(`Error fetching poem with slug ${slug}: ${res.statusText}`);
            }
            return res.json();
        });

        console.log('RESPONSE: ', response);

        if (response && response.length > 0) {
            const poemData = response[0];
            const poem: Poem = {
                title: poemData.title,
                author: poemData.author,
                numLines: poemData.linecount,
                lines: poemData.lines,
            };
            console.log('Poem added to cache', slug);
            localStorage.setItem(slug, JSON.stringify(poem));
            return poem;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRandomPoem(poem: Poem | null): Promise<Poem | null> {
    // TODO: Add passing filters and make it not just 10 line poems
    try {
        const response = await fetch('https://poetrydb.org/linecount/10');
        const data = await response.json();
        if (data && data.length > 0) {
            let randomPoem = data[(Math.random() * data.length) | 0];
            while (poem != null && randomPoem.title === poem.title && data.length > 1) {
                randomPoem = data[(Math.random() * data.length) | 0];
            }

            const fetchedPoem: Poem = {
                title: randomPoem.title,
                author: randomPoem.author,
                numLines: randomPoem.lines.filter((line: string) => line.trim() !== '').length,
                lines: randomPoem.lines,
            };

            return fetchedPoem;
        }
    } catch (error) {
        console.error('Error fetching random poem:', error);
        return null;
    }
    return null;
}

// export async function getInvalidLineCounts() {
//     console.log("Checking for invalid line counts...")
//     const invalidLineCounts: number[] = []
//     for (let i = 1000; i < 0; i++) {
//         console.log(i)
//         const response = await fetch(`https://poetrydb.org/linecount/${i}`)
//         if (response.ok) {
//             const data = await response.json()
//             if (data && data.length === 0 || data.length === undefined) {
//                 invalidLineCounts.push(i)
//                 console.log("Invalid line count found:", i)
//             } else if (!data) {
//                 console.log("DATA ERROR: ", data, i)
//             } else {
//                 console.log(data.length, "poems found for line count", i, data)
//             }
//         } else {
//             console.log("Response not OK for line count", i, response.statusText)
//         }
//     }
//     console.log("Invalid line counts:", invalidLineCounts)

//     return invalidLineCounts
// }

// export async function getValidLineCounts() {
//     console.log("Checking for valid line counts...")
//     const validLineCounts: number[] = []
//     for (let i = 2000; i < 10000; i++) {
//         console.log(i)
//         const response = await fetch(`https://poetrydb.org/linecount/${i}`)
//         if (response.ok) {
//             const data = await response.json()
//             if (data && data.length > 0) {
//                 validLineCounts.push(i)
//                 console.log("Valid line count found:", i)
//             }
//         } else {
//             console.log("Response not OK for line count", i, response.statusText)
//         }
//     }
//     console.log("Valid line counts:", validLineCounts)
//     return validLineCounts
// }
