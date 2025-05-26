import { useEffect, useState } from 'react';
import RandomPoemButton from '../components/buttons/RandomPoemButton.tsx';
import type { Poem } from '../utils/types.ts';
import PoemLayout from '../components/PoemLayout.tsx';
import LikeButton from '../components/buttons/LikeButton.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { samplePoem } from '@/utils/staticData.ts';
import { fetchNewRandomFilteredPoems, getLocalStorageFilters } from '@/services/poemService.ts';
import { FilterDialog } from '@/components/dialogs/FilterDialog.tsx';
import ScrollButton from '@/components/buttons/ScrollButton.tsx';

export default function Random() {
    const [poem, setPoem] = useState<Poem | null>(null);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const updatePoem = async () => {
        setIsLoading(true);

        const poemList = await fetchNewRandomFilteredPoems(getLocalStorageFilters('_random'));

        if (typeof poemList === 'string') {
            setHasError(true);
            setErrorMessage(poemList);
            setIsLoading(false);
            setIsNew(true);
            return;
        }

        let randomIndex = Math.floor(Math.random() * poemList.length);
        if (poem !== null && randomIndex == poemList.indexOf(poem) && poemList.length > 1) {
            randomIndex = randomIndex == poemList.length - 1 ? randomIndex - 1 : randomIndex + 1;
        }
        const newPoem = poemList[randomIndex];

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ScrollButton isLoading={isLoading} />

            <div className="mt-12 flex justify-center min-h-full p-4 pb-8 animate-blur-in">
                {poem && (
                    <main
                        className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg h-fit ${
                            isNew ? 'animate-blur-in' : ''
                        } ${isLoading ? 'animate-blur-in-out' : ''}`}
                    >
                        {hasError ? (
                            <>
                                <p className="animate-blur-wiggle-in text-center">{errorMessage}</p>
                                <Separator />
                            </>
                        ) : (
                            <PoemLayout poem={poem} />
                        )}
                        <div className="flex flex-row -mt-2 w-full sm:justify-start sm:relative sm:p-0 justify-center gap-2 sticky bottom-0 py-4 bg-background/95 backdrop-blur items-center">
                            <FilterDialog initiateFetch={updatePoem} urlSuffix={'_random'} />
                            <RandomPoemButton setNewPoem={updatePoem} />
                            {poem && <LikeButton poem={poem} />}
                        </div>
                    </main>
                )}
            </div>
        </>
    );
}
