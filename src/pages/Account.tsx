import { useEffect, useState } from 'react';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import DeleteAccountButton from '../components/buttons/DeleteAccountButton';
import SignOutButton from '../components/buttons/SignOutButton';
import PasswordResetDialog from '../components/dialogs/PasswordResetDialog';
import { useAuthUser } from '@/hooks/useAuthUser';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface UserData {
    likeCount: number;
    email: string;
}

export default function Account() {
    const { user, loading } = useAuthUser();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [dbLoading, setDBLoading] = useState<boolean>(true);
    const [passwordLength, setPasswordLength] = useState<number | null>(null);

    useEffect(() => {
        setDBLoading(true);
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

        fetchUserData();
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
                            <label className="block text-sm font-medium">Email</label>
                            <p className="mt-1 text-gray-900">{userData?.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <div className="mt-1 flex items-center justify-between gap-2">
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
                            <label className="block text-sm font-medium">Liked Poems</label>
                            <div className="mt-1 flex items-center justify-between">
                                <p className="mt-1">{userData?.likeCount || 0} poems</p>
                                {/* TODO: Make this like the delete button with an are you sure dialog */}
                                <Button variant="outline">Unlike all</Button>
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

        // <div className="mt-12 justify-items-center min-h-full p-4 pb-8 animate-blur-in">
        //     <main className="w-full max-w-lg h-fit">
        //         <div className="flex flex-col items-start sm:items-start gap-4 w-full">
        //             <div className="flex flex-row w-full justify-between align-middle flex-wrap mb-0 gap-2">
        //                 <h2 className="font-bold text-xl flex-grow p-0 mt-1">Browse</h2>
        //                 <Separator className="flex sm:hidden sm:w-full my-2" />
        //                 <div className="flex flex-row gap-2">
        //                     <Select
        //                         value={sortMode}
        //                         onValueChange={(value) =>
        //                             setSortMode(
        //                                 Object.values(SORTING_OPTIONS_POEMS).find(
        //                                     (v) => v === value
        //                                 ) || sortMode
        //                             )
        //                         }
        //                     >
        //                         <SelectTrigger>
        //                             <span className="text-muted-foreground">Sort:</span>
        //                             <SelectValue />
        //                         </SelectTrigger>
        //                         <SelectContent>
        //                             {Object.values(SORTING_OPTIONS_POEMS).map((option, index) => (
        //                                 <SelectItem key={index} value={option}>
        //                                     {option}
        //                                 </SelectItem>
        //                             ))}
        //                         </SelectContent>
        //                     </Select>
        //                     <FilterDialog initiateFetch={fetchBrowsePoems} urlSuffix={'_browse'} />
        //                 </div>
        //             </div>

        //             <Separator />
        //             {sortedPoems.length === 0 && (
        //                 <div className="justify-items-center min-h-full w-full p-4 py-8 animate-blur-wiggle-in">
        //                     <p>{errorMessage}</p>
        //                 </div>
        //             )}

        //             {sortedPoems && sortedPoems.length > 0 && (
        //                 <div className={`flex flex-col gap-4 w-full animate-blur-in`}>
        //                     <p className="border-0 text-muted-foreground text-end px-0 py-0 text-xs">
        //                         {hasFilters
        //                             ? `Poems ${currentPage === 1 ? 1 : currentPage * 10 - 10 + 1} to ${
        //                                   currentPage * 10 >= sortedPoems.length
        //                                       ? sortedPoems.length
        //                                       : currentPage * 10
        //                               } (of ${sortedPoems.length} result${sortedPoems.length === 1 ? '' : 's'})`
        //                             : `No filters selected, showing 10 random poems`}
        //                     </p>

        //                     {sortedPoems
        //                         .slice(
        //                             currentPage === 1 ? 0 : currentPage * 10 - 10,
        //                             currentPage * 10 >= sortedPoems.length
        //                                 ? sortedPoems.length
        //                                 : currentPage * 10
        //                         )
        //                         .map((poem, index) => {
        //                             return (
        //                                 <PoemCard
        //                                     key={index}
        //                                     poem={poem}
        //                                     heart={
        //                                         likedPoemsFromDB.find(
        //                                             (p) => getLikeId(p) === getLikeId(poem)
        //                                         )
        //                                             ? true
        //                                             : false
        //                                     }
        //                                     openPoem={() =>
        //                                         navigate(`/browse/viewer/${getLikeId(poem)}`)
        //                                     }
        //                                 />
        //                             );
        //                         })}
        //                 </div>
        //             )}

        //             {totalPages !== 1 && sortedPoems.length > 0 && (
        //                 <>
        //                     <Separator />
        //                     <PoemListPagination
        //                         currentPage={currentPage}
        //                         totalPages={totalPages}
        //                         setCurrentPage={changePage}
        //                     />
        //                 </>
        //             )}
        //         </div>
        //     </main>
        // </div>
    );
}
