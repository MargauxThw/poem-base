import { useEffect } from 'react';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';
import { useAuthUser } from './useAuthUser';

export default function EmailVerificationReminder() {
    const location = useLocation();
    const { user, loading } = useAuthUser();

    useEffect(() => {
        if (loading || !user || location.pathname.includes('/verify')) {
            return; // Don't show reminder if user is loading or not logged in or already on the verify page
        }
        if (user && !user.emailVerified) {
            toast('Verify your email', {
                description:
                    'Check your inbox to verify your email before you can start liking poems',
                action: {
                    label: 'Resend link',
                    onClick: () => {
                        sendEmailVerification(user, {
                            url: `${window.location.origin}/verify`,
                            handleCodeInApp: true,
                        })
                            .then(() => {
                                toast.success('Verification email sent');
                            })
                            .catch((err) => {
                                toast.error(
                                    'Failed to send email: ' + (err as Error)?.message ||
                                        'Unknown error'
                                );
                            });
                    },
                },
            });
        }
    }, [user, loading, location.pathname]);

    return null;
}
