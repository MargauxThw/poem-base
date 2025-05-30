import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-[calc(100vh-56px)]">
                <div className="pt-4 lg:px-8 animate-blur-wiggle-in">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 dark:opacity-50"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ffffff] to-[#dfddff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                        />
                    </div>
                    <section className="mx-auto max-w-4xl sm:pt-8 lg:pt-24 lg:pb-24 sm: pb-12 px-6 mt-12">
                        <div className="text-center max-w-4xl sm:mx-auto">
                            <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl flex flex-col gap-2 sm:gap:4 animate-blur-wiggle-in">
                                Poetry in your pocket <br />
                                <span className="text-accent-foreground/50 dark:text-accent-foreground font-bold">
                                    with Poem Base
                                </span>
                            </h1>
                            <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
                                A customisable poem browser and reader, designed to enhance your
                                reading experience. Explore, filter, and enjoy poetry like never
                                before. Powered by{' '}
                                <a
                                    href="https://poetrydb.org/"
                                    className="text-accent-foreground underline underline-offset-4 hover:text-accent-foreground/80"
                                >
                                    PoetryDB
                                </a>
                                .
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
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
                    </section>
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] dark:opacity-50"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ffffff] to-[#dfddff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                        />
                    </div>
                </div>
                <section className="w-full bg-white/20 dark:bg-transparent py-0 sm:py-6 animate-blur-wiggle-in">
                    <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-0">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                            {[
                                { id: 1, name: 'Poems to read', value: 'Over 3,000' },
                                { id: 2, name: 'Authors to explore', value: 'Over 100' },
                                { id: 3, name: 'Reader experience', value: 'Customisable' },
                                { id: 4, name: 'Filtering options', value: 'Dynamic' },
                            ].map((stat) => (
                                <div
                                    key={stat.id}
                                    className={`border-l-2 border-accent-foreground p-4 pr-0 flex flex-col justify-center [@media(min-width:440px)]:gap-2 w-full md:w-fit md:items-start [@media(max-width:440px)]:items-start items-center`}
                                >
                                    <p className="[@media(min-width:440px)]:text-2xl text-md font-semibold tracking-tight text-foreground">
                                        {stat.value}
                                    </p>
                                    <p className="text-accent-foreground font-bold [@media(min-width:440px)]:text-lg text-sm">
                                        {stat.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <footer className="w-full bg-primary/10 py-2 sm:py-2 text-center text-sm text-muted-foreground flex flex-row gap-2 justify-center items-center flex-wrap">
                <p className="flex items-center gap-2">
                    &copy; {new Date().getFullYear()} Poem Base
                    <span className="sm:inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
                </p>

                <p className="flex items-center gap-2">
                    <a href="/privacy" className="hover:underline">
                        Privacy
                    </a>
                    <span className="sm:inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
                </p>
                <p className="flex items-center gap-2">
                    <a href="https://github.com/MargauxThw/poem-base" className="hover:underline">
                        Source
                    </a>
                    <span className="sm:inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
                </p>
                <p>
                    {' '}
                    By{' '}
                    <a
                        href="https://buymeacoffee.com/figmargaux"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Margaux
                    </a>
                </p>
            </footer>
        </>
    );
}
