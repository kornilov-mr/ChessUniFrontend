import {Move} from "./Move";
import {PiecePosition} from "../PiecePosition";
import {Piece} from "../../pieces/Piece";

/**
 * An inheritor of Move that represents a move that captures a piece.
 * @extends Move
 * @param startPosition - The starting position of the piece.
 * @param endPosition - The ending position of the piece.
 * @param capturedPiece - The piece that is captured.
 * @param isLastMovedPieceFirstMove - A boolean indicating whether the last moved piece is the first move.
 *
 * @description CapturedPiece and isLastMovedPieceFirstMove are used to reverse the move saving the state of the pieces
 */
export class CapturingMove extends Move {

    public capturedPiece: Piece
    public isLastMovedPieceFirstMove: boolean;

    constructor(startPosition: PiecePosition, endPosition: PiecePosition, capturedPiece: Piece, isLastMovedPieceFirstMove: boolean) {
        super(startPosition, endPosition);
        this.capturedPiece = capturedPiece;
        this.isLastMovedPieceFirstMove = isLastMovedPieceFirstMove;
    }

    toString(): string {
        return `CapturingMove{capturedPiece:${this.capturedPiece.toString()}, isLastMovedPieceFirstMove:${this.isLastMovedPieceFirstMove}} 
        extends ${super.toString()}`;
    }
}