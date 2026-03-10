import {PiecePosition} from "./PiecePosition";
import Board from "../Board";
import {Move} from "./move/Move";
import {PieceColorEnum} from "./PieceColorEnum";

/**
 * Function that checks if a piece position is inside the board.
 * @param piecePosition The current position of the piece.
 */
export function isInsideABoard(piecePosition: PiecePosition) {
    return piecePosition.row >= 0 && piecePosition.row <= 7 && piecePosition.col >= 0 && piecePosition.col <= 7;
}

/**
 * Function that returns all the possible attacks before a piece in a row.
 *
 * @description Goes in the direction of the dx dy and check every step if the square is occupied
 *              Adds the last square even if it's occupied by the piece
 * @param piecePosition - The Start position of the piece.
 * @param dx - The direction on x-axis
 * @param dy - The direction on y-axis
 * @param board - The board where the piece is located.
 */
export function getAllAttacksBeforeAPieceInRow(piecePosition: PiecePosition, dx: number, dy: number, board: Board) {
    let moves = new Array<Move>();
    let currentPosition = piecePosition.createNewPositionRelative(dx, dy);
    while (isInsideABoard(currentPosition) && board.pieces[currentPosition.col][currentPosition.row] == null) {
        moves.push(new Move(piecePosition, currentPosition));
        currentPosition = currentPosition.createNewPositionRelative(dx, dy);
    }
    if (isInsideABoard(currentPosition))
        moves.push(new Move(piecePosition, currentPosition));
    return moves;
}
/**
 * Function that returns all the possible attacks before a piece in a row.
 *
 * @description Goes in the direction of the dx dy and check every step if the square is occupied
 *              Adds the last square even if it's occupied by the piece but only if it's not the same color
 * @param piecePosition - The Start position of the piece.
 * @param dx - The direction on x-axis
 * @param dy - The direction on y-axis
 * @param color - the color of the piece
 * @param board - The board where the piece is located.
 */
export function getAllMovesBeforeAPieceInRow(piecePosition: PiecePosition, dx: number, dy: number, color: PieceColorEnum, board: Board) {
    let moves = new Array<Move>();
    let currentPosition = piecePosition.createNewPositionRelative(dx, dy);
    while (isInsideABoard(currentPosition) && board.pieces[currentPosition.col][currentPosition.row] == null) {
        moves.push(new Move(piecePosition, currentPosition));
        currentPosition = currentPosition.createNewPositionRelative(dx, dy);
    }
    if (isInsideABoard(currentPosition) && board.pieces[currentPosition.col][currentPosition.row]!!.color !== color)
        moves.push(new Move(piecePosition, currentPosition));
    return moves;
}

/**
 * Used to print the moves in a string format for testing purposes
 * @param moves
 */
export function moveArrayToString(moves: Array<Move>) {
    return moves.map(move => move.startPosition.col + "," + move.startPosition.row + "-" +
        move.endPosition.col + "," + move.endPosition.row).join("|")
}

/**
 * Check the moves by start and end positions and not by the classes or additional information
 * @param moves - The array of moves to search in
 * @param move - The move to search for
 */
export function isMoveIncluded(moves:Array<Move>,move:Move){
    return moves.some(m => m.startPosition.col === move.startPosition.col && m.startPosition.row === move.startPosition.row && m.endPosition.col === move.endPosition.col && m.endPosition.row === move.endPosition.row);
}