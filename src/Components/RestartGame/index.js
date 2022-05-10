import "./index.css"

const RestartGame = ({ resetGame, setGameOver }) => {
    const btnClicked = () => {
        resetGame(true);
        setGameOver(true);
    }
    return (
        <button className="imageContainer" onClick={btnClicked}>Restart Game</button>
    );
}

export {
    RestartGame
};