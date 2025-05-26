import { CircleUserRound, Palette } from 'lucide-react';
import DesktopNav from './DesktopNav';
import { Link } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { FONT_OPTIONS, THEME_OPTIONS } from '@/utils/staticData';
import FontButton from '../buttons/FontButton';
import ThemeButton from '../buttons/ThemeButton';
import MobileNav from './MobileNav';
import { useAuthUser } from '@/hooks/useAuthUser';
import { Separator } from '../ui/separator';

type GlobalNavProps = {
    updateFont: (newIndex: number) => void;
    fontIndex: number;
    updateTheme: (newIndex: number) => void;
    themeIndex: number;
};

export default function GlobalNav({
    updateFont,
    fontIndex,
    updateTheme,
    themeIndex,
}: GlobalNavProps) {
    const { user, loading } = useAuthUser();

    if (loading) return null;

    return (
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:px-12 sm:px-4">
            <div className="container-wrapper">
                <div className="container flex h-14 items-center justify-between my-0 mx-auto">
                    <DesktopNav />
                    <MobileNav />
                    <div className="flex flex-1 w-2 items-center gap-2 justify-end">
                        <nav className="flex items-center gap-2 justify-end mr-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Palette />
                                        <span className="sr-only">
                                            Open site style editor panel
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="w-[400px] sm:w-[540px] p-4 max-w-full">
                                    <SheetHeader className="p-0 mt-8">
                                        <SheetTitle>Style editor</SheetTitle>
                                        <SheetDescription>
                                            Customise your reading experience on Poem Base with the
                                            following options
                                        </SheetDescription>
                                    </SheetHeader>
                                    <Separator />
                                    <div>
                                        <h2 className="text-md text-foreground font-semibold pb-2">
                                            Font family
                                        </h2>
                                        <div className="flex flex-row nowrap gap-4 w-full -ml-2">
                                            {FONT_OPTIONS.map((_font, index) => (
                                                <FontButton
                                                    key={index}
                                                    index={index}
                                                    currentFontIndex={fontIndex}
                                                    updateFont={updateFont}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h2 className="text-md text-foreground font-semibold pb-2">
                                            Color palette
                                        </h2>
                                        <div className="flex flex-row nowrap gap-4 w-full -ml-1">
                                            {THEME_OPTIONS.map((_theme, index) => (
                                                <ThemeButton
                                                    key={index}
                                                    index={index}
                                                    currentThemeIndex={themeIndex}
                                                    updateTheme={updateTheme}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                </SheetContent>
                            </Sheet>

                            {user ? (
                                <Link to="/account" className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <CircleUserRound />
                                        <span className="sr-only">Open user account settings</span>
                                    </Button>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <Button variant="outline">Log in</Button>
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
