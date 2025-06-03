import { Navigate } from 'react-router-dom';
import { useAuthUser } from '@/hooks/useAuthUser';
import type { RouteProps } from '@/utils/types';

export default function ProtectedRoute({ children }: RouteProps) {
    const { user, loading } = useAuthUser();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}
