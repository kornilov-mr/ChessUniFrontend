import {PieceColorEnum} from "../utils/PieceColorEnum";
import {PiecePosition} from "../utils/PiecePosition";
import Board from "../Board";
import {Move} from "../utils/move/Move";

/**
 * The abstract class Piece represents a chess piece.
 *
 * @param position - The position of the piece on the chessboard.
 * @param color - The color of the piece.
 * @param type - The type of the piece.
 * @param isMoved - A boolean indicating whether the piece has been moved.
 *

 */
export abstract class Piece {
    public position: PiecePosition;
    public color: PieceColorEnum;
    public isMoved: boolean = false;
    public type: string;
    constructor(position: PiecePosition, color: PieceColorEnum, type: string) {
        this.position = position;
        this.color = color;
        this.type = type;
    }
    /**
     * Abstract method to calculate and return all possible moves for a game piece on the given board.
     *
     * @param {Board} board - The current state of the game board used to evaluate possible moves.
     * @return {Array<Move>} An array of valid moves available for the game piece.
     *
     * Moves are only valid if they aren't blocked by the piece of the same color
     */
    abstract GetPossibleMoves(board:Board): Array<Move>;
    /**
     * Abstract method to calculate and return all possible moves for a game piece on the given board.
     *
     * @param {Board} board - The current state of the game board used to evaluate possible moves.
     * @return {Array<Move>} An array of valid moves available for the game piece.
     *
     * Attacks are valid regardless of the color of the piece.
     * Attacks are used to determine check of the pieces
     */
    abstract GetPossibleAttacks(board:Board): Array<Move>;

    /**
     * Changes the position of the piece and sets the isMoved flag to true.
     * @param newPiecePosition - The new position of the piece.
     */
    public movePiece(newPiecePosition: PiecePosition) {
        this.position = newPiecePosition;
        this.isMoved = true;
    }
    toString(): string {
        return `Piece{type:${this.type},position:${this.position.toString()},isMoved:${this.isMoved},color:${this.color}}`;
    }
}