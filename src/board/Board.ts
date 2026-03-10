import {Piece} from "./pieces/Piece";
import {parsePiecePositions} from "./ParsePiecePositions";
import {Move} from "./utils/move/Move";
import {PiecePosition} from "./utils/PiecePosition";
import {PieceColorEnum} from "./utils/PieceColorEnum";
import King from "./pieces/King";
import Rook from "./pieces/Rook";
import Pawn from "./pieces/Pawn";
import {TravelMove} from "./utils/move/TravelMove";
import {CapturingMove} from "./utils/move/CapturingMove";
import {CastlingMove} from "./utils/move/CastlingMove";
import {PromotionMove} from "./utils/move/PromotionMove";
import {OnPassantMove} from "./utils/move/OnPassantMove";
import {isMoveIncluded} from "./utils/utils";
import {MoveFactory} from "./utils/move/MoveFactory";


/**
 * The main class, which contains all the pieces and the board, as well as more dynamic information such as:
 *      Where onPassantMove can be made.
 *      Who won the game.
 *      Current color to move.
 *      Black and White kings.
 *      Attacks made by the pieces of a specific color.
 */
class Board {
    private STANDARD_POSITIONS =
        `RoB KnB BiB QuB KiB BiB KnB RoB
PaB PaB PaB PaB PaB PaB PaB PaB
--- --- --- --- --- --- --- ---
--- --- --- --- --- --- --- ---
--- --- --- --- --- --- --- ---
--- --- --- --- --- --- --- ---
PaW PaW PaW PaW PaW PaW PaW PaW
RoW KnW BiW QuW KiW BiW KnW RoW`;
    public pieces: (Piece | null)[][] = Array.from({length: 8}, () =>
        Array(8).fill(null)
    );
    public allFieldsAttackedByBlack: boolean[][] = Array.from({length: 8}, () =>
        Array(8).fill(false)
    );
    public allFieldsAttackedByWhite: boolean[][] = Array.from({length: 8}, () =>
        Array(8).fill(false)
    );
    private moveFactory: MoveFactory = new MoveFactory(this)

    public whoWon: PieceColorEnum | null = null;
    public SquareUnderCheck: PiecePosition | null = null;

    public onPassantSquare: [PiecePosition, Pawn] | null = null;
    public currentColorToMove: PieceColorEnum = PieceColorEnum.White;

    public blackKing: King = new King(new PiecePosition(4, 0), PieceColorEnum.Black)
    public whiteKing: King = new King(new PiecePosition(4, 7), PieceColorEnum.White)


    /**
     * The function, which loads the standard positions of the pieces.
     */
    public initStartBoard() {
        this.loadPositions(this.STANDARD_POSITIONS)
    }

    /**
     * function, which loads the positions of the pieces from a string.
     * @param position - string with all positions
     */
    public loadPositions(position: string) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.pieces[i][j] = null;
            }
        }
        let pieces = parsePiecePositions(position);
        pieces.forEach(piece => {
            this.pieces[piece.position.col][piece.position.row] = piece;
        })
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.pieces[i][j] instanceof King) {
                    let king = this.pieces[i][j] as King;
                    if (king.color === PieceColorEnum.White) {
                        this.whiteKing = king;
                    } else {
                        this.blackKing = king;
                    }
                }
            }
        }
        this.updateAttacks();
    }

    /**
     * Updates the attacks for all the colors
     */
    public updateAttacks() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.allFieldsAttackedByBlack[i][j] = false;
                this.allFieldsAttackedByWhite[i][j] = false;
            }
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.pieces[i][j] == null)
                    continue
                let piece = this.pieces[i][j]!;
                let attacks = piece.GetPossibleAttacks(this);
                if (piece.color === PieceColorEnum.White) {
                    attacks.forEach(move => this.allFieldsAttackedByWhite[move.endPosition.col][move.endPosition.row] = true)
                } else {
                    attacks.forEach(move => this.allFieldsAttackedByBlack[move.endPosition.col][move.endPosition.row] = true)
                }
            }
        }
    }

    /**
     * function, which checks if the move is valid.
     * Checks the conditions for the move based on the specific move type.
     * Checks if the move is inside of possible moves for the piece type at the start.
     * Performs the move to check if the king is not in check.
     * Undoes the move.
     * @param move - the move to check
     * @returns true if the move is valid, false otherwise
     */
    public canMove(move: Move): boolean {
        if (this.pieces[move.startPosition.col][move.startPosition.row] == null)
            return false;
        let startPiece = this.pieces[move.startPosition.col][move.startPosition.row]!;
        if (startPiece.color !== this.currentColorToMove)
            return false

        switch (move.constructor) {
            case Move:
                throw new Error("the move is an instance of general move class, use MoveFactory for creating moves")
            case CastlingMove:
                let castlingMove = move as CastlingMove;
                let king = this.pieces[castlingMove.startPosition.col][castlingMove.startPosition.row]! as King;
                let rook = this.pieces[castlingMove.rookOldPosition.col][castlingMove.rookOldPosition.row];

                if (king.isMoved)
                    return false;
                if (rook == null)
                    return false;
                if (rook.color !== this.currentColorToMove)
                    return false;
                if (rook.isMoved)
                    return false;
                let attacks = PieceColorEnum.White === this.currentColorToMove ? this.allFieldsAttackedByBlack : this.allFieldsAttackedByWhite;
                let returns = true
                castlingMove.squaresWithoutAttacks.forEach(square => {
                    if (attacks[square.col][square.row]) {
                        returns = false;
                    }
                })
                return returns;
            case CapturingMove:
                let capturingMove = move as CapturingMove;
                if (this.pieces[capturingMove.endPosition.col][capturingMove.endPosition.row] == null ||
                    this.pieces[capturingMove.endPosition.col][capturingMove.endPosition.row]!.color === this.currentColorToMove)
                    return false;
                break;
            case TravelMove:
                if (this.pieces[move.endPosition.col][move.endPosition.row] != null)
                    return false;
                break;
            case PromotionMove:
                break;
            case OnPassantMove:
                break;
            default:
                throw new Error(`unknown move type ${move.constructor.name}`)
        }

        let possibleMoves = startPiece.GetPossibleMoves(this)
        let isInMoves = isMoveIncluded(possibleMoves, move)

        if (!isInMoves)
            return false;
        this.makeAMove(move, false)
        if (this.currentColorToMove === PieceColorEnum.Black) {
            if (this.allFieldsAttackedByBlack[this.whiteKing.position.col][this.whiteKing.position.row]) {
                this.undoMove(move)
                return false
            }
        } else {
            if (this.allFieldsAttackedByWhite[this.blackKing.position.col][this.blackKing.position.row]) {
                this.undoMove(move)
                return false
            }
        }
        this.undoMove(move)
        return true
    }

    /**
     * Function, which applies the changes regardless if the move is valid or not (should be paired with canMove())
     * @param move - The move to make
     * @param realMove - If they should update the state of the game (set to false if the move will be undone by the canMove() function)
     */
    public makeAMove(move: Move, realMove = true) {
        let startPiece = this.pieces[move.startPosition.col][move.startPosition.row]!;

        switch (move.constructor) {
            case Move:
                throw new Error("the move is an instance of general move class, use MoveFactory for creating moves")
            case CapturingMove:
            case TravelMove:
                this.pieces[move.endPosition.col][move.endPosition.row] = this.pieces[move.startPosition.col][move.startPosition.row]
                this.pieces[move.startPosition.col][move.startPosition.row] = null
                let piece = this.pieces[move.endPosition.col][move.endPosition.row]!;
                piece.movePiece(move.endPosition)
                break;
            case CastlingMove:
                let castlingMove = move as CastlingMove;
                let king = this.pieces[castlingMove.kingOldPosition.col][castlingMove.kingOldPosition.row] as King;
                let rook = this.pieces[castlingMove.rookOldPosition.col][castlingMove.rookOldPosition.row] as Rook;

                this.pieces[castlingMove.kingOldPosition.col][castlingMove.kingOldPosition.row] = null;
                this.pieces[castlingMove.rookOldPosition.col][castlingMove.rookOldPosition.row] = null;

                this.pieces[castlingMove.kingNewPosition.col][castlingMove.kingNewPosition.row] = king;
                this.pieces[castlingMove.rookNewPosition.col][castlingMove.rookNewPosition.row] = rook;

                king.movePiece(castlingMove.kingNewPosition);
                rook.movePiece(castlingMove.rookNewPosition);
                break;
            case PromotionMove:
                let promotionMove = move as PromotionMove;
                this.pieces[move.endPosition.col][move.endPosition.row] = promotionMove.newPiece
                this.pieces[move.endPosition.col][move.endPosition.row]!.isMoved = true;
                this.pieces[move.startPosition.col][move.startPosition.row] = null
                break;
            case OnPassantMove:
                let onPassantMove = move as OnPassantMove;
                this.pieces[move.endPosition.col][move.endPosition.row] = this.pieces[move.startPosition.col][move.startPosition.row]
                this.pieces[onPassantMove.startPosition.col][onPassantMove.startPosition.row] = null
                this.pieces[onPassantMove.pawnToCapture.position.col][onPassantMove.pawnToCapture.position.row] = null
                this.pieces[move.endPosition.col][move.endPosition.row]!.movePiece(move.endPosition)
                break;
            default:
                throw new Error(`unknown move type ${move.constructor.name}`)
        }
        if (realMove) {
            if ((startPiece instanceof Pawn) && Math.abs(move.startPosition.row - move.endPosition.row) === 2) {
                this.onPassantSquare = [new PiecePosition(move.startPosition.col, (move.startPosition.row + move.endPosition.row) / 2),
                    startPiece]
            } else {
                this.onPassantSquare = null
            }
        }
        this.currentColorToMove = this.currentColorToMove === PieceColorEnum.White ? PieceColorEnum.Black : PieceColorEnum.White;
        if (realMove) {
            let isCheckMate = this.checkMateForColor(this.currentColorToMove)
            if (isCheckMate) {
                this.whoWon = this.currentColorToMove === PieceColorEnum.White ? PieceColorEnum.Black : PieceColorEnum.White;
            }
        }
        this.updateAttacks()
        let currentKing = this.currentColorToMove === PieceColorEnum.White ? this.whiteKing : this.blackKing;
        let oppositeAttacks = this.currentColorToMove === PieceColorEnum.White ? this.allFieldsAttackedByBlack : this.allFieldsAttackedByWhite;
        if (realMove) {
            this.SquareUnderCheck = oppositeAttacks[currentKing.position.col][currentKing.position.row] ? currentKing.position : null
        }
    }

    /**
     * Function, which undoes the move. and that recalculates the attacks.
     * @param move - the move to undone
     */
    public undoMove(move: Move) {
        switch (move.constructor) {
            case Move:
                throw new Error("the move is an instance of general move class, use MoveFactory for creating moves")
            case CapturingMove:
                let capturingMove = move as CapturingMove;
                this.pieces[move.startPosition.col][move.startPosition.row] = this.pieces[move.endPosition.col][move.endPosition.row]
                this.pieces[move.endPosition.col][move.endPosition.row] = capturingMove.capturedPiece
                this.pieces[move.startPosition.col][move.startPosition.row]!.movePiece(move.startPosition)
                this.pieces[move.startPosition.col][move.startPosition.row]!.isMoved = capturingMove.isLastMovedPieceFirstMove
                break;
            case TravelMove:
                let travelMove = move as TravelMove;
                this.pieces[move.startPosition.col][move.startPosition.row] = this.pieces[move.endPosition.col][move.endPosition.row]
                this.pieces[move.endPosition.col][move.endPosition.row] = null
                this.pieces[move.startPosition.col][move.startPosition.row]!.movePiece(move.startPosition)
                this.pieces[move.startPosition.col][move.startPosition.row]!.isMoved = travelMove.isLastMovedPieceFirstMove
                break;
            case CastlingMove:
                /**
                 * Undo Move should never be undone, because isMoveValid cheks attacks on it's own and castling can lead to a discovered check
                 */
                throw new Error("castling move should never be undone")
            case PromotionMove:
                let promotionMove = move as PromotionMove;
                this.pieces[move.endPosition.col][move.endPosition.row] = promotionMove.capturedPiece
                this.pieces[move.startPosition.col][move.startPosition.row] = promotionMove.pawn
                break;
            case OnPassantMove:
                let onPassantMove = move as OnPassantMove;

                this.pieces[move.startPosition.col][move.startPosition.row] = this.pieces[move.endPosition.col][move.endPosition.row]
                this.pieces[move.endPosition.col][move.endPosition.row] = null
                this.pieces[move.startPosition.col][move.startPosition.row]!.movePiece(move.startPosition)
                this.pieces[onPassantMove.pawnToCapture.position.col][onPassantMove.pawnToCapture.position.row] = onPassantMove.pawnToCapture
                break;
            default:
                throw new Error(`unknown move type ${move.constructor.name}`)
        }
        this.currentColorToMove = this.currentColorToMove === PieceColorEnum.White ? PieceColorEnum.Black : PieceColorEnum.White;
        this.updateAttacks()
    }

    /**
     * Function, which checks if the specific color is in a checkmate.
     * First goes over the moves from a king (is usually enough to not go over all the pieces)
     * If the king doesn't have the moves, checks all the pieces of the color to see if some can move therefore block the check.
     *
     * @param color - the color to check
     * @returns true if the king is checkmated, false otherwise
     */
    public checkMateForColor(color: PieceColorEnum): boolean {
        let king = color === PieceColorEnum.White ? this.whiteKing : this.blackKing;
        let kingMoves = king.GetPossibleMoves(this);
        for (let i = 0; i < kingMoves.length; i++) {
            let kingMove = kingMoves[i];
            let realMove = this.moveFactory.createMove(kingMove.startPosition, kingMove.endPosition);
            if (this.canMove(realMove)) {
                return false;
            }
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.pieces[i][j] && this.pieces[i][j]!.color === color) {
                    let moves = this.pieces[i][j]!.GetPossibleMoves(this);
                    for (let g = 0; g < moves.length; g++) {
                        let realMove = this.moveFactory.createMove(moves[g].startPosition, moves[g].endPosition);
                        if (this.canMove(realMove)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    public toString(): string {
        let s = ""
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                if (this.pieces[j][i] == null) {
                    s += "---"
                } else {
                    if (this.pieces[j][i]!!.color === PieceColorEnum.White) {
                        s += this.pieces[j][i]!!.type + "W"
                    } else {
                        s += this.pieces[j][i]!!.type + "B"
                    }
                }
                if (j !== 7)
                    s += " ";
            }
            s += "\r\n"
        }
        return s;
    }

    public getAllPiecesStatesAsStrings() {
        let s = ""
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; j++) {
                if (this.pieces[i][j] != null) {
                    s += this.pieces[i][j]!.toString() + "\n"
                }
            }
        }
        return s
    }
}

export default Board