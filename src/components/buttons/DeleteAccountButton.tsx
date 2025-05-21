import { deleteUserAccount } from '@/services/userService';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
export default function DeleteAccountButton() {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            setIsDeleting(false);
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        style={{ color: 'red' }}
                        onClick={async () => {
                            await deleteUserAccount();
                            setIsDeleting(false);
                            console.log('Account deleted ON BUTTON');
                        }}
                    >
                        Delete Account
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
