import { useEffect, useState } from 'react';
import type { Poem } from '../../utils/types';
import { likePoem, poemIsLiked, unlikePoem } from '../../services/likeService';

type LikeButtonProps = {
    poem: Poem;
    onLikeChange?: () => void; // Optional callback function to be called when the like state changes
};

export default function LikeButton({ poem, onLikeChange }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLiked(false); // Reset state when poem changes
        setIsLoading(true); // Set loading to true while checking

        const checkIsLiked = async () => {
            try {
                const liked = await poemIsLiked(poem);
                setIsLiked(liked);
            } catch (error) {
                console.error('Error checking if poem is liked:', error);
            }
        };

        checkIsLiked();
        setIsLoading(false); // Set loading to false after checking
    }, [poem]);

    const handleClick = async () => {
        setIsLoading(true); // Set loading to true while processing the like/unlike

        if (isLiked) {
            // Optimistically set the state to false before the API call
            setIsLiked(false);

            try {
                const success = await unlikePoem(poem);
                if (!success) {
                    setIsLiked(true);
                }
            } catch (error) {
                console.error('Error unliking this poem:', error);
                setIsLiked(true);
            }
        } else {
            setIsLiked(true);

            try {
                const success = await likePoem(poem);
                if (!success) {
                    setIsLiked(false);
                }
            } catch (error) {
                console.error('Error liking this poem:', error);
                setIsLiked(false);
            }
        }

        console.log('Like state changed:', isLiked);

        if (onLikeChange) {
            onLikeChange();
        }

        setIsLoading(false);
    };

    return (
        <>
            {poem.title.length > 0 ? (
                <button onClick={handleClick} disabled={isLoading}>
                    {isLiked ? 'Unlike' : 'Like'}
                </button>
            ) : (
                <></>
            )}
        </>
    );
}
