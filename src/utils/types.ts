export interface BasePoem {
    title: string;
    author: string;
    linecount: number;
}

export interface Poem extends BasePoem {
    lines: Array<string>;
}

export interface LikedPoem extends BasePoem {
    peekLines: Array<string>; // Up to 4 lines
    createdAt?: string; // ISO string format
}

export interface PoemFilter {
    linesStart?: number;
    linesEnd?: number;
    titleText?: string;
    authorText?: string;
    titleAbs?: boolean;
    authorAbs?: boolean;
}
