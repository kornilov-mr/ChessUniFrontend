import Board from "../../../src/board/Board";
import {MoveFactory} from "../../../src/board/utils/move/MoveFactory";
import {PiecePosition} from "../../../src/board/utils/PiecePosition";
import {PieceColorEnum} from "../../../src/board/utils/PieceColorEnum";
import * as fs from "node:fs";

describe("Check Board.checkMateForColor() function", () => {

    const checkMateBoardFile = "tests/testBoards/checkMateBoardFile"
    it("Checks that the Board.whoWon would change to White after the last move", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(checkMateBoardFile, "utf8"))

        let moveFactory = new MoveFactory(board)
        let capturingMove = moveFactory.createMove(new PiecePosition(7,4),new PiecePosition(5,6))
        board.makeAMove(capturingMove)

        expect(board.whoWon).toBe(PieceColorEnum.White);
    });

});