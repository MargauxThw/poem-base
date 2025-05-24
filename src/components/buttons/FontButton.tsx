import { useMemo } from 'react';
import { FONT_OPTIONS } from '../../utils/staticData';
import { Button } from '../ui/button';

type FontButtonProps = {
    index: number;
    currentFontIndex: number;
    updateFont: (index: number) => void;
};

export default function FontButton({ index, currentFontIndex, updateFont }: FontButtonProps) {
    const isActive = useMemo(() => {
        return currentFontIndex === index;
    }, [currentFontIndex, index]);

    function handleFontChange(newIndex: number) {
        updateFont(newIndex);
    }

    return (
        <Button
            variant={'ghost'}
            onClick={() => handleFontChange(index)}
            style={{
                fontFamily: FONT_OPTIONS[index].value,
            }}
            className={`border-none bg-transparent cursor-pointer h-16 flex flex-col items-center justify-center gap-1 outline-none px-2 ${isActive ? 'text-primary' : 'text-foreground'}`}
        >
            <p
                style={{
                    fontSize: '1.5rem',
                    textDecorationLine: isActive ? 'underline' : 'none',
                }}
                className={`${isActive ? 'font-bold' : 'font-regular'}`}
            >
                Aa
            </p>
            <p
                style={{
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                }}
                className={`${isActive ? 'font-bold' : 'font-regular'}`}
            >
                {FONT_OPTIONS[index].shortLabel}
            </p>
        </Button>
    );
}
