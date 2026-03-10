import Board from "../../../src/board/Board";
import {MoveFactory} from "../../../src/board/utils/move/MoveFactory";
import {PiecePosition} from "../../../src/board/utils/PiecePosition";
import pawn from "../../../src/board/pieces/Pawn";
import * as fs from "node:fs";

describe("Check function GetPossibleAttacks() on every piece in different scenarios", () => {

    const castlingBoardFile = "tests/testBoards/castlingBoardFile"
    const pawnPromotionBoardFile = "tests/testBoards/pawnPromotionBoardFile"
    const onPassantMoveBoard = "tests/testBoards/onPassantMoveBoard"
    it("Checks MoveFactory.createMove() function, checks if it returns real castling move with all information for white short castle", () => {
        let expected = "CapturingMove{kingOldPosition:PiecePosition{col:4, row:0}, kingNewPosition:PiecePosition{col:6, row:0}, \n" +
            "        rookOldPosition:PiecePosition{col:7, row:0}, rookNewPosition:PiecePosition{col:5, row:0}, \n" +
            "        squaresWithoutAttacks:PiecePosition{col:6, row:0},PiecePosition{col:5, row:0},PiecePosition{col:4, row:0}} \n" +
            "        extends Move{startPosition:PiecePosition{col:4, row:0}, endPosition:PiecePosition{col:6, row:0}}"

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,0),new PiecePosition(6,0))
        expect(castlingMove.toString()).toBe(expected);
    });
    it("Checks MoveFactory.createMove() function, checks if it returns real castling move with all information for white long castle", () => {
        let expected = "CapturingMove{kingOldPosition:PiecePosition{col:4, row:0}, kingNewPosition:PiecePosition{col:2, row:0}, \n" +
            "        rookOldPosition:PiecePosition{col:0, row:0}, rookNewPosition:PiecePosition{col:3, row:0}, \n" +
            "        squaresWithoutAttacks:PiecePosition{col:3, row:0},PiecePosition{col:2, row:0},PiecePosition{col:4, row:0}} \n" +
            "        extends Move{startPosition:PiecePosition{col:4, row:0}, endPosition:PiecePosition{col:2, row:0}}"

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,0),new PiecePosition(2,0))
        expect(castlingMove.toString()).toBe(expected);
    });
    it("Checks MoveFactory.createMove() function, checks if it returns real castling move with all information for black short castle", () => {
        let expected = "CapturingMove{kingOldPosition:PiecePosition{col:4, row:7}, kingNewPosition:PiecePosition{col:6, row:7}, \n" +
            "        rookOldPosition:PiecePosition{col:7, row:7}, rookNewPosition:PiecePosition{col:5, row:7}, \n" +
            "        squaresWithoutAttacks:PiecePosition{col:6, row:7},PiecePosition{col:5, row:7},PiecePosition{col:4, row:7}} \n" +
            "        extends Move{startPosition:PiecePosition{col:4, row:7}, endPosition:PiecePosition{col:6, row:7}}"

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,7),new PiecePosition(6,7))
        expect(castlingMove.toString()).toBe(expected);
    });
    it("Checks MoveFactory.createMove() function, checks if it returns real castling move with all information for black long castle", () => {
        let expected = "CapturingMove{kingOldPosition:PiecePosition{col:4, row:7}, kingNewPosition:PiecePosition{col:2, row:7}, \n" +
            "        rookOldPosition:PiecePosition{col:0, row:7}, rookNewPosition:PiecePosition{col:3, row:7}, \n" +
            "        squaresWithoutAttacks:PiecePosition{col:3, row:7},PiecePosition{col:2, row:7},PiecePosition{col:4, row:7}} \n" +
            "        extends Move{startPosition:PiecePosition{col:4, row:7}, endPosition:PiecePosition{col:2, row:7}}"

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,7),new PiecePosition(2,7))
        expect(castlingMove.toString()).toBe(expected);
    });
    it("Checks MoveFactory.createMove() function, checks if it returns pawn promotion move if a white pawn is moved to the last row", () => {
        let expected = "CapturingMove{newPiece:undefined, pawn:Piece{type:Pa,position:PiecePosition{col:1, row:6},isMoved:false,color:white}} \n" +
            "        extends Move{startPosition:PiecePosition{col:1, row:6}, endPosition:PiecePosition{col:1, row:7}}"

        let board = new Board();
        board.loadPositions(fs.readFileSync(pawnPromotionBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let promotionMove = moveFactory.createMove(new PiecePosition(1,6),new PiecePosition(1,7))
        expect(promotionMove.toString()).toBe(expected);
    });
    it("Checks MoveFactory.createMove() function, checks if it returns pawn promotion move if a black pawn is moved to the last row", () => {
        let expected = "CapturingMove{newPiece:undefined, pawn:Piece{type:Pa,position:PiecePosition{col:7, row:1},isMoved:false,color:black}} \n" +
            "        extends Move{startPosition:PiecePosition{col:7, row:1}, endPosition:PiecePosition{col:7, row:0}}"
        let board = new Board();
        board.loadPositions(fs.readFileSync(pawnPromotionBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let promotionMove = moveFactory.createMove(new PiecePosition(7,1),new PiecePosition(7,0))
        expect(promotionMove.toString()).toBe(expected);
    });
    it("Checks MoveFactory.createMove() function, checks if it returns onPassant move if the board has registered a double pawn move", () => {
        let expected = "OnPassantMove{pawnToCapture:Piece{type:Pa,position:PiecePosition{col:2, row:4},isMoved:false,color:black}} \n" +
            "        extends Move{startPosition:PiecePosition{col:1, row:4}, endPosition:PiecePosition{col:2, row:5}}"
        let board = new Board();
        board.loadPositions(fs.readFileSync(onPassantMoveBoard, "utf8"))
        board.onPassantSquare = [new PiecePosition(2,5),board.pieces[2][4]! as pawn]
        let moveFactory = new MoveFactory(board)
        let promotionMove = moveFactory.createMove(new PiecePosition(1,4),new PiecePosition(2,5))
        expect(promotionMove.toString()).toBe(expected);
    });
});