import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

export default function MobileLink({
    to,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    return (
        <Link
            to={to}
            onClick={() => {
                onOpenChange?.(false);
            }}
            className={cn('text-base', className)}
            {...props}
        >
            {children}
        </Link>
    );
}
