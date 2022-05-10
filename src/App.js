import './App.css';
import { Timer } from "./Components/Timer/index.js";
import { NumberOfMines } from "./Components/NumberOfMines/index.js"
import { RestartGame } from "./Components/RestartGame/index.js"
import { MinesLayout } from "./Components/MinesLayout/index.js"
import { useState } from 'react';

function App() {
    const [gameOver, setGameOver] = useState(false);
    const [resetGame, setResetGame] = useState(false);
    const [status, setStatus] = useState("");
    const [timerId2, setTimerId2] = useState(null);
    return (
        <div className="container">
            <div className="App">
                <div className="GameHeader">
                    <NumberOfMines />
                    <RestartGame resetGame={setResetGame} setGameOver={setGameOver} />
                    <Timer
                        timerId2={timerId2}
                        setTimerId2={setTimerId2}
                        resetGame={resetGame}
                    />
                </div>
                <div className="GameBody">
                    <MinesLayout
                        resetGame={resetGame}
                        setResetGame={setResetGame}
                        gameState={gameOver}
                        setGameState={setGameOver}
                        setStatus={setStatus}
                        timerId2={timerId2}
                    />
                </div>

                <div className="Status"> {status} </div>
            </div>
        </div>
    );
}

export default App;
