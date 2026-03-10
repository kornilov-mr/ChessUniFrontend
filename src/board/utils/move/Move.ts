import {PiecePosition} from "../PiecePosition";

/**
 * Represents a move on the chessboard.
 * @param startPosition - The starting position of the piece.
 * @param endPosition - The ending position of the piece.
 */
export class Move{
    public startPosition: PiecePosition;
    public endPosition: PiecePosition;

    constructor(startPosition: PiecePosition, endPosition: PiecePosition) {
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }
    toString(): string {
        return `Move{startPosition:${this.startPosition.toString()}, endPosition:${this.endPosition.toString()}}`;
    }
}