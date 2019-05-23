import Brick from "./brick.js";

export default function levelLoader(game, level) {
    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick === 1) {
                game.bricks.push(new Brick(game, { x: 65 + 70 * brickIndex, y: 100 + 30 * rowIndex }))
            }
        })
    })
}