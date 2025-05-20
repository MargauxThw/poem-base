import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllLikedPoems, getLikeId, getLikeIdFromSlug } from '../services/likeService';
import type { LikedPoem, Poem } from '../utils/types';
import LikeButton from '../components/buttons/LikeButton';
import { getPoemBySlug } from '@/services/poemService';
import PoemLayout from '@/components/PoemLayout';

export default function MyPoemsViewer() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [poems, setPoems] = useState<LikedPoem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [poem, setPoem] = useState<Poem | null>(null);
    const [isUnliked, setIsUnliked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

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
            return getLikeId(p) === getLikeIdFromSlug(slug ?? '');
        });
        setCurrentIndex(idx >= 0 ? idx : 0);

        const poemData = await getPoemBySlug(slug ?? '');
        setPoem(poemData);
    }, [slug]);

    useEffect(() => {
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
    };

    if (!poems.length) return <div>No liked poems.</div>;

    return (
        <div>
            <button onClick={() => navigate('/my-poems')} style={{ marginBottom: 16 }}>
                ← Back to My Poems
            </button>
            <div style={{ marginBottom: 8 }}>
                {currentIndex + 1} of {poems.length}
            </div>
            <PoemLayout poem={poem} />

            {poem && (
                <LikeButton
                    poem={poem}
                    onLikeChange={handleLikeChange}
                    initiateLikeLoading={() => setLikeLoading(true)}
                />
            )}
            <div style={{ marginTop: 16 }}>
                <button onClick={() => navToNewPoem('prev')} disabled={likeLoading}>
                    Previous
                </button>
                <button
                    onClick={() => navToNewPoem('next')}
                    style={{ marginLeft: 8 }}
                    disabled={likeLoading}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
