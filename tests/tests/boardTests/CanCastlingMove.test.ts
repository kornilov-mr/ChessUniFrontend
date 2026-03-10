import Board from "../../../src/board/Board";
import {PiecePosition} from "../../../src/board/utils/PiecePosition";
import {MoveFactory} from "../../../src/board/utils/move/MoveFactory";
import {PieceColorEnum} from "../../../src/board/utils/PieceColorEnum";
import * as fs from "node:fs";

describe("Check function Board.canMove() on castling scenarios", () => {

    const castlingBoardFile = "tests/testBoards/castlingBoardFile"
    const interruptedCastlingBoardFile = "tests/testBoards/interruptedCastlingBoardFile"
    it("Checks Board.canMove() function, checks if it returns true for white short castle", () => {

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,0),new PiecePosition(6,0))
        expect(board.canMove(castlingMove)).toBe(true);
    });
    it("Checks Board.canMove() function, checks if it returns true for white long castle", () => {

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,0),new PiecePosition(2,0))
        expect(board.canMove(castlingMove)).toBe(true);
    });
    it("Checks Board.canMove() function, checks if it returns true for black short castle", () => {

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        board.currentColorToMove = PieceColorEnum.Black
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,7),new PiecePosition(6,7))
        expect(board.canMove(castlingMove)).toBe(true);
    });
    it("Checks Board.canMove() function, checks if it returns true for black long castle", () => {

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        board.currentColorToMove = PieceColorEnum.Black
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,7),new PiecePosition(2,7))
        expect(board.canMove(castlingMove)).toBe(true);
    });

    it("Checks Board.canMove() function, checks if it returns true for black short castle even if the corner square is under attack", () => {

        let board = new Board();
        board.loadPositions(fs.readFileSync(interruptedCastlingBoardFile, "utf8"))
        board.currentColorToMove = PieceColorEnum.Black
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,7),new PiecePosition(6,7))
        expect(board.canMove(castlingMove)).toBe(true);
    });
    it("Checks Board.canMove() function, checks if it returns false for black long castle because the square next to the king is under attack", () => {

        let board = new Board();
        board.loadPositions(fs.readFileSync(interruptedCastlingBoardFile, "utf8"))
        board.currentColorToMove = PieceColorEnum.Black
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,7),new PiecePosition(2,7))
        expect(board.canMove(castlingMove)).toBe(false);
    });
    it("Checks Board.canMove() function, checks if it returns false for white short castle because the square next to the king is under attack", () => {

        let board = new Board();
        board.loadPositions(fs.readFileSync(interruptedCastlingBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,0),new PiecePosition(6,0))
        expect(board.canMove(castlingMove)).toBe(false);
    });
    it("Checks Board.canMove() function, checks if it returns true for white long castle even if the corner square is under attack", () => {

        let board = new Board();
        board.loadPositions(fs.readFileSync(castlingBoardFile, "utf8"))
        let moveFactory = new MoveFactory(board)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,0),new PiecePosition(2,0))
        expect(board.canMove(castlingMove)).toBe(true);
    });
});