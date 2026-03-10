import {PiecePosition} from "../PiecePosition";
import Board from "../../Board";
import {Move} from "./Move";
import {CouldNotCreateAMoveError} from "./CouldNotCreateAMoveError";
import King from "../../pieces/King";
import {CastlingMove} from "./CastlingMove";
import {PieceColorEnum} from "../PieceColorEnum";
import Pawn from "../../pieces/Pawn";
import {PromotionMove} from "./PromotionMove";
import {OnPassantMove} from "./OnPassantMove";
import {CapturingMove} from "./CapturingMove";
import {TravelMove} from "./TravelMove";


/**
 * Factory class for creating a move from a simple start - end position pair to more complex moves with additional information
 *
 * @param board - The board instance.
 *
 * @property castlingMoves - A map of possible castling moves. The key is a string representing the start and
 *                  end positions of the castling move with the color of the king involved.
 *                  Values are the castling move objects, which represent the specific details of the castling move.
 * @property promotionRows - A map of possible promotion rows. The key is the color of the pawn that will be promoted.
 *                  for white - row 7, for black - row 0.
 *                  Values are the row numbers where the pawn can be promoted.
 *
 */
export class MoveFactory {

    private board: Board
    private castlingMoves: Map<String, CastlingMove> = new Map([
        [
            this.getKey(new PiecePosition(4, 0), new PiecePosition(2, 0), PieceColorEnum.White),
            new CastlingMove(new PiecePosition(4, 0), new PiecePosition(2, 0),
                new PiecePosition(0, 0), new PiecePosition(3, 0),
                [new PiecePosition(3, 0), new PiecePosition(2, 0),
                    new PiecePosition(4, 0)])
        ],
        [
            this.getKey(new PiecePosition(4, 0), new PiecePosition(6, 0), PieceColorEnum.White),
            new CastlingMove(new PiecePosition(4, 0), new PiecePosition(6, 0),
                new PiecePosition(7, 0), new PiecePosition(5, 0),
                [new PiecePosition(6, 0), new PiecePosition(5, 0),
                    new PiecePosition(4, 0)])
        ],
        [
            this.getKey(new PiecePosition(4, 7), new PiecePosition(6, 7), PieceColorEnum.Black),
            new CastlingMove(new PiecePosition(4, 7), new PiecePosition(6, 7),
                new PiecePosition(7, 7), new PiecePosition(5, 7),
                [new PiecePosition(6, 7), new PiecePosition(5, 7),
                    new PiecePosition(4, 7)])
        ],
        [
            this.getKey(new PiecePosition(4, 7), new PiecePosition(2, 7), PieceColorEnum.Black),
            new CastlingMove(new PiecePosition(4, 7), new PiecePosition(2, 7),
                new PiecePosition(0, 7), new PiecePosition(3, 7),
                [new PiecePosition(3, 7), new PiecePosition(2, 7),
                    new PiecePosition(4, 7)])
        ]
    ]);
    private promotionRows: Map<PieceColorEnum, number> = new Map([
        [PieceColorEnum.White, 7],
        [PieceColorEnum.Black, 0],
    ]);

    public constructor(board: Board) {
        this.board = board;
    }

    /**
     * Function to create a move based on the start and end positions of the piece.
     * Handles different types of moves (capturing, travel, castling, promotion, on-passant).
     * So that user has to only select two squares and the additional information is taken from the board.
     *
     * @param startPosition - The starting position of the piece (user click).
     * @param endPosition - The ending position of the piece (user click).
     *
     * @throws CouldNotCreateAMoveError - If the start position is not valid or if the move is not possible.
     *
     * @returns A Move object representing the move.
     *          Can be a CapturingMove, TravelMove, CastlingMove, PromotionMove, OnPassantMove.
     */
    public createMove(startPosition: PiecePosition, endPosition: PiecePosition): Move {
        let startPiece = this.board.pieces[startPosition.col][startPosition.row]
        if (startPiece == null)
            throw new CouldNotCreateAMoveError("Please select a start piece")
        if (startPiece instanceof King) {
            let king = startPiece as King
            if (!king.isMoved) {
                let possibleCastlingMove = this.castlingMoves.get(this.getKey(startPosition, endPosition, king.color))!
                if (possibleCastlingMove != null) {
                    let rook = this.board.pieces[possibleCastlingMove.rookOldPosition.col][possibleCastlingMove.rookOldPosition.row]
                    if (rook != null && !rook.isMoved)
                        return possibleCastlingMove
                }
            }
        }
        if (startPiece instanceof Pawn) {
            let pawn = startPiece as Pawn
            let promotionRow = this.promotionRows.get(pawn.color)!
            if (endPosition.row === promotionRow) {
                return new PromotionMove(startPosition, endPosition, pawn, this.board.pieces[endPosition.col][endPosition.row])
            }
            let passantSquare = this.board.onPassantSquare
            if (passantSquare != null && passantSquare[0].row === endPosition.row && passantSquare[0].col === endPosition.col) {
                return new OnPassantMove(startPosition, endPosition, passantSquare[1])
            }
        }
        if (this.board.pieces[endPosition.col][endPosition.row] != null) {
            return new CapturingMove(startPosition, endPosition, this.board.pieces[endPosition.col][endPosition.row]!, startPiece.isMoved)
        } else {
            return new TravelMove(startPosition, endPosition, startPiece.isMoved)
        }
    }

    private getKey(position1: PiecePosition, position2: PiecePosition, color: PieceColorEnum) {
        return position1.toString() + position2.toString() + color.toString();
    }
}