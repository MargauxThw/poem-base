import { useEffect, useMemo, useState } from 'react';
import type { LikedPoem } from '../utils/types';
import { getAllLikedPoems, getDateValue, getLikeId } from '../services/likeService';
import { Separator } from '@/components/ui/separator';
import { FilterDialog } from '@/components/dialogs/FilterDialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SORTING_OPTIONS_LIKES } from '@/utils/staticData';
import { useNavigate } from 'react-router-dom';
import { filterPoemList } from '@/services/poemService';
import PoemCard from '@/components/PoemCard';
import PoemListPagination from '@/components/buttons/PoemListPagination';
import ScrollButton from '@/components/buttons/ScrollButton';

export default function MyPoems() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [likedPoemsFromDB, setLikedPoemsFromDB] = useState<LikedPoem[]>([]);
    const [likedPoems, setLikedPoems] = useState<LikedPoem[]>([]);
    const [sortMode, setSortMode] = useState<string>(SORTING_OPTIONS_LIKES.authorAZ);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const filterLikedPoems = async (initialLikedPoems?: LikedPoem[]) => {
        setLikedPoems(filterPoemList(initialLikedPoems ?? likedPoemsFromDB, '_my-poems'));
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchLikedPoems = async () => {
            try {
                const response = await getAllLikedPoems();
                setLikedPoemsFromDB(response);
                filterLikedPoems(response);
                localStorage.setItem('likedPoems', JSON.stringify(response));

                if (response.length === 0) {
                    setErrorMessage("You haven't liked any poems yet, try browsing.");
                } else if (likedPoems.length === 0) {
                    setErrorMessage('None of your liked poems match the current filters.');
                }
            } catch {
                setErrorMessage(
                    'There was an error fetching your liked poems. Please try again later.'
                );
            }
        };
        fetchLikedPoems();
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    useEffect(() => {
        localStorage.setItem('likedPoems', JSON.stringify(sortedPoems));
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

    if (isLoading) return null;

    return (
        <>
            <ScrollButton isLoading={isLoading} />

            <div className="mt-12 justify-items-center min-h-full p-4 pb-8 animate-blur-in">
                <main className="w-full max-w-lg h-fit">
                    <div className="flex flex-col items-start sm:items-start gap-4 w-full">
                        <div className="flex flex-row w-full justify-between align-middle flex-wrap mb-0 gap-2">
                            <h2 className="font-bold text-xl flex-grow p-0 mt-1">My Poems</h2>
                            <Separator className="flex sm:hidden sm:w-full my-2" />
                            <div className="flex flex-row gap-2">
                                <Select
                                    value={sortMode}
                                    onValueChange={(value) =>
                                        setSortMode(
                                            Object.values(SORTING_OPTIONS_LIKES).find(
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
                                        {Object.values(SORTING_OPTIONS_LIKES).map(
                                            (option, index) => (
                                                <SelectItem key={index} value={option}>
                                                    {option}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FilterDialog
                                    initiateFetch={filterLikedPoems}
                                    urlSuffix={'_my-poems'}
                                />
                            </div>
                        </div>

                        <Separator />
                        {sortedPoems.length === 0 && (
                            <div className="justify-items-center min-h-full w-full p-4 py-8 animate-blur-wiggle-in">
                                <p className="text-center">{errorMessage}</p>
                            </div>
                        )}

                        {sortedPoems && sortedPoems.length > 0 && (
                            <div className={`flex flex-col gap-4 w-full animate-blur-in`}>
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
                                                heart={true}
                                                openPoem={() =>
                                                    isLoading
                                                        ? null
                                                        : navigate(
                                                              `/my-poems/viewer/${getLikeId(poem)}`
                                                          )
                                                }
                                            />
                                        );
                                    })}
                            </div>
                        )}

                        {totalPages !== 1 && sortedPoems.length > 0 && (
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
        </>
    );
}
