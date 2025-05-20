import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function DesktopNav() {
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            setUser(u);
        });
        return unsubscribe;
    }, []);

    return (
        <div className="hidden md:flex">
            <Link to="/" className="mr-4 flex items-center gap-0 md:mr-12">
                <span className={`text-3xl md:inline-block mr-2`}>{'Poem Base'}</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm md:gap-10">
                <Link
                    to="/random"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith('/random')
                            ? 'font-bold border-b-2 border-b-primary'
                            : 'text-foreground/80'
                    )}
                >
                    Random
                </Link>
                <Link
                    to="/browse"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith('/browse')
                            ? 'font-bold border-b-2 border-b-primary'
                            : 'text-foreground/80'
                    )}
                >
                    Browse
                </Link>
                {user && (
                    <Link
                        to="/my-poems"
                        className={cn(
                            'transition-colors hover:text-foreground/80',
                            pathname?.startsWith('/my-poems')
                                ? 'font-bold border-b-2 border-b-primary'
                                : 'text-foreground/80'
                        )}
                    >
                        My Poems
                    </Link>
                )}
            </nav>
        </div>
    );
}
