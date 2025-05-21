// import type { Poem } from '../../utils/types';
// import { getRandomPoem } from '../../services/poemService';
import { Button } from '../ui/button';
import { Shuffle } from 'lucide-react';

type RandomPoemButtonProps = {
    setNewPoem: () => void;
};

export default function RandomPoemButton({ setNewPoem }: RandomPoemButtonProps) {
    // const handleClick = async () => {
    //     setNewPoem(null);
    //     const fetchedPoem = await getRandomPoem(poem);
    //     setNewPoem(fetchedPoem);
    // };

    return (
        <Button onClick={setNewPoem} variant="outline" size="icon">
            <Shuffle />
        </Button>
    );
}
