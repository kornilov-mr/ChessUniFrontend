import Board from "../../../src/board/Board";
import {MoveFactory} from "../../../src/board/utils/move/MoveFactory";
import {PiecePosition} from "../../../src/board/utils/PiecePosition";
import pawn from "../../../src/board/pieces/Pawn";
import {PieceColorEnum} from "../../../src/board/utils/PieceColorEnum";
import Queen from "../../../src/board/pieces/Queen";
import {PromotionMove} from "../../../src/board/utils/move/PromotionMove";
import * as fs from "node:fs";

describe("Check function Board.undoMove()", () => {


    const captureMoveBoardBefore = "tests/testBoards/moveBoards/captureMoveBoardBefore"

    const travelMoveBoardBefore = "tests/testBoards/moveBoards/travelMoveBoardBefore"

    const promotionMoveBefore = "tests/testBoards/moveBoards/promotionMoveBefore"

    const onPassantMoveBefore = "tests/testBoards/moveBoards/onPassantMoveBefore"

    const capturePromotionMoveBefore = "tests/testBoards/moveBoards/capturePromotionMoveBefore"

    it("Checks the function with a capturing move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(captureMoveBoardBefore, "utf8"))

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(captureMoveBoardBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let capturingMove = moveFactory.createMove(new PiecePosition(4,3),new PiecePosition(5,4))
        boardBefore.makeAMove(capturingMove)
        boardBefore.undoMove(capturingMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
    it("Checks the function with a travel move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(travelMoveBoardBefore, "utf8"))

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(travelMoveBoardBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let travelMove = moveFactory.createMove(new PiecePosition(3,1),new PiecePosition(3,3))
        boardBefore.makeAMove(travelMove)
        boardBefore.undoMove(travelMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
    it("Checks the function with a promotion move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(promotionMoveBefore, "utf8"))

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(promotionMoveBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let promotionMove = moveFactory.createMove(new PiecePosition(1,6),new PiecePosition(1,7)) as PromotionMove
        promotionMove.pawn = boardBefore.pieces[1][6]!
        promotionMove.newPiece = new Queen(new PiecePosition(1,7),PieceColorEnum.White)
        boardBefore.makeAMove(promotionMove)
        boardBefore.undoMove(promotionMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
    it("Checks the function with a onPassant move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(onPassantMoveBefore, "utf8"))

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(onPassantMoveBefore, "utf8"))
        boardBefore.onPassantSquare = [new PiecePosition(2,5),boardBefore.pieces[2][4]! as pawn]
        let moveFactory = new MoveFactory(boardBefore)
        let onPassantMove = moveFactory.createMove(new PiecePosition(1,4),new PiecePosition(2,5))
        boardBefore.makeAMove(onPassantMove)
        boardBefore.undoMove(onPassantMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
    });
    it("Checks the function with a promotion move which is a capture as well", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(capturePromotionMoveBefore, "utf8"))

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(capturePromotionMoveBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let promotionMove = moveFactory.createMove(new PiecePosition(1,6),new PiecePosition(2,7)) as PromotionMove
        promotionMove.pawn = boardBefore.pieces[1][6]!
        promotionMove.newPiece = new Queen(new PiecePosition(2,7),PieceColorEnum.White)
        boardBefore.makeAMove(promotionMove)
        boardBefore.undoMove(promotionMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
});