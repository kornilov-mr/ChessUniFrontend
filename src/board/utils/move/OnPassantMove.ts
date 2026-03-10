import {Move} from "./Move";
import Pawn from "../../pieces/Pawn";
import {PiecePosition} from "../PiecePosition";


/**
 * An inheritor of Move that represents a onPassant move.
 * @extends Move
 *
 * @param startPosition - The starting position of the piece.
 * @param endPosition - The ending position of the piece.
 * @param pawnToCapture - The pawn that should be captured by the onPassant.
 *
 * @description Used to reverse the move saving captured pawn
 */
export class OnPassantMove extends Move{
    public pawnToCapture:Pawn
    constructor(startPosition: PiecePosition, endPosition: PiecePosition, pawnToCapture:Pawn) {
        super(startPosition, endPosition);
        this.pawnToCapture = pawnToCapture;
    }
    toString(): string {
        return `OnPassantMove{pawnToCapture:${this.pawnToCapture.toString()}} 
        extends ${super.toString()}`;
    }
}