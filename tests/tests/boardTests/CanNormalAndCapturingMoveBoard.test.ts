import Board from "../../../src/board/Board";
import {TravelMove} from "../../../src/board/utils/move/TravelMove";
import {PiecePosition} from "../../../src/board/utils/PiecePosition";
import {CapturingMove} from "../../../src/board/utils/move/CapturingMove";
import * as fs from "node:fs";
import {MoveFactory} from "../../../src/board/utils/move/MoveFactory";

describe("Check function GetPossibleAttacks() on every piece in different scenarios", () => {

    const kingFreeBoardFile = "tests/testBoards/kingFreeBoardFile"
    const kingOccupiedBoardFile1 = "tests/testBoards/kingOccupiedBoardFile1"
    const kingOccupiedBoardFile2 = "tests/testBoards/kingOccupiedBoardFile2"
    const kingPinBoardFile = "tests/testBoards/KingPinBoardFile"
    const errorTestBoard1 = "tests/testBoards/errorTestBoard1"
    it("Checks Board.canMove() function, checks if it returns false if the start piece isn't selected", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(kingFreeBoardFile, "utf8"))
        let travelMove = new TravelMove(new PiecePosition(4, 1), new PiecePosition(6, 1), true)
        expect(board.canMove(travelMove)).toBe(false);
    });
    it("Checks Board.canMove() function, checks if it returns false if the move isn't possible to do by the selected piece", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(kingFreeBoardFile, "utf8"))
        let travelMove = new TravelMove(new PiecePosition(3, 1), new PiecePosition(4, 3), true)
        expect(board.canMove(travelMove)).toBe(false);
    });
    it("Checks Board.canMove() function, checks if it returns true if the move is possible to do by the selected piece", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(kingFreeBoardFile, "utf8"))
        let travelMove = new TravelMove(new PiecePosition(3, 1), new PiecePosition(4, 2), true)
        expect(board.canMove(travelMove)).toBe(true);
    });
    it("Checks Board.canMove() function, checks if it returns false if the traveling move encounters a piece", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(kingOccupiedBoardFile1, "utf8"))
        let travelMove = new TravelMove(new PiecePosition(3, 1), new PiecePosition(4, 2), true)
        expect(board.canMove(travelMove)).toBe(false);
    })
    it("Checks Board.canMove() function, checks if it returns false if the capture move doesn't encounters a piece", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(kingFreeBoardFile, "utf8"))
        let capturingMove = new CapturingMove(new PiecePosition(3, 1), new PiecePosition(4, 2), board.pieces[4][2]!, true)
        expect(board.canMove(capturingMove)).toBe(false);
    })
    it("Checks Board.canMove() function, checks if king Can't take a piece, which is protected", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(kingOccupiedBoardFile2, "utf8"))
        let capturingMove = new CapturingMove(new PiecePosition(3, 1), new PiecePosition(4, 2), board.pieces[4][2]!, true)
        expect(board.canMove(capturingMove)).toBe(false);
    })
    it("Checks Board.canMove() function, checks if king Can't move to a square, which is protected", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(kingOccupiedBoardFile2, "utf8"))
        let travelMove = new TravelMove(new PiecePosition(3, 1), new PiecePosition(2, 2), true)
        expect(board.canMove(travelMove)).toBe(false);
    })
    it("Checks Board.canMove() function, checks if a pinned piece move, which exposes a check, should return false", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(kingPinBoardFile, "utf8"))
        let travelMove = new TravelMove(new PiecePosition(2, 2), new PiecePosition(4, 3), false)
        expect(board.canMove(travelMove)).toBe(false);
    })
    it("Checks Board.canMove() function, checks if move can prevent the checkmate", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(errorTestBoard1, "utf8"))
        let moveFactory = new MoveFactory(board)
        let capturingMove = moveFactory.createMove(new PiecePosition(6, 0),new PiecePosition(4, 1))
        expect(board.canMove(capturingMove)).toBe(true);
    })
});