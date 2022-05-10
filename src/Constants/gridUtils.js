import { Queue } from "./Queue.js"
import { utils } from "./utils.js"

const neighbours =
    [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ];

const unmaskNeighbours = (maskGrid, Grid, x, y) => {
    const queue = new Queue();
    var count = 0;
    queue.enqueue([x, y]);
    var i = 1;

    while (i !== 0) {
        i -= 1;
        var [curX, curY] = queue.dequeue();
        maskGrid[curX][curY] = 1;
        count += 1;

        for (var neigh of neighbours) {
            var dx = curX + neigh[0];
            var dy = curY + neigh[1];

            const checkValidSquare =
                0 <= dx
                && dx < 9
                && 0 <= dy
                && dy < 9
                && maskGrid[dx][dy] === 0;

            if (checkValidSquare) {
                maskGrid[dx][dy] = 1;
                if (!Grid[dx][dy]) {
                    i += 1;
                    queue.enqueue([dx, dy]);
                }
            }
        }
    }
    return [maskGrid, count];
}

const minesCoordinates = (mines) => {
    var coordinates = [];
    mines.forEach(element => {
        coordinates.push([Math.floor(element / 9), element % 9]);
    });
    return coordinates;
}

const initialMask = () => {
    return Array(9).fill().map(() => Array(9).fill(0));
}

const randomMinesGenerator = (numOfMines) => {
    var setOfMines = new Set();

    while (setOfMines.size !== numOfMines) {
        setOfMines.add(utils.random(0, 80));
    }

    return Array.from(setOfMines);
}

const generateGrid = (randomizedMines) => {
    var grid = Array.from(Array(9), () => Array(9).fill(0));

    randomizedMines.forEach(element => {
        var x = Math.floor(element / 9);
        var y = element % 9;
        grid[x][y] = "M";
        for (const key of neighbours) {
            var dx = x + key[0];
            var dy = y + key[1];
            if (0 <= dx && dx < 9 && 0 <= dy && dy < 9 && grid[dx][dy] !== "M") {
                grid[dx][dy] += 1;
            }
        }
    });

    return grid;
}

export {
    unmaskNeighbours,
    initialMask,
    randomMinesGenerator,
    generateGrid,
    minesCoordinates
};