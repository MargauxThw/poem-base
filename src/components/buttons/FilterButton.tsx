import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

type FilterButtonProps = {
    initiateFetch: () => void;
    urlSuffix: string;
};

export function FilterButton({ initiateFetch, urlSuffix }: FilterButtonProps) {
    const [titleText, setTitleText] = useState<string>('');
    const [titleAbs, setTitleAbs] = useState<boolean>(false);
    const [authorText, setAuthorText] = useState<string>('');
    const [authorAbs, setAuthorAbs] = useState<boolean>(false);
    const [linesStart, setLinesStart] = useState<string>('');
    const [linesEnd, setLinesEnd] = useState<string>('');
    const [closedBySave, setClosedBySave] = useState<boolean>(false);

    const initialiseFilters = () => {
        setTitleText(localStorage.getItem(`titleText${urlSuffix}`) ?? '');
        setTitleAbs(localStorage.getItem(`titleAbs${urlSuffix}`) === 'true');

        setAuthorText(localStorage.getItem(`authorText${urlSuffix}`) ?? '');
        setAuthorAbs(localStorage.getItem(`authorAbs${urlSuffix}`) === 'true');

        setLinesStart(localStorage.getItem(`linesStart${urlSuffix}`) ?? '');
        setLinesEnd(localStorage.getItem(`linesEnd${urlSuffix}`) ?? '');
    };

    useEffect(() => {
        initialiseFilters();
    }, []);

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = event.clipboardData.getData('text');
        // Block paste if the data is not a valid integer
        if (!/^\d+$/.test(pastedData)) {
            event.preventDefault();
        }
    };

    const resetAll = () => {
        resetTitle();
        resetAuthor();
        resetLines();
    };

    const resetTitle = () => {
        setTitleText('');
        setTitleAbs(false);
    };

    const resetAuthor = () => {
        setAuthorText('');
        setAuthorAbs(false);
    };

    const resetLines = () => {
        setLinesStart('');
        setLinesEnd('');
    };

    const saveFilters = () => {
        setClosedBySave(true);
        localStorage.setItem(`titleText${urlSuffix}`, titleText);
        localStorage.setItem(`titleAbs${urlSuffix}`, titleAbs.toString());
        localStorage.setItem(`authorText${urlSuffix}`, authorText);
        localStorage.setItem(`authorAbs${urlSuffix}`, authorAbs.toString());
        localStorage.setItem(`linesStart${urlSuffix}`, linesStart);
        localStorage.setItem(`linesEnd${urlSuffix}`, linesEnd);
        initiateFetch();
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setClosedBySave(false);
        } else if (!closedBySave) {
            initialiseFilters();
        }
    };

    return (
        <Dialog onOpenChange={(open) => handleOpenChange(open)}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <SlidersHorizontal />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Edit filters</DialogTitle>
                    <DialogDescription>
                        Filters control the poems generated on this page. Click save to apply the
                        filters.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex flex-col gap-4 items-start">
                    <div className="flex-col gap-2 w-full">
                        <Label htmlFor="title">Title</Label>
                        <div className="flex flex-row items-center gap-2">
                            <Input
                                id="title"
                                placeholder="Any"
                                value={titleText}
                                onChange={(e) => {
                                    setTitleText(e.target.value);
                                }}
                            />
                            <Button variant="secondary" onClick={resetTitle}>
                                Reset
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Checkbox
                            id="title-abs"
                            checked={titleAbs}
                            onCheckedChange={(e) => {
                                setTitleAbs(e as boolean);
                            }}
                        />
                        <Label
                            htmlFor="title-abs"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Exact title match
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-4 items-start">
                    <div className="flex-col gap-2 w-full">
                        <Label htmlFor="author">Author</Label>
                        <div className="flex flex-row items-center gap-2">
                            <Input
                                id="author"
                                placeholder="Any"
                                value={authorText}
                                onChange={(e) => {
                                    setAuthorText(e.target.value);
                                }}
                            />
                            <Button variant="secondary" onClick={resetAuthor}>
                                Reset
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Checkbox
                            id="author-abs"
                            checked={authorAbs}
                            onCheckedChange={(e) => {
                                setAuthorAbs(e as boolean);
                            }}
                        />
                        <Label
                            htmlFor="author-abs"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Exact author match
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-4 items-start">
                    {urlSuffix === '_random' ? (
                        <div className="flex flex-row items-end gap-2">
                            <div className="flex-col gap-2 w-full">
                                <Label htmlFor="lines-start">Minimum # of lines:</Label>
                                <Input
                                    type="number"
                                    id="lines-start"
                                    placeholder="Any"
                                    onPaste={handlePaste}
                                    value={linesStart}
                                    onChange={(e) => {
                                        setLinesStart(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="flex-col gap-2 w-full">
                                <Label htmlFor="lines-end">Maximum # of lines:</Label>

                                <Input
                                    type="number"
                                    id="lines-end"
                                    placeholder="Any"
                                    onPaste={handlePaste}
                                    value={linesEnd}
                                    onChange={(e) => {
                                        setLinesEnd(e.target.value);
                                    }}
                                />
                            </div>
                            <Button variant="secondary" onClick={resetLines}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <Separator />

                <DialogFooter className="sm:justify-end gap-y-2">
                    <Button type="button" variant="secondary" onClick={resetAll}>
                        Reset all
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" onClick={saveFilters}>
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
