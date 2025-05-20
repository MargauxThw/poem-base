import { useState } from 'react';
import RandomPoemButton from '../components/buttons/RandomPoemButton.tsx';
import type { Poem } from '../utils/types.ts';
import PoemLayout from '../components/PoemLayout.tsx';
import LikeButton from '../components/buttons/LikeButton.tsx';

export default function Random() {
    const [poem, setPoem] = useState<Poem | null>(null);

    function setNewPoem(newPoem: Poem | null) {
        setPoem(newPoem);
        console.log('New poem set:', newPoem);
    }

    return (
        <>
            <h1>Random</h1>
            <PoemLayout poem={poem} />
            <RandomPoemButton setNewPoem={setNewPoem} poem={poem} />
            {poem ? <LikeButton poem={poem} /> : <></>}
        </>
    );
}
