import { useEffect, useMemo, useState } from 'react';
import type { LikedPoem, Poem } from '../utils/types';
import { getAllLikedPoems, getLikeId } from '../services/likeService';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { samplePoemList, SORTING_OPTIONS_POEMS } from '@/utils/staticData';
import { useNavigate, useParams } from 'react-router-dom';
import PoemCard from '@/components/PoemCard';
import PoemListPagination from '@/components/buttons/PoemListPagination';
import { useAuthUser } from '@/hooks/useAuthUser';
import { fetchPoemByAuthor } from '@/services/poemService';

export default function Authors() {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [likedPoemsFromDB, setLikedPoemsFromDB] = useState<LikedPoem[]>([]);
    const [poems, setPoems] = useState<Poem[]>([]);
    const [sortMode, setSortMode] = useState<string>(SORTING_OPTIONS_POEMS.titleAZ);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user, loading } = useAuthUser();

    const author = decodeURIComponent(slug ?? '');

    const fetchAuthorsPoems = async () => {
        setIsLoading(true);

        try {
            const poemList = await fetchPoemByAuthor(author);
            if (typeof poemList === 'string') {
                setErrorMessage(poemList);
                setPoems([]);
                localStorage.setItem('authorsPoems', JSON.stringify([]));
            } else if (poemList.length === 0) {
                setErrorMessage('No poems found matching the current author.');
                setPoems([]);
                localStorage.setItem('authorsPoems', JSON.stringify([]));
            } else {
                setPoems(poemList as Poem[]);
                localStorage.setItem('authorsPoems', JSON.stringify(poemList));
            }
        } catch (error) {
            console.error('Error fetching poems:', error);
            setErrorMessage('There was an error fetching poems. Please try again later.');
        }
        setIsLoading(false);
    };

    const fetchLikedPoems = async () => {
        try {
            const response = await getAllLikedPoems();
            setLikedPoemsFromDB(response);
        } catch (error) {
            console.error('Error fetching liked poems:', error);
        }
    };

    useEffect(() => {
        setErrorMessage('');
        setIsLoading(true);
        setPoems(samplePoemList);

        if (user) {
            fetchLikedPoems();
        }
        fetchAuthorsPoems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sortedPoems = useMemo(() => {
        switch (sortMode) {
            case SORTING_OPTIONS_POEMS.titleAZ:
                return poems.sort((a, b) => a.title.localeCompare(b.title));

            case SORTING_OPTIONS_POEMS.titleZA:
                return poems.sort((a, b) => b.title.localeCompare(a.title));

            case SORTING_OPTIONS_POEMS.linesAsc:
                return poems.sort((a, b) => a.linecount - b.linecount);

            case SORTING_OPTIONS_POEMS.linesDesc:
                return poems.sort((a, b) => b.linecount - a.linecount);

            case SORTING_OPTIONS_POEMS.random:
                return poems.sort(() => Math.random() - 0.5);

            default:
                return poems;
        }
    }, [poems, sortMode]);

    useEffect(() => {
        localStorage.setItem('authorsPoems', JSON.stringify(sortedPoems));
    }, [sortedPoems, sortMode]);

    const totalPages = useMemo(() => {
        return Math.ceil(sortedPoems.length / 10);
    }, [sortedPoems]);

    const changePage = (newPageNumber: number) => {
        setCurrentPage(newPageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="mt-12 justify-items-center min-h-full p-4 pb-8 animate-blur-in">
            <main className="w-full max-w-lg h-fit">
                <div className="flex flex-col items-start sm:items-start gap-4 w-full">
                    <div className="flex flex-row w-full justify-between align-middle flex-wrap mb-0 gap-2">
                        <h2 className="font-bold text-xl flex-grow p-0 mt-1">{author}</h2>
                        <Separator className="flex sm:hidden sm:w-full my-2" />
                        <div className={`flex flex-row gap-2`}>
                            <Select
                                value={sortMode}
                                onValueChange={(value) =>
                                    setSortMode(
                                        Object.values(SORTING_OPTIONS_POEMS).find(
                                            (v) => v === value
                                        ) || sortMode
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <span className="text-muted-foreground">Sort:</span>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(SORTING_OPTIONS_POEMS)
                                        .slice(2)
                                        .map((option, index) => (
                                            <SelectItem key={index} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator />
                    {sortedPoems.length === 0 && (
                        <div className="justify-items-center min-h-full w-full p-4 py-8 animate-blur-wiggle-in">
                            <p className="text-center">{errorMessage}</p>
                        </div>
                    )}

                    {sortedPoems && sortedPoems.length > 0 && (
                        <div
                            className={`flex flex-col gap-4 w-full ${isLoading ? 'animate-blur-in-out' : 'animate-blur-in'}`}
                        >
                            <p className="border-0 text-muted-foreground text-end px-0 py-0 text-xs">
                                {`Poems ${currentPage === 1 ? 1 : currentPage * 10 - 10 + 1} to ${
                                    currentPage * 10 >= sortedPoems.length
                                        ? sortedPoems.length
                                        : currentPage * 10
                                } (of ${sortedPoems.length} result${sortedPoems.length === 1 ? '' : 's'})`}
                            </p>

                            {sortedPoems
                                .slice(
                                    currentPage === 1 ? 0 : currentPage * 10 - 10,
                                    currentPage * 10 >= sortedPoems.length
                                        ? sortedPoems.length
                                        : currentPage * 10
                                )
                                .map((poem, index) => {
                                    return (
                                        <PoemCard
                                            key={index}
                                            poem={poem}
                                            heart={
                                                likedPoemsFromDB.find(
                                                    (p) => getLikeId(p) === getLikeId(poem)
                                                )
                                                    ? true
                                                    : false
                                            }
                                            openPoem={() =>
                                                isLoading
                                                    ? null
                                                    : navigate(`/authors/viewer/${getLikeId(poem)}`)
                                            }
                                        />
                                    );
                                })}
                        </div>
                    )}

                    {totalPages !== 1 && sortedPoems.length > 0 && !(isLoading || loading) && (
                        <>
                            <Separator />
                            <PoemListPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={changePage}
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
