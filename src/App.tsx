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
    };

    const updateTheme = (newIndex: number) => {
        setThemeIndex(newIndex);
        localStorage.setItem('theme_index', String(newIndex));
        const theme_classes = THEME_OPTIONS.map((t) => t.class);
        document.body.classList.remove(...theme_classes);
        document.body.classList.add(theme_classes[newIndex]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
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
                    {/* <Route path="/poem/:slug" element={<PoemPage />} /> */}
                    <Route
                        path="/my-poems/viewer/:slug"
                        element={
                            <ProtectedRoute>
                                <MyPoemsViewer />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/browse/viewer/:slug" element={<BrowseViewer />} />
                </Routes>
            </div>
            <Toaster />
        </BrowserRouter>
    );
}
