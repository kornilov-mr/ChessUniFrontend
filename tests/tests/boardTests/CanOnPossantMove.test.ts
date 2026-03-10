import Board from "../../../src/board/Board";
import {PiecePosition} from "../../../src/board/utils/PiecePosition";
import {MoveFactory} from "../../../src/board/utils/move/MoveFactory";
import pawn from "../../../src/board/pieces/Pawn";
import {PieceColorEnum} from "../../../src/board/utils/PieceColorEnum";
import * as fs from "node:fs";

describe("Check function Board.canMove() on castling scenarios", () => {

    const onPassantMoveBoard = "tests/testBoards/onPassantMoveBoard"
    it("Checks Board.canMove() function, checks if it returns true for a simple onPassant", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(onPassantMoveBoard, "utf8"))
        board.onPassantSquare = [new PiecePosition(2,5),board.pieces[2][4]! as pawn]
        let moveFactory = new MoveFactory(board)
        let promotionMove = moveFactory.createMove(new PiecePosition(1,4),new PiecePosition(2,5))
        expect(board.canMove(promotionMove)).toBe(true);
    });
    it("Checks Board.canMove() function, checks if it returns true for a simple onPassant if the previous move was a double pawn move", () => {
        let board = new Board();
        board.loadPositions(fs.readFileSync(onPassantMoveBoard, "utf8"))
        board.currentColorToMove = PieceColorEnum.Black
        let moveFactory = new MoveFactory(board)
        let doublePawnMove = moveFactory.createMove(new PiecePosition(6,6),new PiecePosition(6,4))
        board.makeAMove(doublePawnMove)
        let promotionMove = moveFactory.createMove(new PiecePosition(5,4),new PiecePosition(6,5))
        expect(board.canMove(promotionMove)).toBe(true);
    });

});