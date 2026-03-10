import {Piece} from "./pieces/Piece";
import Knight from "./pieces/Knight";
import {PiecePosition} from "./utils/PiecePosition";
import Pawn from "./pieces/Pawn";
import {PieceColorEnum} from "./utils/PieceColorEnum";
import Rook from "./pieces/Rook";
import Bishop from "./pieces/Bishop";
import King from "./pieces/King";
import Queen from "./pieces/Queen";

export function parsePiecePositions(positionString:String):Array<Piece> {
    let pieces = new Array<Piece>();
    let rows = positionString.replaceAll("\r\n","\n").split("\n");
    for(let i = 0; i < rows.length; i++){
        let row = rows[i];
        let piecesInRow = row.split(" ");
        for(let j = 0; j < piecesInRow.length; j++){
            let piece = piecesInRow[j];
            switch(piece){
                case "PaW":
                    pieces.push(new Pawn(new PiecePosition(j,7-i),PieceColorEnum.White))
                    break
                case "RoW":
                    pieces.push(new Rook(new PiecePosition(j,7-i),PieceColorEnum.White))
                    break
                case "KnW":
                    pieces.push(new Knight(new PiecePosition(j,7-i),PieceColorEnum.White))
                    break
                case "BiW":
                    pieces.push(new Bishop(new PiecePosition(j,7-i),PieceColorEnum.White))
                    break
                case "KiW":
                    pieces.push(new King(new PiecePosition(j,7-i),PieceColorEnum.White))
                    break
                case "QuW":
                    pieces.push(new Queen(new PiecePosition(j,7-i),PieceColorEnum.White))
                    break
                case "PaB":
                    pieces.push(new Pawn(new PiecePosition(j,7-i),PieceColorEnum.Black))
                    break
                case "RoB":
                    pieces.push(new Rook(new PiecePosition(j,7-i),PieceColorEnum.Black))
                    break
                case "KnB":
                    pieces.push(new Knight(new PiecePosition(j,7-i),PieceColorEnum.Black))
                    break
                case "BiB":
                    pieces.push(new Bishop(new PiecePosition(j,7-i),PieceColorEnum.Black))
                    break
                case "KiB":
                    pieces.push(new King(new PiecePosition(j,7-i),PieceColorEnum.Black))
                    break
                case "QuB":
                    pieces.push(new Queen(new PiecePosition(j,7-i),PieceColorEnum.Black))
                    break
                case "---":
                    break
            }
        }
    }
    return pieces;
}