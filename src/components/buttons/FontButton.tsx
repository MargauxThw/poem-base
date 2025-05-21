import { FONT_OPTIONS } from '../../utils/staticData';

type FontButtonProps = {
    index: number;
    currentFontIndex: number;
    updateFont: (index: number) => void;
};

export default function FontButton({ index, currentFontIndex, updateFont }: FontButtonProps) {
    function handleFontChange(newIndex: number) {
        updateFont(newIndex);
    }

    return (
        <button
            onClick={() => handleFontChange(index)}
            style={{
                border: 'none',
                color: currentFontIndex === index ? '#1E78BA' : 'black',
                background: 'transparent',
                cursor: 'pointer',
                height: '64px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                outline: 'none',
                padding: '0',
                flexGrow: 1,
                fontFamily: FONT_OPTIONS[index].value,
            }}
        >
            <p
                style={{
                    fontSize: '1.5rem',
                    textDecorationLine: currentFontIndex === index ? 'underline' : 'none',
                }}
            >
                Aa
            </p>
            <p
                style={{
                    color: currentFontIndex === index ? '#1E78BA' : 'black',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                }}
            >
                {FONT_OPTIONS[index].shortLabel}
            </p>
        </button>
    );
}
