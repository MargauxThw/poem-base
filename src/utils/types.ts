export interface Poem {
    title: string;
    author: string;
    numLines: number;
    lines: Array<string>;
}

export interface LikedPoem {
    title: string;
    author: string;
    numLines: number;
    peekLines: Array<string>; // Up to 4 lines
    createdAt?: string; // ISO string format
}