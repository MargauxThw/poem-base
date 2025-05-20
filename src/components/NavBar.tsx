import { Link } from 'react-router-dom';
import { FONT_OPTIONS, THEME_OPTIONS } from '../utils/staticData';
import FontButton from './buttons/FontButton';
import ThemeButton from './buttons/ThemeButton';
import FontSizeSlider from './sliders/FontSizeSlider';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import LineHeightSlider from './sliders/LineHeightSlider';
import { Button } from './ui/button';
import { Palette } from 'lucide-react';

type NavBarProps = {
    updateFont: (newIndex: number) => void;
    fontIndex: number;
    updateTheme: (newIndex: number) => void;
    themeIndex: number;
    updateFontSize: (newSize: number) => void;
    fontSize: number;
    updateLineHeight: (newSize: number) => void;
    lineHeight: number;
};

export default function NavBar({
    updateFont,
    fontIndex,
    updateTheme,
    themeIndex,
    updateFontSize,
    fontSize,
    updateLineHeight,
    lineHeight,
}: NavBarProps) {
    return (
        <nav
            style={{
                display: 'flex',
                gap: '10px',
                padding: '10px',
                backgroundColor: '#f0f0f0',
                borderBottom: '1px solid #ccc',
                width: '100vw',
                position: 'fixed',
                top: 0,
            }}
        >
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Log in</Link>
            <Link to="/my-poems">My Poems</Link>
            <Link to="/account">Account</Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Palette />
                        <span className="sr-only">Edit theme</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] p-4">
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
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
                    <div className="mb-4 w100%">
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
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
