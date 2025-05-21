import { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import DeleteAccountButton from '../components/buttons/DeleteAccountButton';
import SignOutButton from '../components/buttons/SignOutButton';
import PasswordResetDialog from '../components/dialogs/PasswordResetDialog';

interface UserData {
    likeCount: number;
    email: string;
}

export default function Account() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [passwordLength, setPasswordLength] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
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
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 mt-16">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-gray-900">{userData?.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1 flex items-center justify-between">
                            <p className="text-gray-900 font-mono">
                                {passwordLength ? '•'.repeat(passwordLength) : '••••••••'}
                            </p>
                            <PasswordResetDialog
                                onPasswordUpdate={(length) => setPasswordLength(length)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Liked Poems
                        </label>
                        <p className="mt-1 text-gray-900">{userData?.likeCount || 0} poems</p>
                    </div>
                </div>
            </div>

            <div
                className="shadow rounded-lg p-6 mb-6 border"
                style={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--color-border)',
                    boxShadow: '0 0px 12px 0 var(--shadow-color)',
                }}
            >
                <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium">Sign Out</h3>
                            <p className="text-sm text-gray-500">Sign out of your account</p>
                        </div>
                        <SignOutButton />
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-red-600">Delete Account</h3>
                                <p className="text-sm text-gray-500">
                                    Permanently delete your account and all data
                                </p>
                            </div>
                            <DeleteAccountButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
