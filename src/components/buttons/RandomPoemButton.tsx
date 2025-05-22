import { Button } from '../ui/button';
import { Shuffle } from 'lucide-react';

type RandomPoemButtonProps = {
    setNewPoem: () => void;
};

export default function RandomPoemButton({ setNewPoem }: RandomPoemButtonProps) {
    return (
        <Button onClick={setNewPoem} variant="outline" size="icon">
            <Shuffle />
        </Button>
    );
}
