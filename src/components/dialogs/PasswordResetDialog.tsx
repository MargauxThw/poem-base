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
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Alert, AlertTitle } from '../ui/alert';
import { toast } from 'sonner';

interface PasswordResetDialogProps {
    onPasswordUpdate: (length: number) => void;
}

export default function PasswordResetDialog({ onPasswordUpdate }: PasswordResetDialogProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setPasswordError('');
            setHasError(false);
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');

        try {
            setIsLoading(true);
            await resetPassword(currentPassword, newPassword);
            onPasswordUpdate(newPassword.length);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setIsOpen(false);
            setPasswordError('');
            setHasError(false);
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            setIsLoading(false);

            toast.success('Your password has been updated successfully');
        } catch (error) {
            if (error instanceof Error && error.message.includes('auth/invalid-credential')) {
                setPasswordError('Incorrect current password');
                setHasError(true);
            } else {
                setPasswordError('Failed to update password');
                setHasError(true);
            }
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
            </DialogTrigger>
            <DialogContent className={`${isLoading ? 'blur-sm ' : ''}`}>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Enter your current password and then choose a new one.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handlePasswordReset}
                    className="flex flex-col items-end gap-4 w-full"
                >
                    {hasError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{passwordError}</AlertTitle>
                        </Alert>
                    )}
                    <div className="flex flex-col gap-4 items-start w-full ">
                        <div className="flex-col gap-2 w-full">
                            <Label htmlFor="email" className="mb-2">
                                Current Password
                            </Label>

                            <div className="flex flex-row items-center gap-2 w-full">
                                <Input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                        </div>
                        <div className="flex-col gap-2 w-full">
                            <Label htmlFor="password" className="mb-2">
                                New Password
                            </Label>
                            <p className="text-muted-foreground text-xs mb-2 pl-0.5">
                                {'Must be at least 8 characters and include a special character'}
                            </p>
                            <div className="flex flex-row items-center gap-2 w-full">
                                <Input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="flex-grow"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <EyeOff /> : <Eye />}
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
                            {newPassword.length <= 8 || !/\W/.test(newPassword)
                                ? 'New password does not meet requirements'
                                : confirmPassword && newPassword !== confirmPassword
                                  ? 'Passwords do not match'
                                  : ''}
                        </p>
                    </div>

                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                newPassword !== confirmPassword ||
                                newPassword.length <= 8 ||
                                !/\W/.test(newPassword)
                            }
                        >
                            Change Password
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
