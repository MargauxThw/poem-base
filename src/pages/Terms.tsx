import { Separator } from '@/components/ui/separator';

export default function Terms() {
    return (
        <div className="mt-12 flex justify-center min-h-full p-4 pb-8 animate-blur-in">
            <main className="w-full max-w-lg h-fit">
                <h2 className="font-medium text-xl flex-grow p-0 mt-1">Terms of Service</h2>
                <Separator className="flex w-full my-4" />
                <div className="flex flex-col gap-2 text-sm font-regular">
                    <p className="text-xs font-semibold mb-4 text-muted-foreground">
                        Effective date: 30 May 2025
                    </p>

                    <p>
                        Welcome to Poem Base! By using this website (
                        <a
                            href="https://poem-base.com"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            poem-base.com
                        </a>
                        ), you agree to the following terms. Please read them carefully.
                    </p>

                    <Separator className="my-4" />

                    <h2 className="text-md font-bold mt-2">1. Using Poem Base</h2>
                    <p>
                        Poem Base is a personal poetry archive where users can save their favorite
                        poems.
                    </p>
                    <p>
                        You agree to use Poem Base in a respectful and lawful way. Don’t try to
                        hack, overload, or otherwise harm the site.
                    </p>

                    <h2 className="text-md font-bold mt-2">2. Accounts and Data</h2>
                    <p>
                        We collect your email address via Firebase Authentication to let you save
                        poems.
                    </p>
                    <p>
                        You can delete your account and saved poems at any time through the account
                        page. Deleting your account permanently removes your data from our system.
                    </p>

                    <h2 className="text-md font-bold mt-2">3. Content</h2>
                    <p>
                        Poem Base serves poem data from{' '}
                        <a
                            href="https://poetrydb.org/"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            PoetryDB
                        </a>
                        , which is licensed under the GNU General Public License v2.0.
                    </p>
                    <p>
                        We do not claim ownership over the poems themselves. All rights remain with
                        the original authors or their estates, where applicable.
                    </p>

                    <h2 className="text-md font-bold mt-2">4. Availability</h2>
                    <p>
                        We aim to keep Poem Base running smoothly, but the site may occasionally go
                        offline for maintenance or due to technical issues. We’re not liable for any
                        loss of saved data, though we do our best to prevent that from happening.
                    </p>

                    <h2 className="text-md font-bold mt-2">5. Changes to These Terms</h2>
                    <p>
                        We may update these terms occasionally. If the changes are significant,
                        we’ll let you know via the site. Continuing to use Poem Base after changes
                        means you accept the new terms.
                    </p>

                    <h2 className="text-md font-bold mt-2">6. Contact Us</h2>
                    <p>
                        Have questions or feedback? You can reach us at{' '}
                        <a href="mailto:figmargaux@gmail.com" className="underline">
                            figmargaux@gmail.com
                        </a>
                        .
                    </p>
                </div>
            </main>
        </div>
    );
}
