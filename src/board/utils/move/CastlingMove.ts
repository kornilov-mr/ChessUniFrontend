import {Move} from "./Move";
import {PiecePosition} from "../PiecePosition";


/**
 * An inheritor of Move that represents a castling move.
 * @extends Move
 * @param kingOldPosition - The starting position of the king.
 * @param rookOldPosition - The starting position of the rook.
 * @param rookNewPosition - The ending position of the rook.
 * @param kingNewPosition - The ending position of the king.
 * @param squaresWithoutAttacks - The squares that should not be attacked by the enemy pieces to castle safely.
 *
 * @description Handles information about two moves at the same time, as well as logic for attacks,
 * so that the board shouldn't check for specific castling requirements
 */
export class CastlingMove extends Move {

    public kingOldPosition: PiecePosition
    public rookOldPosition: PiecePosition
    public kingNewPosition: PiecePosition
    public rookNewPosition: PiecePosition
    public squaresWithoutAttacks: Array<PiecePosition> = new Array<PiecePosition>();

    constructor(kingOldPosition: PiecePosition, kingNewPosition: PiecePosition, rookOldPosition: PiecePosition, rookNewPosition: PiecePosition, squaresWithoutAttacks: Array<PiecePosition>) {
        super(kingOldPosition, kingNewPosition);
        this.kingOldPosition = kingOldPosition;
        this.rookOldPosition = rookOldPosition;
        this.kingNewPosition = kingNewPosition;
        this.rookNewPosition = rookNewPosition;
        this.squaresWithoutAttacks = squaresWithoutAttacks;
    }

    toString(): string {
        return `CapturingMove{kingOldPosition:${this.kingOldPosition.toString()}, kingNewPosition:${this.kingNewPosition.toString()}, 
        rookOldPosition:${this.rookOldPosition.toString()}, rookNewPosition:${this.rookNewPosition.toString()}, 
        squaresWithoutAttacks:${this.squaresWithoutAttacks.toString()}} 
        extends ${super.toString()}`;
    }
}