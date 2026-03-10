import {Move} from "./Move";
import {Piece} from "../../pieces/Piece";
import {PiecePosition} from "../PiecePosition";
import {PieceColorEnum} from "../PieceColorEnum";
import {PieceFactory} from "../../pieces/PieceFactory";

/**
 * An inheritor of Move that represents a promotion move.
 * @extends Move
 *
 * @param startPosition - The starting position of the piece.
 * @param endPosition - The ending position of the piece.
 * @param newPiece - The new piece selected by the user (should be added after the move creation).
 * @param pawn - The pawn that is promoted (used to delete the right pawn and reverse the move).
 * @param capturedPiece - The piece that is captured by the promotion.
 */
export class PromotionMove extends Move{

    public newPiece: Piece|null = null
    public pawn: Piece
    public capturedPiece: Piece|null
    constructor(startPosition: PiecePosition, endPosition: PiecePosition, pawn:Piece, capturedPiece:Piece|null = null) {
        super(startPosition,endPosition);
        this.pawn = pawn;
        this.capturedPiece = capturedPiece;
    }
    public setNewPiece(newPieceType:string){
        let color = this.endPosition.row ===7 ? PieceColorEnum.White : PieceColorEnum.Black;
        this.newPiece = PieceFactory.createPiece(this.endPosition,color,newPieceType);
    }
    toString(): string {
        return `CapturingMove{newPiece:${this.newPiece?.toString()}, pawn:${this.pawn.toString()}} 
        extends ${super.toString()}`;
    }

}