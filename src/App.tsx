// Example in App.tsx or your routes file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import SignUp from './pages/SignUp.tsx';
import PublicRoute from './routes/PublicRoute.tsx';
import NavBar from './components/NavBar.tsx';
import MyPoems from './pages/MyPoems.tsx';
import PoemPage from './pages/Poem.tsx';
import MyPoemsViewer from './pages/MyPoemsViewer';
import { FONT_OPTIONS, THEME_OPTIONS } from './utils/staticData.ts';
import { useState } from 'react';
import Account from './pages/Account';

export default function App() {
    const [fontIndex, setFontIndex] = useState(() => {
        const stored = localStorage.getItem('font_index');
        return stored ? Number(stored) : 0;
    });

    const [themeIndex, setThemeIndex] = useState(() => {
        const stored = localStorage.getItem('theme_index');
        return stored ? Number(stored) : 0;
    });

    const [fontSize, setFontSize] = useState(() => {
        const stored = localStorage.getItem('font_size');
        return stored ? Number(stored) : 100;
    });

    const [lineHeight, setLineHeight] = useState(() => {
        const stored = localStorage.getItem('line_height');
        return stored ? Number(stored) : 1.5;
    });

    function updateFont(newIndex: number) {
        setFontIndex(newIndex);
        localStorage.setItem('font_index', String(newIndex));
    }

    function updateTheme(newIndex: number) {
        setThemeIndex(newIndex);
        localStorage.setItem('theme_index', String(newIndex));
    }

    function updateLineHeight(newSize: number) {
        setLineHeight(newSize);
        localStorage.setItem('line_height', String(newSize));
    }

    function updateFontSize(newSize: number) {
        setFontSize(newSize);
        localStorage.setItem('font_size', String(newSize));
    }

    return (
        <BrowserRouter>
            <NavBar
                updateFont={updateFont}
                fontIndex={fontIndex}
                updateTheme={updateTheme}
                themeIndex={themeIndex}
                updateFontSize={updateFontSize}
                fontSize={fontSize}
                updateLineHeight={updateLineHeight}
                lineHeight={lineHeight}
            />
            {/* TODO: Add some options for line height ALSO fix nav bar and move all of this into a pop-up */}
            {/* TODO: Experiment with just doing it for the poem text (not buttons) */}

            <div
                style={{
                    fontFamily: FONT_OPTIONS[fontIndex].value,
                    background: THEME_OPTIONS[themeIndex].background,
                    color: THEME_OPTIONS[themeIndex].color,
                    width: '100vw',
                    fontSize: `${fontSize}%`,
                    lineHeight: `${lineHeight}em`,
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
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
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
                    <Route path="/poem/:slug" element={<PoemPage />} />
                    <Route
                        path="/my-poems/viewer/:slug"
                        element={
                            <ProtectedRoute>
                                <MyPoemsViewer />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
