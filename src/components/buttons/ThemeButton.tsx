import { THEME_OPTIONS } from '../../utils/staticData';

type ThemeButtonProps = {
    index: number;
    currentThemeIndex: number;
    updateTheme: (index: number) => void;
};

export default function ThemeButton({ index, currentThemeIndex, updateTheme }: ThemeButtonProps) {
    function handleThemeChange(newIndex: number) {
        updateTheme(newIndex);
    }

    return (
        <button
            onClick={() => handleThemeChange(index)}
            style={{
                border: '1px solid #ccc',
                borderRadius: '100px',
                height: '36px',
                width: '36px',
                outline: currentThemeIndex === index ? '2px solid #1E78BA' : 'none',
                background: THEME_OPTIONS[index].background,
            }}
        ></button>
    );
}
