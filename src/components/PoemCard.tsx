import { Separator } from '@/components/ui/separator';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Heart } from 'lucide-react';
import type { LikedPoem, Poem } from '@/utils/types';

export default function PoemCard({
    poem,
    openPoem,
    heart,
}: {
    poem: Poem | LikedPoem;
    openPoem: () => void;
    heart?: boolean;
}) {
    const peekLines = 'peekLines' in poem ? poem.peekLines : poem.lines.slice(0, 4);

    return (
        <Card className="w-full hover:shadow-lg cursor-pointer" onClick={openPoem}>
            <CardHeader className="pb-2">
                <CardTitle className="text-md">{poem.title}</CardTitle>
                <CardDescription className="pb-1">
                    <div className="flex flex-row items-center gap-2">
                        {poem.author}
                        <Badge
                            variant={'outline'}
                            className="text-muted-foreground px-1"
                        >{`${poem.linecount} lines`}</Badge>
                        {heart ? <Heart fill="red" stroke="none" className="h-4 -ml-1" /> : <></>}
                    </div>
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className="text-left">
                <div className="relative h-fit overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card"></div>
                    <div className="h-12">
                        <Markdown rehypePlugins={[rehypeRaw]}>
                            {`${peekLines[0].trimStart()}<br/>`}
                        </Markdown>
                        {peekLines[1] && (
                            <Markdown rehypePlugins={[rehypeRaw]}>
                                {`${peekLines[1].trimStart()}<br/>`}
                            </Markdown>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
