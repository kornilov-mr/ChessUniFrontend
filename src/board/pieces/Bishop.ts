import {Piece} from "./Piece";
import {PiecePosition} from "../utils/PiecePosition";
import {PieceColorEnum} from "../utils/PieceColorEnum";
import Board from "../Board";
import {getAllAttacksBeforeAPieceInRow, getAllMovesBeforeAPieceInRow} from "../utils/utils";
import {Move} from "../utils/move/Move";

class Bishop extends Piece {

    constructor(position: PiecePosition, color: PieceColorEnum) {
        super(position, color, "Bi");
    }

    GetPossibleAttacks(board: Board): Array<Move> {
        let possibleAttacks = new Array<Move>();
        possibleAttacks.push(...getAllAttacksBeforeAPieceInRow(this.position, 1, 1, board))
        possibleAttacks.push(...getAllAttacksBeforeAPieceInRow(this.position, -1, 1, board))
        possibleAttacks.push(...getAllAttacksBeforeAPieceInRow(this.position, 1, -1, board))
        possibleAttacks.push(...getAllAttacksBeforeAPieceInRow(this.position, -1, -1, board))

        return possibleAttacks;
    }

    GetPossibleMoves(board: Board): Array<Move> {
        let possibleMoves = new Array<Move>();
        possibleMoves.push(...getAllMovesBeforeAPieceInRow(this.position, 1, 1, this.color, board))
        possibleMoves.push(...getAllMovesBeforeAPieceInRow(this.position, -1, 1, this.color, board))
        possibleMoves.push(...getAllMovesBeforeAPieceInRow(this.position, 1, -1, this.color, board))
        possibleMoves.push(...getAllMovesBeforeAPieceInRow(this.position, -1, -1, this.color, board))

        return possibleMoves;
    }
}

export default Bishop