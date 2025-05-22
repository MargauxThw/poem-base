import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllLikedPoems, getLikeId, getLikeIdFromSlug } from '../services/likeService';
import type { LikedPoem, Poem } from '../utils/types';
import LikeButton from '../components/buttons/LikeButton';
import { getPoemBySlug } from '@/services/poemService';
import PoemLayout from '@/components/PoemLayout';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MyPoemsViewer() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [poems, setPoems] = useState<LikedPoem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [poem, setPoem] = useState<Poem | null>(null);
    const [isUnliked, setIsUnliked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isNew, setIsNew] = useState(false);

    const fetchPoems = useCallback(async () => {
        console.log('Running fetchPoems');

        let likedPoems: LikedPoem[] = [];
        const stored = localStorage.getItem('likedPoems');

        likedPoems = stored ? JSON.parse(stored) : [];
        if (likedPoems.length === 0) {
            console.log('FETCHING FROM DB');
            likedPoems = await getAllLikedPoems();
        } else {
            console.log(likedPoems, 'Stored poems USED');
        }

        setPoems(likedPoems);

        const idx = likedPoems.findIndex((p) => {
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
        setIsUnliked(false);
        setLikeLoading(false);
        fetchPoems();
    }, [fetchPoems]);

    const handleLikeChange = async () => {
        if (poem === null) return;
        if (isUnliked) {
            setIsUnliked(false);
            localStorage.setItem('likedPoems', JSON.stringify(poems));
        } else {
            setIsUnliked(true);
            const newLikedPoems = poems.filter((_p, index) => index !== currentIndex);
            localStorage.setItem('likedPoems', JSON.stringify(newLikedPoems));
        }
        setLikeLoading(false);
    };

    const navToNewPoem = (direction: 'next' | 'prev') => {
        setIsNew(false);
        setIsLoading(true);
        console.log('Running getNavPoemLikeId', direction);
        const localPoems = JSON.parse(localStorage.getItem('likedPoems') || '[]');
        if (!localPoems || localPoems.length === 0) {
            navigate('/my-poems');
            return;
        }

        let new_index = currentIndex;
        if (direction === 'next') {
            new_index = !isUnliked ? currentIndex + 1 : currentIndex;
        } else {
            new_index = currentIndex - 1;
        }

        if (new_index < 0) {
            new_index = localPoems.length - 1;
        } else if (new_index >= localPoems.length) {
            new_index = 0;
        }
        console.log('New index', isUnliked, currentIndex, new_index, localPoems, poems);
        navigate(`/my-poems/viewer/${getLikeId(localPoems[new_index])}`);
        setIsLoading(false);
        setIsNew(true);
    };

    if (!poems.length) return <div>No liked poems.</div>;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-full p-4 pb-8 gap-4 animate-blur-in">
            <main
                className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg h-fit ${
                    isNew ? 'animate-blur-in' : ''
                } ${isLoading ? 'animate-blur-in-out' : ''}`}
            >
                <div className="flex flex-row items-center justify-between w-full">
                    <Button
                        variant={'link'}
                        style={{ padding: 0 }}
                        onClick={() => navigate('/my-poems')}
                    >
                        <MoveLeft />
                        Back to My Poems
                    </Button>
                    <Badge
                        variant={'secondary'}
                        className="px-1"
                    >{`${currentIndex + 1} of ${poems.length}`}</Badge>
                </div>

                <PoemLayout poem={poem} />

                <div className="flex flex-row gap-2 mt-2">
                    <Button
                        variant={'outline'}
                        onClick={() => navToNewPoem('prev')}
                        disabled={likeLoading || isLoading}
                    >
                        <MoveLeft />
                    </Button>
                    <Button
                        variant={'outline'}
                        onClick={() => navToNewPoem('next')}
                        disabled={likeLoading || isLoading}
                    >
                        <MoveRight />
                    </Button>
                    {poem && (
                        <LikeButton
                            poem={poem}
                            onLikeChange={handleLikeChange}
                            initiateLikeLoading={() => setLikeLoading(true)}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
