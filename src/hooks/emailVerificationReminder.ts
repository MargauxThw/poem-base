import { useEffect } from 'react';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';

export default function EmailVerificationReminder() {
    const location = useLocation();

    useEffect(() => {
        const user = auth.currentUser;
        if (user && !user.emailVerified) {
            toast('Verify your email', {
                description:
                    'Check your inbox to verify your email before you can start liking poems',
                action: {
                    label: 'Resend link',
                    onClick: () => {
                        sendEmailVerification(user, {
                            url: `${window.location.origin}/`,
                            handleCodeInApp: true,
                        })
                            .then(() => {
                                toast.success('Verification email sent');
                            })
                            .catch((err) => {
                                toast.error('Failed to send email: ' + err.message);
                            });
                    },
                },
                // duration: 10000,
            });
        }
    }, [location]);

    return null;
}
