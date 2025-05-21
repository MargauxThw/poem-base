// You can place this Sign Out button in any component, e.g., Dashboard.tsx

import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function SignOutButton() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/login');
    };

    return (
        <Button variant="outline" onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}
