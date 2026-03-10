import Board from "../../../src/board/Board";
import {moveArrayToString} from "../../../src/board/utils/utils";
import * as fs from "node:fs";

describe("Check function GetPossibleAttacks() on every piece in different scenarios", () => {

    const kingFreeBoardFile = "tests/testBoards/kingFreeBoardFile"
    const rookFreeBoardFile = "tests/testBoards/rookFreeBoardFile"
    const knightFreeBoardFile = "tests/testBoards/knightFreeBoardFile"
    const bishopFreeBoardFile = "tests/testBoards/bishopFreeBoardFile"
    const queenFreeBoardFile = "tests/testBoards/queenFreeBoardFile"
    const pawnBoardFile = "tests/testBoards/PawnsFreeAndBlockedBoard"
    const rookOccupiedBoardFile = "tests/testBoards/rookOccupiedBoardFile"
    it("Checks if king in a free space has right attacks", () => {
        let expected = "3,1-4,2|3,1-2,2|3,1-4,0|3,1-2,0|3,1-3,2|3,1-3,0|3,1-4,1|3,1-2,1"

        let board = new Board();
        board.loadPositions(fs.readFileSync(kingFreeBoardFile, "utf8"))
        let piece = board.pieces[3][1]!!;
        let moves = piece.GetPossibleAttacks(board);
        expect(moveArrayToString(moves)).toBe(expected);
    });
    it("Checks if rook in a free space has right attacks", () => {
        let expected = "0,7-1,7|0,7-2,7|0,7-3,7|0,7-4,7|0,7-5,7|0,7-6,7|0,7-7,7|0,7-0,6|0,7-0,5|0,7-0,4|0,7-0,3|0,7-0,2|0,7-0,1|0,7-0,0"

        let board = new Board();
        board.loadPositions(fs.readFileSync(rookFreeBoardFile, "utf8"))
        let piece = board.pieces[0][7]!!;
        let moves = piece.GetPossibleAttacks(board);
        expect(moveArrayToString(moves)).toBe(expected);
    });
    it("Checks if knight in a free space has right attacks", () => {
        let expected = "4,2-6,3|4,2-5,4|4,2-2,3|4,2-3,4|4,2-6,1|4,2-5,0|4,2-2,1|4,2-3,0"

        let board = new Board();
        board.loadPositions(fs.readFileSync(knightFreeBoardFile, "utf8"))
        let piece = board.pieces[4][2]!!;
        let moves = piece.GetPossibleAttacks(board);
        expect(moveArrayToString(moves)).toBe(expected);
    });
    it("Checks if bishop in a free space has the right attacks", () => {
        let expected = "3,3-4,4|3,3-5,5|3,3-6,6|3,3-7,7|3,3-2,4|3,3-1,5|3,3-0,6|3,3-4,2|3,3-5,1|3,3-6,0|3,3-2,2|3,3-1,1|3,3-0,0"

        let board = new Board();
        board.loadPositions(fs.readFileSync(bishopFreeBoardFile, "utf8"))
        let piece = board.pieces[3][3]!!;
        let moves = piece.GetPossibleAttacks(board);
        expect(moveArrayToString(moves)).toBe(expected);
    });
    it("Checks if queen in a free space has the right attacks", () => {
        let expected = "5,4-5,5|5,4-5,6|5,4-5,7|5,4-6,4|5,4-7,4|5,4-4,4|5,4-3,4|5,4-2,4|5,4-1,4|5,4-0,4|5,4-5,3|5,4-5,2|5,4-5,1|5,4-5,0|5,4-6,5|5,4-7,6|5,4-4,5|5,4-3,6|5,4-2,7|5,4-6,3|5,4-7,2|5,4-4,3|5,4-3,2|5,4-2,1|5,4-1,0"

        let board = new Board();
        board.loadPositions(fs.readFileSync(queenFreeBoardFile, "utf8"))
        let piece = board.pieces[5][4]!!;
        let moves = piece.GetPossibleAttacks(board);
        expect(moveArrayToString(moves)).toBe(expected);
    });
    it("Checks if Pawn, will have 2 attacks", () => {
        let expected = "5,1-6,2|5,1-4,2"

        let board = new Board();
        board.loadPositions(fs.readFileSync(pawnBoardFile, "utf8"))
        let piece = board.pieces[5][1]!!;
        let moves = piece.GetPossibleAttacks(board);
        expect(moveArrayToString(moves)).toBe(expected);
    });
    it("Checks that, a rook will be blocked by piece of the same color and won't be able to go on the piece", () => {
        let expected = "0,7-1,7|0,7-2,7|0,7-0,6|0,7-0,5"

        let board = new Board();
        board.loadPositions(fs.readFileSync(rookOccupiedBoardFile, "utf8"))
        let piece = board.pieces[0][7]!!;
        let moves = piece.GetPossibleAttacks(board)
        expect(moveArrayToString(moves)).toBe(expected)
    });
});