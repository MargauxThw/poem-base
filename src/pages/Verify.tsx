import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuthUser } from '@/hooks/useAuthUser';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Verify() {
    const { user, loading } = useAuthUser();
    const navigate = useNavigate();

    if (loading) {
        return null;
    }

    if (!loading && !user) {
        return (
            <div className="mt-12 justify-items-center min-h-full p-4 pb-8">
                <main className="w-full max-w-lg h-fit">
                    <div className="flex flex-col items-center gap-4 w-full">
                        <h1 className="font-bold text-xl flex-grow p-0 mt-1">Verify your email</h1>
                        <Separator className="my-2" />
                        <p className="text-md font-bold">
                            You need to be logged in to verify your email.
                        </p>
                        <Separator className="my-2" />
                        <div className="mt-2 flex items-center justify-center gap-4 flex-wrap">
                            <Button
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                Log in
                            </Button>
                            <Button
                                variant={'outline'}
                                onClick={() => {
                                    navigate('/signup');
                                }}
                            >
                                Sign up
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="mt-12 justify-items-center min-h-full p-4 pb-8">
            <main className="w-full max-w-lg h-fit">
                <div className="flex flex-col items-center gap-4 w-full">
                    <h1 className="font-bold text-xl flex-grow p-0 mt-1">{`${user?.emailVerified ? 'Your email has been verified' : 'Verify your email'}`}</h1>
                    <Separator className="my-2" />
                    <p className="text-md font-bold">
                        {`${!user ? 'You need to be logged in to verify your email.' : !user.emailVerified ? "Please check your email for a verification link. You'll be able to like poems once you've verified your email." : "You're all set up! You can now like poems and enjoy the full experience."}`}
                    </p>
                    {user && !user.emailVerified && (
                        <p className="text-sm text-foreground-muted">
                            If you haven't received an email, please check your spam folder or try
                            resending the verification link.
                        </p>
                    )}
                    <Separator className="my-2" />
                    <div className="mt-2 flex items-center justify-center gap-4 flex-wrap">
                        {!user ? (
                            <>
                                <Button
                                    onClick={() => {
                                        navigate('/login');
                                    }}
                                >
                                    Log in
                                </Button>
                                <Button
                                    variant={'outline'}
                                    onClick={() => {
                                        navigate('/signup');
                                    }}
                                >
                                    Sign up
                                </Button>
                            </>
                        ) : !user.emailVerified ? (
                            <>
                                <Button
                                    onClick={() => {
                                        if (!user) {
                                            toast.error('There was an error: Please log in again.');
                                            return;
                                        }
                                        sendEmailVerification(user, {
                                            url: `${window.location.origin}/verify`,
                                            handleCodeInApp: true,
                                        })
                                            .then(() => {
                                                toast.success('Verification email sent');
                                            })
                                            .catch((err: Error) => {
                                                toast.error(
                                                    'Failed to send email: ' + err?.message ||
                                                        'Unknown error'
                                                );
                                            });
                                    }}
                                >
                                    Resend verification
                                </Button>
                                <Button
                                    variant={'outline'}
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                >
                                    Refresh
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/browse')}>Start browsing</Button>
                                <Button
                                    variant={'outline'}
                                    onClick={() => {
                                        navigate('/random');
                                    }}
                                >
                                    I'm feeling lucky
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
