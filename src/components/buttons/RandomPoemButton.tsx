import type { Poem } from '../../utils/types';
import { getRandomPoem } from '../../services/poemService';
import { Button } from '../ui/button';
import { Shuffle } from 'lucide-react';

type RandomPoemButtonProps = {
    setNewPoem: (poem: Poem | null) => void;
    poem: Poem | null;
};
export default function RandomPoemButton({ setNewPoem, poem }: RandomPoemButtonProps) {
    const handleClick = async () => {
        setNewPoem(null);
        const fetchedPoem = await getRandomPoem(poem);
        setNewPoem(fetchedPoem);
    };

    return (
        <Button onClick={handleClick} variant="outline" size="icon">
            <Shuffle />
        </Button>
    );
}
