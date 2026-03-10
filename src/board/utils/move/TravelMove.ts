import {Move} from "./Move";
import {PiecePosition} from "../PiecePosition";

/**
 * An inheritor of Move that represents a move that travels from one square to another.
 * @extends Move
 *
 * @param startPosition - The starting position of the piece.
 * @param endPosition - The ending position of the piece.
 * @param isLastMovedPieceFirstMove - A boolean indicating whether the last moved piece is the first move.
 */
export class TravelMove extends Move{
    public isLastMovedPieceFirstMove: boolean;

    constructor(startPosition: PiecePosition, endPosition: PiecePosition,isLastMovedPieceFirstMove:boolean ) {
        super(startPosition, endPosition);
        this.isLastMovedPieceFirstMove = isLastMovedPieceFirstMove;
    }
    toString(): string {
        return `isLastMovedPieceFirstMove:${this.isLastMovedPieceFirstMove}} 
        extends ${super.toString()}`;
    }
}