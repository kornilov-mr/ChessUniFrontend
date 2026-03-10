import {Piece} from "./Piece";
import {PiecePosition} from "../utils/PiecePosition";
import {PieceColorEnum} from "../utils/PieceColorEnum";
import Board from "../Board";
import {isInsideABoard} from "../utils/utils";
import {Move} from "../utils/move/Move";

class Pawn extends Piece {

    constructor(position: PiecePosition, color: PieceColorEnum) {
        super(position, color,"Pa");
    }

    GetPossibleAttacks(board: Board): Array<Move> {
        let possibleAttacks = new Array<Move>();
        if(this.color === PieceColorEnum.White){
            possibleAttacks.push(this.position.createNewMoveRelative(1,1))
            possibleAttacks.push(this.position.createNewMoveRelative(-1,1))
        }else{
            possibleAttacks.push(this.position.createNewMoveRelative(1,-1))
            possibleAttacks.push(this.position.createNewMoveRelative(-1,-1))
        }
        return possibleAttacks.filter(pos => isInsideABoard(pos.endPosition));
    }

    GetPossibleMoves(board: Board): Array<Move> {
        let attacks = this.GetPossibleAttacks(board);
        let possibleMoves = attacks.filter(move => {
                const piece = board.pieces[move.endPosition.col][move.endPosition.row];
            return (piece !== null && piece.color !== this.color) || (board.onPassantSquare!=null
                && board.onPassantSquare[0].col === move.endPosition.col&&board.onPassantSquare[0].row === move.endPosition.row);
        });

        if(this.color === PieceColorEnum.White){
            const forward1 = this.position.createNewMoveRelative(0,1);
            if(isInsideABoard(forward1.endPosition) && board.pieces[forward1.endPosition.col][forward1.endPosition.row] === null) {
                possibleMoves.push(forward1);
                const forward2 = this.position.createNewMoveRelative(0,2);
                if(!this.isMoved && isInsideABoard(forward2.endPosition) && board.pieces[forward2.endPosition.col][forward2.endPosition.row] === null) {
                    possibleMoves.push(forward2);
                }
            }
        }else{
            const forward1 = this.position.createNewMoveRelative(0,-1);
            if(isInsideABoard(forward1.endPosition) && board.pieces[forward1.endPosition.col][forward1.endPosition.row] === null) {
                possibleMoves.push(forward1);
                const forward2 = this.position.createNewMoveRelative(0,-2);
                if(!this.isMoved && isInsideABoard(forward2.endPosition) && board.pieces[forward2.endPosition.col][forward2.endPosition.row] === null) {
                    possibleMoves.push(forward2);
                }
            }
        }
        return possibleMoves;
    }

}

export default Pawn