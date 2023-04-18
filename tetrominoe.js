const width = 10

const L_tetrominoe = [
    [1, 1 + width, 1 + width * 2, 2 + width * 2],
    [1, 1 + width, 2, 3],
    [1, 2, 2 + width, 2 + width * 2],
    [3, 1 + width, 2 + width, 3 + width]
]
const L_right_tetrominoe = [
    [1 + width * 2, 2 + width, 2 + width * 2, 2],
    [1, 1 + width, 2 + width, 3 + width],
    [1, 1 + width, 1 + width * 2, 2],
    [1, 2, 3, 3 + width]
]
const T_tetrominoe = [
    [1, 2, 2 + width, 2 + width * 2, 3],
    [3, 1 + width, 2 + width, 3 + width, 3 + width * 2],
    [2, 2 + width, 1 + width * 2, 2 + width * 2, 3 + width * 2],
    [1, 1 + width, 2 + width, 1 + width * 2, 3 + width]
]

const Line_tetrominoe = [
    [1, 2, 3, 4],
    [1, 1 + width, 1 + width * 2, 1 + width * 3],
    [1, 2, 3, 4],
    [1, 1 + width, 1 + width * 2, 1 + width * 3]
]
const Z_tetrominoe = [
    [1, 2, 2 + width, 3 + width],
    [1 + width * 2, 1 + width, 2 + width, 2],
    [1, 2, 2 + width, 3 + width],
    [1 + width * 2, 1 + width * 1,  2 + width, 2]
]
const angle_tetrominoe = [
    [1, 1 + width, 2 + width],
    [1, 1 + width, 2],
    [1, 2, 2 + width],
    [1 + width, 2 + width, 2]
]
const cube_tetrominoe = [
    [1, 2, 1 + width, 2 + width],
    [1, 2, 1 + width, 2 + width],
    [1, 2, 1 + width, 2 + width],
    [1, 2, 1 + width, 2 + width]
]
export const tetrominoes = [L_tetrominoe, L_right_tetrominoe, T_tetrominoe, Line_tetrominoe, Z_tetrominoe, angle_tetrominoe, cube_tetrominoe]
