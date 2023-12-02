import { useState, useEffect } from "react";
import Square from "./Square";
import "./Board.css";

export default function Board() {
    const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
    const [winner, setWinner] = useState('');
    const [player, setPlayer] = useState('X');

    const calcutateWinner = (squares: string[]): void => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [firstSquare, secondSquare, thirdSquare] = lines[i];

            if (squares[firstSquare] !== '' &&  squares[firstSquare] === squares[secondSquare] && squares[firstSquare] === squares[thirdSquare]) {
                setWinner(squares[firstSquare]);
            }
        }
    }

    const handleClick = (i: number) => {
        if (winner !== '') {
            alert(`O jogo acabou\n ${winner} ganhou`);
            return;
        }
        
        if (squares[i] === '') {
            const changedSquares = squares.slice();
            changedSquares[i] = player;
            setSquares(changedSquares);
            setPlayer(player === 'X' ? 'O' : 'X');
        } else {
            alert("Erro: a casa já está preenchida");
        }
    }

    useEffect(() => {
        calcutateWinner(squares);
    }, [squares]);

    return (
        <div>
            <div className="status">{winner !== '' ? `Vencedor: ${winner}` : `Próximo jogador: ${player}`}</div>
            <div className="board-row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
        </div>
    );
}