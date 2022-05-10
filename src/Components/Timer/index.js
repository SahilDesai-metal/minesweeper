import {
    useState,
    useEffect
} from 'react';

import './index.css';

const Timer = ({ resetGame, timerId2, setTimerId2 }) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let t = setInterval(() => {
            setTimer(prevState => prevState + 1);
            setTimerId2(t);
        }, 1000);

        return () => clearInterval(t);
    }, [resetGame])

    useEffect(() => {
        if (resetGame) {
            clearInterval(timerId2);
            setTimerId2(null);
            setTimer(0)
        }
    })

    return (
        <div className="Timer">{timer}</div>
    );
}

export {
    Timer
};

/*
useEffect(() => {
        let timerId1;

        if (!gameOver) {
            timerId1 = setInterval(() => {
                setTimer(timer + 1);
                setTimerId(timerId1)
            }, 1000);
        }

        if (resetGame) {
            clearInterval(timerId1);
            clearInterval(timerId);
            setTimer(0);
            setTimerId(null);
        }

        return () => {
            clearInterval(timerId);
        }
    }, [gameOver, timerId, resetGame, timer])
*/