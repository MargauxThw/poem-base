// Example in App.tsx or your routes file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import SignUp from './pages/SignUp.tsx';
import MyPoems from './pages/MyPoems.tsx';
import MyPoemsViewer from './pages/MyPoemsViewer';
import { FONT_OPTIONS, THEME_OPTIONS } from './utils/staticData.ts';
import { useEffect, useState } from 'react';
import Account from './pages/Account';
import GlobalNav from './components/nav/GlobalNav.tsx';
import Browse from './pages/Browse.tsx';
import Random from './pages/Random.tsx';
import BrowseViewer from './pages/BrowseViewer.tsx';
import PublicRoute from './routes/PublicRoute.tsx';
import { Toaster } from 'sonner';
import Authors from './pages/Authors.tsx';
import AuthorsViewer from './pages/AuthorsViewer.tsx';
import Privacy from './pages/Privacy.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import EmailVerificationReminder from './hooks/emailVerificationReminder.ts';
import NotFound from './pages/NotFound.tsx';
import Verify from './pages/Verify.tsx';

export default function App() {
    const [fontIndex, setFontIndex] = useState(() => {
        const stored = localStorage.getItem('font_index');
        return stored ? Number(stored) : 0;
    });

    const [themeIndex, setThemeIndex] = useState(() => {
        const stored = localStorage.getItem('theme_index');
        return stored
            ? Number(stored)
            : window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 1
              : 0;
    });

    const updateFavicon = (tempFontIndex?: number, tempThemeIndex?: number) => {
        if (tempFontIndex === undefined) {
            tempFontIndex = fontIndex;
        }
        if (tempThemeIndex === undefined) {
            tempThemeIndex = themeIndex;
        }
        const fontClass = FONT_OPTIONS[tempFontIndex].class;
        const iconPath = `./src/assets/${fontClass}-icon.svg`;

        fetch(iconPath)
            .then((res) => res.text())
            .then((svgText) => {
                const computed = getComputedStyle(document.body);
                const bg = computed.getPropertyValue('--background').trim() || '#fff';
                const fg = computed.getPropertyValue('--accent-foreground').trim() || '#222';

                const newSvg = svgText.replace(/white/g, bg).replace(/black/g, fg);

                const svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(newSvg)))}`;

                let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.head.appendChild(link);
                }
                link.type = 'image/svg+xml';
                link.href = svgDataUrl;
            });
    };

    // const [fontSize, setFontSize] = useState(() => {
    //     const stored = localStorage.getItem('font_size');
    //     return stored ? Number(stored) : 100;
    // });

    // const [lineHeight, setLineHeight] = useState(() => {
    //     const stored = localStorage.getItem('line_height');
    //     return stored ? Number(stored) : 1.5;
    // });

    const updateFont = (newIndex: number) => {
        setFontIndex(newIndex);
        localStorage.setItem('font_index', String(newIndex));
        const font_classes = FONT_OPTIONS.map((f) => f.class);
        document.body.classList.remove(...font_classes);
        document.body.classList.add(font_classes[newIndex]);
        updateFavicon(newIndex, themeIndex);
    };

    const updateTheme = (newIndex: number) => {
        setThemeIndex(newIndex);
        localStorage.setItem('theme_index', String(newIndex));
        const theme_classes = THEME_OPTIONS.map((t) => t.class);
        document.body.classList.remove(...theme_classes);
        document.body.classList.add(theme_classes[newIndex]);
        updateFavicon(fontIndex, newIndex);
    };

    // const updateLineHeight = (newSize: number) => {
    //     setLineHeight(newSize);
    //     localStorage.setItem('line_height', String(newSize));
    // };

    // const updateFontSize = (newSize: number) => {
    //     setFontSize(newSize);
    //     localStorage.setItem('font_size', String(newSize));
    // };

    useEffect(() => {
        updateFont(fontIndex);
        updateTheme(themeIndex);
        updateFavicon(fontIndex, themeIndex);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <EmailVerificationReminder />
            <GlobalNav
                updateFont={updateFont}
                fontIndex={fontIndex}
                updateTheme={updateTheme}
                themeIndex={themeIndex}
                // updateFontSize={updateFontSize}
                // fontSize={fontSize}
                // updateLineHeight={updateLineHeight}
                // lineHeight={lineHeight}
            />

            <div
                style={{
                    width: '100vw',
                    // fontSize: `${fontSize}%`,
                    // lineHeight: `${lineHeight}em`,
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <SignUp />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <PublicRoute>
                                <ForgotPassword />
                            </PublicRoute>
                        }
                    />
                    <Route path="/random" element={<Random />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route
                        path="/my-poems"
                        element={
                            <ProtectedRoute>
                                <MyPoems />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/account"
                        element={
                            <ProtectedRoute>
                                <Account />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-poems/viewer/:slug"
                        element={
                            <ProtectedRoute>
                                <MyPoemsViewer />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/browse/viewer/:slug" element={<BrowseViewer />} />
                    <Route path="/authors/:slug" element={<Authors />} />
                    <Route path="/authors/viewer/:slug" element={<AuthorsViewer />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Toaster />
        </BrowserRouter>
    );
}
