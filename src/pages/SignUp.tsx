import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { ensureUserDoc } from '../services/userService';
import { likePoem } from '@/services/likeService';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, EyeOff, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            if (auth.currentUser && !auth.currentUser.emailVerified) {
                sendEmailVerification(auth.currentUser, {
                    url: `${window.location.origin}/`,
                    handleCodeInApp: true,
                })
                    .then(() => {
                        toast.success('Verification email sent.');
                    })
                    .catch(() => {
                        toast.error('Error sending verification email.');
                    });
            }
            toast.success(
                'Account creation successful: Please check your email to verify your account before liking poems.'
            );
            await ensureUserDoc();
            const toLike = JSON.parse(localStorage.getItem('to like') || 'null');
            if (toLike) {
                localStorage.removeItem('to like');
                await likePoem(toLike);
            }
            navigate('/my-poems');
        } catch (err: unknown) {
            if (err instanceof Error && err.message.includes('auth/email-already-in-use')) {
                setError('This email is already in use');
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="mt-12 justify-items-center min-h-full p-4 pb-8">
            <main className="w-full max-w-lg h-fit">
                <div className="flex flex-col items-center gap-4 w-full">
                    <h1 className="font-bold text-xl flex-grow p-0 mt-1">Sign up</h1>
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
                                <p className="text-muted-foreground text-xs mb-2 pl-0.5">
                                    {
                                        'Must be at least 8 characters and include a special character'
                                    }
                                </p>
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
                            <div className="flex-col gap-2 w-full">
                                <Label htmlFor="password" className="mb-2">
                                    Confirm password
                                </Label>
                                <div className="flex flex-row items-center gap-2 w-full">
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="flex-grow"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="h-4">
                            <p className="text-muted-foreground text-xs mb-2">
                                {!email.includes('@') || !email.split('@')[1].includes('.')
                                    ? 'Your email is not valid'
                                    : password.length <= 8 || !/\W/.test(password)
                                      ? 'Password does not meet requirements'
                                      : confirmPassword && password !== confirmPassword
                                        ? 'Passwords do not match'
                                        : ''}
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={
                                password !== confirmPassword ||
                                password.length <= 8 ||
                                !/\W/.test(password) ||
                                !email.includes('@') ||
                                !email.split('@')[1].includes('.')
                            }
                        >
                            Sign up
                        </Button>
                        <Link to="/login">
                            <Button variant={'link'}>Already have an account? Log in</Button>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    );
}
