import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthUser } from '@/hooks/useAuthUser';

export default function DesktopNav() {
    const { user, loading } = useAuthUser();
    const location = useLocation();
    const pathname = location.pathname;

    if (loading) return null;

    return (
        <div className="hidden md:flex">
            <Link to="/" className="mr-4 flex items-center gap-0 md:mr-12">
                <span className={`text-2xl tracking-tight md:inline-block mr-2 font-semibold`}>
                    {'Poem Base'}
                </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm md:gap-10">
                <Link
                    to="/random"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith('/random')
                            ? 'font-bold border-b-2 border-b-primary'
                            : 'font-semibold text-foreground/100'
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
                            : 'font-semibold text-foreground/100'
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
                                : 'font-semibold text-foreground/100'
                        )}
                    >
                        My Poems
                    </Link>
                )}
            </nav>
        </div>
    );
}
