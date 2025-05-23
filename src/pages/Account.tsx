import { useEffect, useState } from 'react';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import DeleteAccountButton from '../components/buttons/DeleteAccountButton';
import SignOutButton from '../components/buttons/SignOutButton';
import PasswordResetDialog from '../components/dialogs/PasswordResetDialog';
import { useAuthUser } from '@/hooks/useAuthUser';
import { Separator } from '@/components/ui/separator';
import UnlikeAllPoemsButton from '@/components/buttons/UnlikeAllPoemsButton';

interface UserData {
    likeCount: number;
    email: string;
}

export default function Account() {
    const { user, loading } = useAuthUser();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [dbLoading, setDBLoading] = useState<boolean>(true);
    const [passwordLength, setPasswordLength] = useState<number | null>(null);

    const fetchUserData = async () => {
        if (!user) return;

        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                setUserData({
                    likeCount: userDoc.data().likeCount || 0,
                    email: user.email || 'email not found',
                });
                // Get password length from user metadata if available
                setPasswordLength(userDoc.data().passwordLength || null);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setDBLoading(false);
        }
    };

    useEffect(() => {
        setDBLoading(true);
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || dbLoading) {
        return null;
    }

    return (
        <div className="mt-12 justify-items-center min-h-full p-4 pb-8">
            <main className="w-full max-w-lg h-fit">
                <div className="flex flex-col gap-4 w-full">
                    <h1 className="font-bold text-xl flex-grow p-0 mt-1">Account</h1>
                    <Separator className="my-2" />
                    <div className="rounded-md border border-muted p-4 bg-card flex flex-col gap-4">
                        <h2 className="text-lg font-semibold">Profile Information</h2>
                        <Separator />
                        <div>
                            <label className="block text-md font-medium">Email</label>
                            <p className="text-sm font-regular">{userData?.email}</p>
                        </div>
                        <Separator />
                        <div>
                            <label className="block text-md font-medium">Password</label>
                            <div className="flex items-center justify-between gap-2">
                                <p className="font-mono overflow-hidden mt-2">
                                    {passwordLength ? '•'.repeat(passwordLength) : '••••••••'}
                                </p>
                                <PasswordResetDialog
                                    onPasswordUpdate={(length) => setPasswordLength(length)}
                                />
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <label className="block text-md font-medium">My Poems</label>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-regular">
                                    {`${userData?.likeCount || 0} poem${userData?.likeCount === 1 ? '' : 's'}`}
                                </p>
                                <UnlikeAllPoemsButton fetchUserData={fetchUserData} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-muted p-4 bg-card flex flex-col gap-4">
                        <h2 className="text-lg font-semibold">Account Actions</h2>
                        <Separator />
                        <div className="space-y-4">
                            <div className="flex items-center justify-between flex-row gap-4">
                                <div>
                                    <h3 className="text-md font-medium">Sign Out</h3>
                                    <p className="text-sm font-regular ">
                                        Sign out of your account in this browser
                                    </p>
                                </div>
                                <SignOutButton />
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between flex-row gap-4">
                                    <div>
                                        <h3 className="text-md font-medium">Delete Account</h3>
                                        <p className="text-sm font-regular">
                                            Permanently delete your account and all data
                                        </p>
                                    </div>
                                    <DeleteAccountButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
