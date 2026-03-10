import {Piece} from "./Piece";
import {PiecePosition} from "../utils/PiecePosition";
import {PieceColorEnum} from "../utils/PieceColorEnum";
import Board from "../Board";
import {isInsideABoard} from "../utils/utils";
import {Move} from "../utils/move/Move";

class King extends Piece {


    constructor(position: PiecePosition, color: PieceColorEnum) {
        super(position, color,"Ki");
    }
    GetPossibleAttacks(board: Board): Array<Move> {
        let possibleAttacks = new Array<Move>();
        possibleAttacks.push(this.position.createNewMoveRelative(1, 1))
        possibleAttacks.push(this.position.createNewMoveRelative(-1, 1))
        possibleAttacks.push(this.position.createNewMoveRelative(1, -1))
        possibleAttacks.push(this.position.createNewMoveRelative(-1, -1))

        possibleAttacks.push(this.position.createNewMoveRelative(0, 1))
        possibleAttacks.push(this.position.createNewMoveRelative(0, -1))
        possibleAttacks.push(this.position.createNewMoveRelative(1, 0))
        possibleAttacks.push(this.position.createNewMoveRelative(-1, 0))

        return possibleAttacks.filter(move => isInsideABoard(move.endPosition));
    }

    GetPossibleMoves(board: Board): Array<Move> {
        let possibleAttacks = this.GetPossibleAttacks(board)
        return possibleAttacks.filter(move => board.pieces[move.endPosition.col][move.endPosition.row] == null
            || board.pieces[move.endPosition.col][move.endPosition.row]!!.color !== this.color);
    }

}

export default King