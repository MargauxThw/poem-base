import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/utils/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await sendPasswordResetEmail(auth, email, {
                url: `${window.location.origin}/login`,
                handleCodeInApp: true,
            });
            toast.success('Success: If the email is registered, a reset link has been sent to it');
        } catch {
            toast.error('Error sending password reset email, please try again later');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-12 justify-items-center min-h-full p-4 pb-8">
            <main className="w-full max-w-lg h-fit">
                <div className="flex flex-col items-center gap-4 w-full">
                    <h1 className="font-bold text-xl flex-grow p-0 mt-1">Forgot password</h1>
                    <Separator className="my-2" />

                    <form
                        onSubmit={handleResetPassword}
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
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            Send reset password email
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
