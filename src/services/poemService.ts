import { validLineCounts } from '@/utils/staticData';
import type { LikedPoem, Poem, PoemFilter } from '../utils/types';

const getPoemFromCache = (slug: string): Poem | null => {
    const poem = localStorage.getItem(slug);
    if (poem) {
        console.log('Poem found in cache', slug);
        return JSON.parse(poem);
    }
    console.log('Poem not found in cache', slug);
    return null;
};

export const getLocalStorageFilters = (urlSuffix?: string): PoemFilter => {
    const filters: PoemFilter = {};

    const linesStart = localStorage.getItem('linesStart' + (urlSuffix ?? ''));
    const linesEnd = localStorage.getItem('linesEnd' + (urlSuffix ?? ''));
    const titleText = localStorage.getItem('titleText' + (urlSuffix ?? ''));
    const titleAbs = localStorage.getItem('titleAbs' + (urlSuffix ?? ''));
    const authorText = localStorage.getItem('authorText' + (urlSuffix ?? ''));
    const authorAbs = localStorage.getItem('authorAbs' + (urlSuffix ?? ''));

    if (linesStart && Number.parseInt(linesStart)) {
        filters.linesStart = Number.parseInt(linesStart);
    }

    if (linesEnd && Number.parseInt(linesEnd)) {
        filters.linesEnd = Number.parseInt(linesEnd);
    }

    if (titleText) {
        filters.titleText = titleText;
    }

    if (authorText) {
        filters.authorText = authorText;
    }

    if (titleAbs === 'true') {
        filters.titleAbs = true;
    }

    if (authorAbs === 'true') {
        filters.authorAbs = true;
    }

    return filters;
};

export const filterPoemList = (poemList: LikedPoem[], urlSuffix: string) => {
    let tempPoemList = poemList;
    const filters = getLocalStorageFilters(urlSuffix);

    if (filters.authorText !== undefined) {
        if (filters.authorAbs && filters.authorText) {
            tempPoemList = tempPoemList.filter(
                (poem) => poem.author.toLowerCase() === filters.authorText?.toLowerCase()
            );
        } else if (filters.authorText) {
            tempPoemList = tempPoemList.filter((poem) =>
                poem.author.toLowerCase().includes((filters.authorText || '').toLowerCase())
            );
        }
    }

    if (filters.titleText !== undefined) {
        if (filters.titleAbs && filters.titleText) {
            tempPoemList = tempPoemList.filter(
                (poem) => poem.title.toLowerCase() === filters.titleText?.toLowerCase()
            );
        } else if (filters.titleText) {
            tempPoemList = tempPoemList.filter((poem) =>
                poem.title.toLowerCase().includes((filters.titleText || '').toLowerCase())
            );
        }
    }

    if (filters.linesStart !== undefined) {
        tempPoemList = tempPoemList.filter((poem) => poem.linecount >= (filters.linesStart || 0));
    }

    if (filters.linesEnd !== undefined) {
        tempPoemList = tempPoemList.filter((poem) => poem.linecount <= (filters.linesEnd || 0));
    }

    return tempPoemList;
};

export const getPoemBySlug = async (slug: string): Promise<Poem | null> => {
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
                linecount: poemData.linecount,
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
};

export const fetchPoemByAuthor = async (author: string): Promise<Array<Poem> | string> => {
    const baseUrl = 'https://poetrydb.org';
    console.log('Fetching poems by author:', author);
    const url = `${baseUrl}/author/${encodeURIComponent(author)}`;
    try {
        const response = await fetch(url);
        const poems = await response.json();
        if (poems && poems.length > 0) {
            console.log('Poems found:', poems);
            return poems;
        } else {
            return 'No poems could be found.';
        }
    } catch (error) {
        console.error(error);
        return 'An error has occured, try again later';
    }
};

// export const getRandomPoem = async (poem: Poem | null): Promise<Poem | null> => {
//     // TODO: Add passing filters and make it not just 10 line poems
//     try {
//         const response = await fetch('https://poetrydb.org/linecount/10');
//         const data = await response.json();
//         if (data && data.length > 0) {
//             let randomPoem = data[(Math.random() * data.length) | 0];
//             while (poem != null && randomPoem.title === poem.title && data.length > 1) {
//                 randomPoem = data[(Math.random() * data.length) | 0];
//             }

//             const fetchedPoem: Poem = {
//                 title: randomPoem.title,
//                 author: randomPoem.author,
//                 linecount: randomPoem.lines.filter((line: string) => line.trim() !== '').length,
//                 lines: randomPoem.lines,
//             };

//             return fetchedPoem;
//         }
//     } catch (error) {
//         console.error('Error fetching random poem:', error);
//         return null;
//     }
//     return null;
// };

export const fetchNewRandomFilteredPoems = async (
    poemFilter: PoemFilter,
    forSearchDefault?: boolean
): Promise<Array<Poem> | string> => {
    const baseUrl = 'https://poetrydb.org';
    console.log('Fetching new random poems with filters:', poemFilter);

    let inputFields = '';
    let searchTerms = '';
    if (
        poemFilter.linesStart &&
        poemFilter.linesEnd &&
        poemFilter.linesStart == poemFilter.linesEnd
    ) {
        inputFields += 'linecount,';
        searchTerms += `${poemFilter.linesStart};`;
    } else if (poemFilter.linesStart || poemFilter.linesEnd) {
        inputFields += 'linecount,';
        const start = poemFilter.linesStart ?? 1;
        const end = poemFilter.linesEnd ?? 10000;
        const validInRange = Array.from(validLineCounts).filter((n) => n >= start && n <= end);

        let randomLineCount = -1;
        if (validInRange.length > 0) {
            randomLineCount = validInRange[Math.floor(Math.random() * validInRange.length)];
        } else {
            return 'No poems could be found within the line ranges selected. Try adjusting the filters.';
        }

        searchTerms += `${randomLineCount};`;
    }

    if (poemFilter.authorText) {
        poemFilter.authorText = poemFilter.authorText.replace(' ', '%20');
        inputFields += 'author,';
        searchTerms += `${poemFilter.authorText}${
            poemFilter.authorAbs != null ? (poemFilter.authorAbs == true ? ':abs' : '') : ''
        };`;
    }

    if (poemFilter.titleText) {
        poemFilter.titleText = poemFilter.titleText.replace(' ', '%20');
        inputFields += 'title,';
        searchTerms += `${poemFilter.titleText}${
            poemFilter.titleAbs != null ? (poemFilter.titleAbs == true ? ':abs' : '') : ''
        };`;
    }

    let responseTail = '';
    if (inputFields.length > 0 || poemFilter.linesStart || poemFilter.linesEnd) {
        inputFields = inputFields.slice(0, -1);
        if (inputFields.length > 0) {
            responseTail = `/${inputFields}/${searchTerms}`;
        } else {
            responseTail = '/random';
        }
    } else {
        responseTail = forSearchDefault ? '/random/10' : '/random';
    }

    try {
        console.log(baseUrl + responseTail);
        const response = await fetch(baseUrl + responseTail);
        const poems = await response.json();

        if (poems && poems.length > 0) {
            console.log('Poems found:', poems);
            return poems;
        } else {
            return 'No poems could be found. Try adjusting the filters.';
        }
    } catch (error) {
        console.error(error);
        return 'An error has occured, try again later';
    }
};
