import Brick from "./brick.js";

export function levelCreator(game, level) {
    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick === 1) {
                game.bricks.push(new Brick(game, { x: 65 + 70 * brickIndex, y: 100 + 30 * rowIndex }))
            }
        })
    })
}

export let levelTest = [
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
]