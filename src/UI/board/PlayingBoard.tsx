import React, {useState} from 'react';
import './BoardStyling.scss';
import Board from "../../board/Board";
import {MoveFactory} from "../../board/utils/move/MoveFactory";
import {Piece} from "../../board/pieces/Piece";
import {PieceColorEnum} from "../../board/utils/PieceColorEnum";
import {PiecePosition} from "../../board/utils/PiecePosition";
import {PromotionMove} from "../../board/utils/move/PromotionMove";
import {ChessSoundEnum, SoundUrlsMap} from "../ChessSoundEnum";


const CurrentChessBoard: Board = new Board();
CurrentChessBoard.initStartBoard();

const moveFactory: MoveFactory = new MoveFactory(CurrentChessBoard);

const getPieceSymbols = (piece: Piece) => {
    return PIECE_SYMBOLS[piece.color][piece.type];
}
const PIECE_SYMBOLS: Record<string, Record<string, string>> = {
    "white": {Pa: '♟', Ro: '♜', Kn: '♞', Bi: '♝', Qu: '♛', Ki: '♚'},
    "black": {Pa: '♟', Ro: '♜', Kn: '♞', Bi: '♝', Qu: '♛', Ki: '♚'},
};

function PlayingBoard() {
    const [boardPieces, setBoard] = useState<(Piece | null)[][]>(CurrentChessBoard.pieces);
    const [selected, setSelected] = useState<[number, number] | null>(null);
    const [turn, setTurn] = useState<PieceColorEnum>(PieceColorEnum.White);

    const [colorWhatWon, setColorWhatWon] = useState<PieceColorEnum | null>(null);
    const [squareInCheck, setSquareInCheck] = useState<PiecePosition | null>(null);

    const [pendingPromotion, setPendingPromotion] = useState<PromotionMove | null>(null);

    const handlePromotionSelection = (pieceType: string) => {
        if (!pendingPromotion) return;

        pendingPromotion.setNewPiece(pieceType)
        CurrentChessBoard.makeAMove(pendingPromotion);
        setBoard(CurrentChessBoard.pieces);
        setSelected(null);
        setTurn(turn === PieceColorEnum.White ? PieceColorEnum.Black : PieceColorEnum.White);
        setColorWhatWon(CurrentChessBoard.whoWon);
        setSquareInCheck(CurrentChessBoard.SquareUnderCheck);
        setPendingPromotion(null);
    };

    const handleSquareClick = (col: number, row: number) => {
        if (colorWhatWon || pendingPromotion) return;

        const piece = CurrentChessBoard.pieces[col][row];
        console.log("Selected square: ", col, row, piece);
        console.log(CurrentChessBoard.toString());
        if (selected) {
            const [selCol, selRow] = selected;

            if (piece && piece!!.color === turn) {
                setSelected([col, row]);
                return;
            }
            let move;
            try {
                console.log("move: ", selCol, selRow, col, row);
                move = moveFactory.createMove(new PiecePosition(selCol, selRow), new PiecePosition(col, row));
            } catch (error) {
                console.log(error);
                return;
            }
            if (move instanceof PromotionMove) {
                let promotionMove = move as PromotionMove;
                promotionMove.setNewPiece("Qu")
                if (CurrentChessBoard.canMove(move)) {
                    setPendingPromotion(move);
                }
                return;
            }
            if (CurrentChessBoard.canMove(move)) {
                console.log("Move made: ", move);
                CurrentChessBoard.makeAMove(move)
                setBoard(CurrentChessBoard.pieces);
                setSelected(null);
                setTurn(turn === PieceColorEnum.White ? PieceColorEnum.Black : PieceColorEnum.White);
                setColorWhatWon(CurrentChessBoard.whoWon)
                setSquareInCheck(CurrentChessBoard.SquareUnderCheck)
            }
        } else if (piece && piece.color === turn) {
            setSelected([col, row]);
        }
    };

    const playSound = (chessSound: ChessSoundEnum) => {
        const audio = new Audio(SoundUrlsMap[chessSound]);
        audio.play().catch(err => console.error('Error playing custom sound:', err));
    };

    return (
        <div className="game-container">
            <h1>Simple Chess</h1>
            {colorWhatWon ? (
                <div className="status winner-announcement">
                     Game Over! {colorWhatWon === PieceColorEnum.White ? 'White' : 'Black'} Won!
                </div>
            ) : (
                <div className="status">
                    Current Turn: <span className="turn-indicator"
                                        data-turn={turn}>{turn === PieceColorEnum.White ? 'White' : 'Black'}</span>
                </div>
            )}
            <div className="board">
                {boardPieces[0] && [...boardPieces[0]].reverse().map((_, colIndex) => {
                    const reversedColIndex = boardPieces[0].length - 1 - colIndex;
                    return (
                        <div key={reversedColIndex} className="board-row">
                            {boardPieces.map((row, rowIndex) => {
                                const piece = row[reversedColIndex];
                                const isSelected = selected && selected[0] === rowIndex && selected[1] === reversedColIndex;
                                const isDark = (rowIndex + reversedColIndex) % 2 === 1;

                                return (
                                    <div
                                        key={rowIndex}
                                        className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`}
                                        onClick={() => {
                                            const previousSquareInCheck = squareInCheck;
                                            const targetPiece = boardPieces[rowIndex][reversedColIndex];
                                            const wasCapture = selected && targetPiece && targetPiece.color !== turn;
                                            const wasMove = selected && !targetPiece;

                                            handleSquareClick(rowIndex, reversedColIndex);

                                            setTimeout(() => {
                                                if (wasCapture) {
                                                    playSound(ChessSoundEnum.Capture);
                                                } else if (CurrentChessBoard.SquareUnderCheck && !previousSquareInCheck) {
                                                    playSound(ChessSoundEnum.Check);
                                                } else if (wasMove) {
                                                    playSound(ChessSoundEnum.Move);
                                                }
                                            }, 0);
                                        }}
                                        data-piece={piece ? `${piece.color}${piece.type}` : 'empty'}
                                        is-under-check={squareInCheck && squareInCheck.col === rowIndex && squareInCheck.row === reversedColIndex ? 'true' : 'false'}
                                    >
                                        {piece && (
                                            <span className="piece" data-color={piece.color}>
                      {getPieceSymbols(piece)}
                    </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {pendingPromotion && (
                <div className="promotion-overlay">
                    <div className="promotion-panel">
                        <h2>Choose Promotion Piece</h2>
                        <div className="promotion-options">
                            <button onClick={() => handlePromotionSelection('Qu')} className="promotion-button">
                                <span className="piece" data-color={turn}>{PIECE_SYMBOLS[turn]['Qu']}</span>
                                <span>Queen</span>
                            </button>
                            <button onClick={() => handlePromotionSelection('Ro')} className="promotion-button">
                                <span className="piece" data-color={turn}>{PIECE_SYMBOLS[turn]['Ro']}</span>
                                <span>Rook</span>
                            </button>
                            <button onClick={() => handlePromotionSelection('Bi')} className="promotion-button">
                                <span className="piece" data-color={turn}>{PIECE_SYMBOLS[turn]['Bi']}</span>
                                <span>Bishop</span>
                            </button>
                            <button onClick={() => handlePromotionSelection('Kn')} className="promotion-button">
                                <span className="piece" data-color={turn}>{PIECE_SYMBOLS[turn]['Kn']}</span>
                                <span>Knight</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default PlayingBoard;
