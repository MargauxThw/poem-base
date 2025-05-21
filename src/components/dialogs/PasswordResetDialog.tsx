import { useState } from 'react';
import { resetPassword } from '../../services/userService';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface PasswordResetDialogProps {
    onPasswordUpdate: (length: number) => void;
}

export default function PasswordResetDialog({ onPasswordUpdate }: PasswordResetDialogProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setPasswordError('');
            setPasswordSuccess('');
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        // TODO: Make this a list, and get rule from firestore - and be constant not just on button click
        // if (newPassword.length < 6) {
        //     setPasswordError('New password must be at least 6 characters long');
        //     return;
        // }

        try {
            await resetPassword(currentPassword, newPassword);
            setPasswordSuccess('Password updated successfully');
            onPasswordUpdate(newPassword.length);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            // Close dialog after 2 seconds on success
            setTimeout(() => {
                setIsOpen(false);
                setPasswordSuccess('');
                setPasswordError('');
            }, 2000);
        } catch (error) {
            if (error instanceof Error) {
                setPasswordError(error.message);
            } else {
                setPasswordError('Failed to update password');
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Reset Password</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        Enter your current password and choose a new one.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Current Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            >
                                {showCurrentPassword ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            >
                                {showNewPassword ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                    {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}
                    <DialogFooter>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Update Password
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
