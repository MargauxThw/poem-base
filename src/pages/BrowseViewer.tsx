import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLikeId, getLikeIdFromSlug } from '../services/likeService';
import type { Poem } from '../utils/types';
import LikeButton from '../components/buttons/LikeButton';
import { getPoemBySlug } from '@/services/poemService';
import PoemLayout from '@/components/PoemLayout';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ScrollButton from '@/components/buttons/ScrollButton';

export default function BrowseViewer() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [poems, setPoems] = useState<Poem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [poem, setPoem] = useState<Poem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNew, setIsNew] = useState(false);

    const fetchPoems = useCallback(async () => {
        console.log('Running fetchPoems');

        let browsePoems: Poem[] = [];
        const stored = localStorage.getItem('browsePoems');

        browsePoems = stored ? JSON.parse(stored) : [];

        setPoems(browsePoems);

        const idx = browsePoems.findIndex((p) => {
            console.log(slug);
            return getLikeId(p) === getLikeIdFromSlug(slug ?? '');
        });
        setCurrentIndex(idx >= 0 ? idx : 0);

        const poemData = await getPoemBySlug(slug ?? '');
        setPoem(poemData);
        setIsLoading(false);
        setIsNew(true);
    }, [slug]);

    useEffect(() => {
        setIsLoading(true);
        fetchPoems();
    }, [fetchPoems]);

    const navToNewPoem = (direction: 'next' | 'prev') => {
        setIsNew(false);
        setIsLoading(true);
        if (!poems || poems.length === 0) {
            navigate('/browse');
            return;
        }

        let new_index = currentIndex;
        if (direction === 'next') {
            new_index = currentIndex + 1;
        } else {
            new_index = currentIndex - 1;
        }

        if (new_index < 0) {
            new_index = poems.length - 1;
        } else if (new_index >= poems.length) {
            new_index = 0;
        }
        navigate(`/browse/viewer/${getLikeId(poems[new_index])}`);
        setIsLoading(false);
        setIsNew(true);
    };

    return (
        <>
            <ScrollButton isLoading={isLoading} />

            <div className="mt-12 justify-items-center min-h-full p-4 pb-8 animate-blur-in">
                <main
                    className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg h-fit ${
                        isNew ? 'animate-blur-in' : ''
                    } ${isLoading ? 'animate-blur-in-out' : ''}`}
                >
                    <div className="flex flex-row items-center justify-between w-full">
                        <Button
                            variant={'link'}
                            style={{ padding: 0 }}
                            onClick={() => navigate('/browse')}
                        >
                            <MoveLeft />
                            Back to Browse
                        </Button>
                        <Badge
                            variant={'secondary'}
                            className="px-1"
                        >{`${currentIndex + 1} of ${poems.length}`}</Badge>
                    </div>

                    <PoemLayout poem={poem} />

                    <div className="flex flex-row -mt-2 w-full sm:justify-start sm:relative sm:p-0 justify-center gap-2 sticky bottom-0 py-4 bg-background/95 backdrop-blur items-center">
                        <Button
                            variant={'outline'}
                            onClick={() => navToNewPoem('prev')}
                            disabled={isLoading}
                        >
                            <MoveLeft />
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={() => navToNewPoem('next')}
                            disabled={isLoading}
                        >
                            <MoveRight />
                        </Button>
                        {poem && <LikeButton poem={poem} />}
                    </div>
                </main>
            </div>
        </>
    );
}
