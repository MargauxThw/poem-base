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
import LineHeightSlider from '../sliders/LineHeightSlider';
import { FONT_OPTIONS, THEME_OPTIONS } from '@/utils/staticData';
import FontButton from '../buttons/FontButton';
import ThemeButton from '../buttons/ThemeButton';
import FontSizeSlider from '../sliders/FontSizeSlider';
import MobileNav from './MobileNav';
import { useAuthUser } from '@/hooks/useAuthUser';

type GlobalNavProps = {
    updateFont: (newIndex: number) => void;
    fontIndex: number;
    updateTheme: (newIndex: number) => void;
    themeIndex: number;
    updateFontSize: (newSize: number) => void;
    fontSize: number;
    updateLineHeight: (newSize: number) => void;
    lineHeight: number;
};

export default function GlobalNav({
    updateFont,
    fontIndex,
    updateTheme,
    themeIndex,
    // updateFontSize,
    // fontSize,
    // updateLineHeight,
    // lineHeight,
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
                                <SheetContent className="w-[400px] sm:w-[540px] p-4">
                                    <SheetHeader>
                                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                                        <SheetDescription>
                                            This action cannot be undone. This will permanently
                                            delete your account and remove your data from our
                                            servers.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            flexWrap: 'nowrap',
                                            gap: '4px',
                                            width: '100%',
                                            backgroundColor: 'bg-amber-400',
                                        }}
                                    >
                                        {FONT_OPTIONS.map((_font, index) => (
                                            <FontButton
                                                key={index}
                                                index={index}
                                                currentFontIndex={fontIndex}
                                                updateFont={updateFont}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-row justify-between items-center mb-4 w100%">
                                        {THEME_OPTIONS.map((_theme, index) => (
                                            <ThemeButton
                                                key={index}
                                                index={index}
                                                currentThemeIndex={themeIndex}
                                                updateTheme={updateTheme}
                                            />
                                        ))}
                                    </div>
                                    {/* <div className="mb-4 w100%">
                                        <FontSizeSlider
                                            currentFontSize={fontSize}
                                            updateFontSize={updateFontSize}
                                        />
                                    </div>
                                    <div className="mb-4 w100%">
                                        <LineHeightSlider
                                            currentLineHeight={lineHeight}
                                            updateLineHeight={updateLineHeight}
                                        />
                                    </div> */}
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
                                    <Button variant="ghost">Log in</Button>
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
