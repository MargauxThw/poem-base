import { useEffect, useMemo, useState } from 'react';
import type { LikedPoem } from '../utils/types';
import { getAllLikedPoems, getDateValue, getLikeId } from '../services/likeService';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Separator } from '@/components/ui/separator';
import { FilterButton } from '@/components/buttons/FilterButton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SORTING_OPTIONS_LIKES } from '@/utils/staticData';
import { Link } from 'react-router-dom';

export default function MyPoems() {
    const [likedPoems, setLikedPoems] = useState<LikedPoem[]>([]);
    const [sortMode, setSortMode] = useState<string>(SORTING_OPTIONS_LIKES.authorAZ);

    useEffect(() => {
        const fetchLikedPoems = async () => {
            try {
                const response = await getAllLikedPoems();
                setLikedPoems(response);
                localStorage.setItem('likedPoems', JSON.stringify(response));
            } catch (error) {
                console.error('Error fetching liked poems:', error);
            }
        };
        fetchLikedPoems();
    }, []);

    const sortedPoems = useMemo(() => {
        switch (sortMode) {
            case SORTING_OPTIONS_LIKES.authorAZ:
                return likedPoems.sort((a, b) => a.author.localeCompare(b.author));

            case SORTING_OPTIONS_LIKES.authorZA:
                return likedPoems.sort((a, b) => b.author.localeCompare(a.author));

            case SORTING_OPTIONS_LIKES.titleAZ:
                return likedPoems.sort((a, b) => a.title.localeCompare(b.title));

            case SORTING_OPTIONS_LIKES.titleZA:
                return likedPoems.sort((a, b) => b.title.localeCompare(a.title));

            case SORTING_OPTIONS_LIKES.linesAsc:
                return likedPoems.sort((a, b) => a.linecount - b.linecount);

            case SORTING_OPTIONS_LIKES.linesDesc:
                return likedPoems.sort((a, b) => b.linecount - a.linecount);

            case SORTING_OPTIONS_LIKES.createdAtAsc:
                return likedPoems.sort(
                    (a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt)
                );

            case SORTING_OPTIONS_LIKES.createdAtDesc:
                return likedPoems.sort(
                    (a, b) => getDateValue(a.createdAt) - getDateValue(b.createdAt)
                );

            case SORTING_OPTIONS_LIKES.random:
                return likedPoems.sort(() => Math.random() - 0.5);

            default:
                return likedPoems;
        }
    }, [likedPoems, sortMode]);

    return (
        <>
            <div className="flex flex-col items-start sm:items-start gap-4">
                <h2 className="decoration-black font-bold text-xl">My Poems</h2>
                <FilterButton
                    initiateFetch={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                    urlSuffix={'_my-poems'}
                />
                <Select
                    value={sortMode}
                    onValueChange={(value) =>
                        setSortMode(
                            Object.values(SORTING_OPTIONS_LIKES).find((v) => v === value) ||
                                sortMode
                        )
                    }
                >
                    <SelectTrigger>
                        <span className="text-muted-foreground">Sort:</span>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(SORTING_OPTIONS_LIKES).map((option, index) => (
                            <SelectItem key={index} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator />
            <ul>
                {sortedPoems.map((poem) => (
                    <li key={getLikeId(poem)}>
                        <Link to={`/my-poems/viewer/${getLikeId(poem)}`}>
                            <div>
                                <h2>{poem.title}</h2>
                                <h3>{poem.author}</h3>
                                <p>{`Lines: ${poem.linecount}`}</p>
                                <p>{`Created at: ${poem.createdAt}`}</p>
                                {poem.peekLines.map((line, index) => (
                                    <Markdown rehypePlugins={[rehypeRaw]} key={index}>
                                        {`${line.trimStart()}<br/>`}
                                    </Markdown>
                                ))}
                            </div>
                        </Link>
                        <hr />
                    </li>
                ))}
            </ul>
            <Separator />
        </>
    );
}
