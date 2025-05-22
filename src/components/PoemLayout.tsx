import { useEffect, useState } from 'react';
import type { Poem } from '../utils/types';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { samplePoem } from '../utils/staticData';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';

export default function PoemLayout({ poem }: { poem: Poem | null }) {
    const [poemState, setPoemState] = useState<Poem>(poem ? poem : samplePoem);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setPoemState(poem ? poem : samplePoem);
    }, [poem]);

    return (
        <>
            <div className="flex flex-col items-start sm:items-start gap-4">
                <h2 className="decoration-black font-bold text-xl">{poemState.title}</h2>
                <Link to={`/authors/${poemState.author}`} className="hover:underline-offset-4">
                    <h3 className="italic text-lg hover:underline">{poemState.author}</h3>
                </Link>
            </div>

            <Separator />
            <section>
                {poemState.lines.map((str, index) => (
                    <Markdown rehypePlugins={[rehypeRaw]} key={index}>
                        {`${str.trimStart()}<br/>`}
                    </Markdown>
                ))}
            </section>
            <Separator />
        </>
    );
}
