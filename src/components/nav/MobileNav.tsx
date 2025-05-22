import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

import { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import MobileLink from '../links/MobileLinks';
import { useAuthUser } from '@/hooks/useAuthUser';

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const [metaColor, setMetaColor] = useState('transparent');

    const onOpenChange = useCallback(
        (open: boolean) => {
            setOpen(open);
            setMetaColor(open ? '#09090b' : 'transparent');
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setMetaColor, metaColor]
    );

    const { user, loading } = useAuthUser();

    if (loading) return null;

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    className="mx-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6!"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9h16.5m-16.5 6.75h16.5"
                        />
                    </svg>
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[60svh] p-0">
                <DrawerTitle className="hidden">Menu</DrawerTitle>
                <DrawerDescription className="hidden">Menu and sub-menu items</DrawerDescription>
                <div className="overflow-auto p-6">
                    {user ? (
                        <div className="flex flex-col space-y-3">
                            {[
                                { title: 'Home', href: '/' },
                                { title: 'Random poems', href: '/random' },
                                { title: 'Browse & search', href: '/browse' },
                                { title: 'My Poems', href: '/my-poems' },
                            ].map(
                                (item) =>
                                    item.href && (
                                        <MobileLink
                                            key={item.href}
                                            to={item.href}
                                            onOpenChange={setOpen}
                                            className="text-m font-medium"
                                        >
                                            {item.title}
                                        </MobileLink>
                                    )
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-3">
                            {[
                                { title: 'Home', href: '/' },
                                { title: 'Random poems', href: '/random' },
                                { title: 'Browse & search', href: '/browse' },
                            ].map(
                                (item) =>
                                    item.href && (
                                        <MobileLink
                                            key={item.href}
                                            to={item.href}
                                            onOpenChange={setOpen}
                                            className="text-m font-medium"
                                        >
                                            {item.title}
                                        </MobileLink>
                                    )
                            )}
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
