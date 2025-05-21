import { useEffect, useState } from 'react';
import RandomPoemButton from '../components/buttons/RandomPoemButton.tsx';
import type { Poem } from '../utils/types.ts';
import PoemLayout from '../components/PoemLayout.tsx';
import LikeButton from '../components/buttons/LikeButton.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { samplePoem } from '@/utils/staticData.ts';
import { fetchNewRandomFilteredPoems, getLocalStorageFilters } from '@/services/poemService.ts';

export default function Random() {
    const [poem, setPoem] = useState<Poem | null>(null);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const updatePoem = async () => {
        console.log('Updating poem...');
        setIsLoading(true);
        let newPoem = poem;
        let tryCount = 0;

        while (
            newPoem == null ||
            (newPoem.title === poem?.title && newPoem.author === poem?.author)
        ) {
            if (tryCount > 3) {
                break;
            }

            const poemList = await fetchNewRandomFilteredPoems(getLocalStorageFilters());

            if (typeof poemList === 'string') {
                setHasError(true);
                setErrorMessage(poemList);
                setIsLoading(false);
                setIsNew(true);
                return;
            }

            newPoem = poemList[0];
            tryCount += 1;
        }

        setPoem(newPoem);
        setHasError(false);
        setErrorMessage('');
        setIsLoading(false);
        setIsNew(true);
    };

    useEffect(() => {
        if (poem == null) {
            setPoem(samplePoem);
            updatePoem();
        }
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-full p-4 pb-8 gap-4 animate-blur-in">
            {poem && (
                <main
                    className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg h-fit ${
                        isNew ? 'animate-blur-in' : ''
                    } ${isLoading ? 'animate-blur-in-out' : ''}`}
                >
                    {hasError ? <p>{errorMessage}</p> : <PoemLayout poem={poem} />}
                    <Separator />
                    <RandomPoemButton setNewPoem={updatePoem} />
                    {poem && <LikeButton poem={poem} />}
                </main>
            )}
        </div>
    );
}
