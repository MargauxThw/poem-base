import { useEffect, useState } from 'react';
import { auth } from '../utils/firebaseConfig';

export function useAuthUser() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            setUser(u);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return { user, loading };
}
