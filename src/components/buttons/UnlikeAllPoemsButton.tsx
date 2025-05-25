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
import { toast } from 'sonner';
import { unlikeAllPoems } from '@/services/likeService';

type UnlikeAllPoemsButtonProps = {
    fetchUserData: () => Promise<void>;
};

export default function UnlikeAllPoemsButton({ fetchUserData }: UnlikeAllPoemsButtonProps) {
    const [isUnliking, setIsUnliking] = useState(false);

    return (
        <AlertDialog open={isUnliking} onOpenChange={setIsUnliking}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Unlike All Poems</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove your likes from
                        all poems.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            setIsUnliking(false);
                        }}
                        asChild
                    >
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            try {
                                await unlikeAllPoems();
                                await fetchUserData();
                                toast.success('All poems successfully unliked');
                            } catch {
                                await fetchUserData();
                                toast.error('There was an error while unliking all poems');
                            } finally {
                                setIsUnliking(false);
                            }
                        }}
                        asChild
                    >
                        <Button variant="ghost">Unlike All Poems</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
