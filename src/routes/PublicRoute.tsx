import { useAuthUser } from '@/hooks/useAuthUser';
import type { RouteProps } from '@/utils/types';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }: RouteProps) {
    const { user, loading } = useAuthUser();

    if (loading) return null;

    if (user) {
        return <Navigate to="/account" replace />;
    }
    return <>{children}</>;
}
