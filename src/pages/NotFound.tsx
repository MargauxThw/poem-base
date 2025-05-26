import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="mt-12 flex justify-center min-h-full p-4 pb-8">
            <main className="w-full max-w-lg h-fit">
                <div className="flex flex-col items-center gap-4 w-full">
                    <h1 className="font-bold text-xl flex-grow p-0 mt-1">404 - Page Not Found</h1>
                    <Separator className="my-2" />
                    <p>We couldn't find the page you were looking for...</p>
                    <Separator className="my-2" />
                    <div className="mt-2 flex items-center justify-center gap-4 flex-wrap">
                        <Button onClick={() => navigate('/browse')}>Start browsing</Button>
                        <Button
                            variant={'outline'}
                            onClick={() => {
                                navigate('/random');
                            }}
                        >
                            I'm feeling lucky
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
