import {PiecePosition} from "../utils/PiecePosition";
import {PieceColorEnum} from "../utils/PieceColorEnum";
import Bishop from "./Bishop";
import Rook from "./Rook";
import Queen from "./Queen";
import Knight from "./Knight";
import Pawn from "./Pawn";
import King from "./King";

export class PieceFactory {
    public static createPiece(piecePosition:PiecePosition, pieceColor:PieceColorEnum, pieceType:string){
        switch (pieceType) {
            case "Bi":
                return new Bishop(piecePosition,pieceColor);
            case "Ro":
                return new Rook(piecePosition,pieceColor);
            case "Qu":
                return new Queen(piecePosition,pieceColor);
            case "Kn":
                return new Knight(piecePosition,pieceColor);
            case "Pa":
                return new Pawn(piecePosition,pieceColor);
            case "Ki":
                return new King(piecePosition,pieceColor);
            default:
                throw new Error(`Invalid piece type ${pieceType}`);
        }
    }
}
