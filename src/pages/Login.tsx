import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { ensureUserDoc } from '../services/userService';
import { likePoem } from '@/services/likeService';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            await ensureUserDoc();
            const toLike = JSON.parse(localStorage.getItem('to like') || 'null');
            if (toLike) {
                localStorage.removeItem('to like');
                await likePoem(toLike);
            }
            navigate('/my-poems');
        } catch (err: unknown) {
            if (err instanceof Error && err.message.includes('auth/invalid-credential')) {
                setError('Your email or password is incorrect');
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="mt-12 justify-items-center min-h-full p-4 pb-8">
            <main className="w-full max-w-lg h-fit">
                <div className="flex flex-col items-center gap-4 w-full">
                    <h1 className="font-bold text-xl flex-grow p-0 mt-1">Log in</h1>
                    <Separator className="my-2" />
                    {error && (
                        <Alert variant="destructive" className="max-w-sm">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center gap-4 w-full max-w-sm bg-transparent p-4 rounded-md border border-muted"
                    >
                        <div className="flex flex-col gap-4 items-start w-full ">
                            <div className="flex-col gap-2 w-full">
                                <Label htmlFor="email" className="mb-2">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-col gap-2 w-full">
                                <Label htmlFor="password" className="mb-2">
                                    Password
                                </Label>
                                <div className="flex flex-row items-center gap-2 w-full">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="flex-grow"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Log in
                        </Button>
                        <Link to="/signup">
                            <Button variant={'link'}>Don't have an account? Sign up</Button>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    );
}
