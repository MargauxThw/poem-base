import type { Poem } from './types';

export const FONT_OPTIONS = [
    {
        class: 'font-theme-sans',
        label: 'Sans-serif (Inter)',
        shortLabel: 'Sans-serif',
        value: "'Inter', sans-serif",
    },
    {
        class: 'font-theme-serif',
        label: 'Serif (IBM Plex Serif)',
        shortLabel: 'Serif',
        value: "'IBM Plex Serif', serif",
    },
    {
        class: 'font-theme-mono',
        label: 'Monospace (IBM Plex Mono)',
        shortLabel: 'Monospace',
        value: "'IBM Plex Mono', monospace",
    },
    {
        class: 'font-theme-accessible',
        label: 'Accessible (Atkinson Hyperlegible)',
        shortLabel: 'Accessible',
        value: "'Atkinson Hyperlegible', sans-serif",
    },
];

export const THEME_OPTIONS = [
    { class: 'theme-light', label: 'Light', background: '#FFFFFF', color: '#222222' },
    { class: 'dark', label: 'Dark', background: '#242424', color: '#FFFFFF' },
    { class: 'theme-sepia', label: 'Sepia', background: '#F9EFDA', color: '#594334' },
    { class: 'theme-blue', label: 'Blue', background: '#DDEBF4', color: '#2B3440' },
    { class: 'theme-green', label: 'Mint', background: '#CCE6D0', color: '#3D4B43' },
];

export const samplePoem: Poem = {
    title: 'Lorem Ipsum Dolor',
    author: 'Lorem Ipsum Dolor Sit Amet',
    linecount: 12,
    lines: [
        'Lorem ipsum dolor sit amet,',
        'consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt',
        'ut labore et dolore magna aliqua.',
        '',
        'Lorem ipsum dolor sit amet,',
        'consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt',
        'ut labore et dolore magna aliqua.',
        '',
        'Lorem ipsum dolor sit amet,',
        'consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt',
        'ut labore et dolore magna aliqua.',
    ],
};

export const samplePoemList: Array<Poem> = Array(10).fill(samplePoem);

export const SORTING_OPTIONS_POEMS = {
    authorAZ: 'By Author (A-Z)',
    authorZA: 'By Author (Z-A)',
    titleAZ: 'By Title (A-Z)',
    titleZA: 'By Title (Z-A)',
    linesAsc: 'By # Lines (Asc.)',
    linesDesc: 'By # Lines (Desc.)',
    random: 'Random',
};

export const SORTING_OPTIONS_LIKES = {
    ...SORTING_OPTIONS_POEMS,
    createdAtAsc: 'By Most Recent Like',
    createdAtDesc: 'By Least Recent Like',
};

export const validLineCounts = new Set([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
    75, 76, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
    120, 121, 122, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 140, 141, 142, 143,
    144, 145, 146, 147, 148, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163,
    166, 167, 168, 169, 171, 174, 175, 180, 187, 189, 190, 191, 192, 193, 194, 195, 196, 198, 200,
    201, 204, 206, 207, 209, 212, 214, 216, 217, 222, 224, 225, 227, 229, 231, 232, 235, 237, 238,
    239, 240, 243, 245, 247, 249, 250, 251, 258, 262, 265, 266, 267, 268, 273, 281, 282, 283, 284,
    285, 286, 287, 288, 293, 294, 295, 296, 298, 299, 300, 301, 303, 307, 308, 312, 313, 314, 316,
    317, 318, 320, 321, 322, 324, 325, 327, 331, 333, 341, 346, 348, 351, 364, 366, 367, 372, 374,
    375, 384, 386, 392, 398, 400, 402, 405, 409, 412, 415, 424, 425, 430, 432, 433, 435, 439, 443,
    445, 448, 456, 463, 472, 486, 495, 499, 502, 505, 519, 524, 545, 553, 558, 579, 583, 586, 602,
    606, 624, 628, 632, 634, 635, 640, 650, 653, 662, 666, 676, 678, 679, 683, 684, 689, 692, 695,
    698, 730, 743, 746, 747, 757, 759, 760, 775, 776, 777, 779, 798, 802, 804, 810, 837, 840, 844,
    849, 855, 860, 869, 879, 887, 892, 907, 912, 916, 917, 925, 929, 946, 970, 998, 1007, 1010,
    1012, 1014, 1018, 1021, 1026, 1031, 1040, 1041, 1055, 1071, 1073, 1079, 1091, 1164, 1188, 1206,
    1209, 1220, 1222, 1250, 1264, 1275, 1312, 1335, 1341, 1383, 1417, 1429, 1430, 1506, 1530, 1880,
    1925, 1949, 2014, 2086, 2153, 2248, 2255, 2353, 2624, 3090, 3190, 3621, 3931, 4199, 4720, 4848,
]);
