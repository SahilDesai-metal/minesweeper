import "./index.css"

const RestartGame = ({ resetGame, setGameOver }) => {
    const btnClicked = () => {
        resetGame(true);
        setGameOver(true);
    }
    return (
        <div className="imageContainer" onClick={btnClicked}>Restart Game</div>
    );
}

export {
    RestartGame
};