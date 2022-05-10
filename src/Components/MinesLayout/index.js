import './index.css';
import { useEffect, useState } from "react";
import { utils } from "../../Constants/utils.js";
import {
    unmaskNeighbours,
    initialMask,
    randomMinesGenerator,
    generateGrid
} from "../../Constants/gridUtils.js";

const MinesLayout = ({
    resetGame,
    setResetGame,
    gameState,
    setGameState,
    setStatus,
    timerId2
}) => {
    const [hideShowMask, setHideShowMask] = useState(initialMask());
    const [minesGrid, setMinesGrid] = useState(randomMinesGenerator(10));
    const [Grid, setGrid] = useState(generateGrid(minesGrid));
    const [count, setCount] = useState(0);

    useEffect(() => {
        const clearGameState = () => {
            const initMask = randomMinesGenerator(10);
            setHideShowMask(initialMask());
            setMinesGrid(initMask);
            setGrid(generateGrid(initMask));
            setCount(0);
            setStatus("");
            setGameState(false);
            setResetGame(false);
            clearInterval(timerId2);
        };

        if (resetGame) {
            clearGameState();
        }
    }, [resetGame])

    const buttonClicked = (x, y) => {
        if (!hideShowMask[x][y] && !gameState) {
            const temp = Object.assign([], hideShowMask);
            checkGridValue(temp, x, y);
            checkGameStatus();
        }
    }

    const checkGridValue = (maskGrid, x, y) => {
        var updatedCount = 0;
        switch (Grid[x][y]) {
            case "M":
                setCount(count + 1);
                maskGrid[x][y] = 1;
                break;
            case 0:
                [maskGrid, updatedCount] = unmaskNeighbours(maskGrid, Grid, x, y);
                setCount(count + updatedCount);
                break;
            default:
                setCount(count + 1);
                maskGrid[x][y] = 1;
        }

        setHideShowMask(maskGrid);
    }

    const checkGameStatus = () => {
        console.log("checking status");
        const currentStatus = checkWinner();
        if (currentStatus) {
            console.log("count value", count);
            if (count === 71) {
                console.log("Is winner");
                setStatus("WINNER");
                setGameState(true);
                setCount(0);
                return;
            }
            return;
        }
        showMines();
        setStatus("LOSER");
        setGameState(true);
        clearInterval(timerId2);
    }

    const showMines = () => {
        const temp = Object.assign([], hideShowMask);
        console.log("showing mines");
        minesGrid.forEach(element => {
            var x = Math.floor(element / 9);
            var y = element % 9;
            temp[x][y] = 1;
        });
        setHideShowMask(temp);
    }

    const checkWinner = () => {
        console.log("checking winner");
        var flag = true;
        minesGrid.forEach(element => {
            var x = Math.floor(element / 9);
            var y = element % 9;
            if (hideShowMask[x][y]) {
                flag = false;
            }
        });
        console.log("flag value", flag);
        return flag;
    }

    const openCloseClass = (x, y) => hideShowMask[x][y] ? "open" : "close";
    const redBackgorund = (x, y) => hideShowMask[x][y] && Grid[x][y] === "M" ? "#e60000" : null;

    return (
        <div className="Grid">
            {utils.range(0, 8).map(x => (
                <div className="row" key={"row" + x}>
                    {utils.range(0, 8).map(y => (
                        <div
                            key={x.toString() + y.toString()}
                            onClick={() => buttonClicked(x, y)}
                            className={openCloseClass(x, y)}
                            style={{ "background": redBackgorund(x, y) }}
                        >
                            {
                                hideShowMask[x][y]
                                    ? Grid[x][y] === 0 ? "" : Grid[x][y]
                                    : ""
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export {
    MinesLayout
};