'use client';

import { useMemo } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PoemListPaginationProps = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
};

export default function PoemListPagination({
    currentPage,
    setCurrentPage,
    totalPages,
}: PoemListPaginationProps) {
    const pagesToDisplay = useMemo(() => {
        const toDisplay = [...Array.from(Array(totalPages).keys()).map((k) => k + 1)];

        if (totalPages < 6) {
            return toDisplay;
        } else {
            if (currentPage <= 3) {
                toDisplay.splice(3, totalPages - 4, -1);
            } else if (totalPages - currentPage <= 2) {
                toDisplay.splice(1, totalPages - 4, -1);
            } else {
                toDisplay.splice(1, currentPage - 2, -1);
                toDisplay.splice(3, totalPages - currentPage - 1, -1);
            }

            return toDisplay;
        }
    }, [totalPages, currentPage]);

    return (
        <Pagination className="animate-blur-in">
            <PaginationContent>
                {currentPage !== 1 ? (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        />
                    </PaginationItem>
                ) : (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            className={'pointer-events-none'}
                            aria-disabled="true"
                            tabIndex={-1}
                            isDisabled
                        />
                    </PaginationItem>
                )}

                {pagesToDisplay.map((pageNumber, index) => (
                    <PaginationItem key={index}>
                        {pageNumber === -1 ? (
                            <PaginationEllipsis />
                        ) : pageNumber !== currentPage ? (
                            <PaginationLink href="#" onClick={() => setCurrentPage(pageNumber)}>
                                {pageNumber}
                            </PaginationLink>
                        ) : (
                            <PaginationLink
                                href="#"
                                className={
                                    'pointer-events-none border-solid border-foreground border'
                                }
                                aria-disabled="true"
                                tabIndex={-1}
                                isActive
                            >
                                {pageNumber}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {currentPage !== totalPages ? (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => setCurrentPage(currentPage + 1)} />
                    </PaginationItem>
                ) : (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            className={'pointer-events-none'}
                            aria-disabled="true"
                            tabIndex={-1}
                            isDisabled
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
