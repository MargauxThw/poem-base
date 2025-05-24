import { useMemo } from 'react';
import { THEME_OPTIONS } from '../../utils/staticData';
import { Button } from '../ui/button';

type ThemeButtonProps = {
    index: number;
    currentThemeIndex: number;
    updateTheme: (index: number) => void;
};

export default function ThemeButton({ index, currentThemeIndex, updateTheme }: ThemeButtonProps) {
    const isActive = useMemo(() => {
        return currentThemeIndex === index;
    }, [currentThemeIndex, index]);

    function handleThemeChange(newIndex: number) {
        updateTheme(newIndex);
    }

    return (
        // <button
        //     onClick={() => handleThemeChange(index)}
        //     style={{
        //         // outline: currentThemeIndex === index ? '2px solid #1E78BA' : 'none',
        //         background: THEME_OPTIONS[index].background,
        //     }}
        //     className={`border-1 border-solid border-border rounded-full h-9 w-9 ${isActive ? 'outline-primary outline-2' : 'outline-none'} flex items-center justify-center cursor-pointer`}
        // ></button>
        <Button
            variant={'ghost'}
            onClick={() => handleThemeChange(index)}
            className="p-2 flex flex-col items-center justify-center gap-1 h-fit"
            // className={`border-none bg-transparent cursor-pointer h-16 flex flex-col items-center justify-center gap-1 outline-none px-2 ${isActive ? 'text-primary' : 'text-foreground'}`}
        >
            <div
                style={{
                    background: THEME_OPTIONS[index].background,
                }}
                className={`border-1 border-solid border-border rounded-full min-h-9 min-w-9 p-1 ${isActive ? 'outline-primary outline-2' : 'outline-none'}`}
            ></div>
            <p
                style={{
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                }}
                className={`${isActive ? 'font-bold' : 'font-regular'}`}
            >
                {THEME_OPTIONS[index].label}
            </p>
        </Button>
    );
}
