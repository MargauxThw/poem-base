import { useEffect, useState } from 'react';
import type { Poem } from '../../utils/types';
import { likePoem, poemIsLiked, unlikePoem } from '../../services/likeService';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useAuthUser } from '@/hooks/useAuthUser';
import { toast } from 'sonner';

type LikeButtonProps = {
    poem: Poem;
    initiateLikeLoading?: () => void;
    onLikeChange?: () => void;
};

export default function LikeButton({ poem, initiateLikeLoading, onLikeChange }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user, loading } = useAuthUser();

    useEffect(() => {
        setIsLiked(false); // Reset state when poem changes
        setIsLoading(true); // Set loading to true while checking

        const checkIsLiked = async () => {
            try {
                const liked = await poemIsLiked(poem);
                setIsLiked(liked);
            } catch {
                setIsLiked(false);
            }
        };

        if (user) {
            checkIsLiked();
        }
        setIsLoading(false); // Set loading to false after checking
    }, [poem, user]);

    const handleClick = async () => {
        setIsLoading(true); // Set loading to true while processing the like/unlike
        if (initiateLikeLoading) initiateLikeLoading();

        if (isLiked) {
            // Optimistically set the state to false before the API call
            setIsLiked(false);

            try {
                const success = await unlikePoem(poem);
                if (!success) {
                    setIsLiked(true);
                }
            } catch (error) {
                if (error instanceof Error && error.message.includes('verified')) {
                    toast.error('Error unliking poem', {
                        description: 'You must verify your email before unliking poems.',
                    });
                } else {
                    toast.error('Error unliking poem', {
                        description:
                            'There was an error unliking this poem. Please try again later.',
                    });
                }
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
                if (error instanceof Error && error.message.includes('verified')) {
                    toast.error('Error liking poem', {
                        description: 'You must verify your email before liking poems.',
                    });
                } else {
                    toast.error('Error liking poem', {
                        description: 'There was an error liking this poem. Please try again later.',
                    });
                }
                setIsLiked(false);
            }
        }

        if (onLikeChange) {
            onLikeChange();
        }

        setIsLoading(false);
    };

    if (loading) return null;

    return (
        <>
            {poem.title.length > 0 ? (
                user ? (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleClick}
                        disabled={isLoading}
                        className="group"
                    >
                        <span className="sr-only">Like poem</span>
                        <Heart
                            fill={isLiked ? 'red' : 'var(--foreground)'}
                            stroke="none"
                            className={isLiked ? '' : 'group-hover:fill-[var(--accent-foreground)]'}
                        />
                    </Button>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={isLoading}
                                className="group"
                            >
                                <span className="sr-only">Like poem</span>
                                <Heart
                                    fill={'var(--foreground)'}
                                    stroke="none"
                                    className="group-hover:fill-[var(--accent-foreground)]"
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="m-auto py-2 px-4 w-fit">
                            <p>
                                <a
                                    href="/login"
                                    className="underline"
                                    onClick={() =>
                                        localStorage.setItem('to like', JSON.stringify(poem))
                                    }
                                >
                                    Log in or sign up
                                </a>{' '}
                                to like poems
                            </p>
                        </PopoverContent>
                    </Popover>
                )
            ) : null}
        </>
    );
}
