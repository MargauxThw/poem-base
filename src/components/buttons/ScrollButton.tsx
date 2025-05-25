import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function ScrollButton({ isLoading }: { isLoading: boolean }) {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = 100; // px from bottom to consider "at bottom"
            const atBottom = scrollPosition >= document.body.offsetHeight - threshold;
            setShowScrollButton(!atBottom);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    if (!showScrollButton) return null;

    return (
        <div className="flex flex-row justify-center items-center w-full">
            <div className="container flex justify-end items-center fixed bottom-0 z-50 mx-auto">
                <Button
                    size="icon"
                    variant={'outline'}
                    className="hidden sm:flex rounded-full shadow-lg transition mr-3 mb-12"
                    aria-label="Jump to bottom"
                    onClick={() => {
                        window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <span className="sr-only">Jump to bottom</span>
                    <ChevronDown />
                </Button>
            </div>
        </div>
    );
}
