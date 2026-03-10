import Board from "../../../src/board/Board";
import {MoveFactory} from "../../../src/board/utils/move/MoveFactory";
import {PiecePosition} from "../../../src/board/utils/PiecePosition";
import {PieceColorEnum} from "../../../src/board/utils/PieceColorEnum";
import Queen from "../../../src/board/pieces/Queen";
import pawn from "../../../src/board/pieces/Pawn";
import {PromotionMove} from "../../../src/board/utils/move/PromotionMove";
import * as fs from "node:fs";

describe("Check function Board.makeAMove()", () => {

    const castlingBoardFileBefore = "tests/testBoards/moveBoards/castlingBoardFileBefore"
    const castlingBoardFileAfter = "tests/testBoards/moveBoards/castlingBoardFileAfter"

    const captureMoveBoardBefore = "tests/testBoards/moveBoards/captureMoveBoardBefore"
    const captureMoveBoardAfter = "tests/testBoards/moveBoards/captureMoveBoardAfter"

    const travelMoveBoardBefore = "tests/testBoards/moveBoards/travelMoveBoardBefore"
    const travelMoveBoardAfter = "tests/testBoards/moveBoards/travelMoveBoardAfter"

    const promotionMoveBefore = "tests/testBoards/moveBoards/promotionMoveBefore"
    const promotionMoveAfter = "tests/testBoards/moveBoards/promotionMoveAfter"

    const capturePromotionMoveBefore = "tests/testBoards/moveBoards/capturePromotionMoveBefore"
    const capturePromotionMoveAfter = "tests/testBoards/moveBoards/capturePromotionMoveAfter"

    const onPassantMoveBefore = "tests/testBoards/moveBoards/onPassantMoveBefore"
    const onPassantMoveAfter = "tests/testBoards/moveBoards/onPassantMoveAfter"
    it("Checks the function with a castling move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(castlingBoardFileAfter, "utf8"))
        boardAfter.pieces[2][0]!.isMoved=true
        boardAfter.pieces[3][0]!.isMoved=true

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(castlingBoardFileBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let castlingMove = moveFactory.createMove(new PiecePosition(4,0),new PiecePosition(2,0))
        boardBefore.makeAMove(castlingMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
    it("Checks the function with a capturing move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(captureMoveBoardAfter, "utf8"))
        boardAfter.pieces[5][4]!.isMoved=true

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(captureMoveBoardBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let capturingMove = moveFactory.createMove(new PiecePosition(4,3),new PiecePosition(5,4))
        boardBefore.makeAMove(capturingMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
    it("Checks the function with a travel move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(travelMoveBoardAfter, "utf8"))
        boardAfter.pieces[3][3]!.isMoved=true

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(travelMoveBoardBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let travelMove = moveFactory.createMove(new PiecePosition(3,1),new PiecePosition(3,3))
        boardBefore.makeAMove(travelMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
    it("Checks the function with a promotion move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(promotionMoveAfter, "utf8"))
        boardAfter.pieces[1][7]!.isMoved=true

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(promotionMoveBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let promotionMove = moveFactory.createMove(new PiecePosition(1,6),new PiecePosition(1,7)) as PromotionMove
        promotionMove.pawn = boardBefore.pieces[1][6]!
        promotionMove.newPiece = new Queen(new PiecePosition(1,7),PieceColorEnum.White)
        boardBefore.makeAMove(promotionMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
    it("Checks the function with a onPassant move", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(onPassantMoveAfter, "utf8"))
        boardAfter.pieces[2][5]!.isMoved=true

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(onPassantMoveBefore, "utf8"))
        boardBefore.onPassantSquare = [new PiecePosition(2,5),boardBefore.pieces[2][4]! as pawn]
        let moveFactory = new MoveFactory(boardBefore)
        let onPassantMove = moveFactory.createMove(new PiecePosition(1,4),new PiecePosition(2,5))
        boardBefore.makeAMove(onPassantMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });

    it("Checks the function with a promotion move which is a capture as well", () => {
        let boardAfter = new Board();
        boardAfter.loadPositions(fs.readFileSync(capturePromotionMoveAfter, "utf8"))
        boardAfter.pieces[2][7]!.isMoved=true

        let boardBefore = new Board();
        boardBefore.loadPositions(fs.readFileSync(capturePromotionMoveBefore, "utf8"))
        let moveFactory = new MoveFactory(boardBefore)
        let promotionMove = moveFactory.createMove(new PiecePosition(1,6),new PiecePosition(2,7)) as PromotionMove
        promotionMove.pawn = boardBefore.pieces[1][6]!
        promotionMove.newPiece = new Queen(new PiecePosition(2,7),PieceColorEnum.White)
        boardBefore.makeAMove(promotionMove)

        expect(boardBefore.toString()).toBe(boardAfter.toString());
        expect(boardBefore.getAllPiecesStatesAsStrings()).toBe(boardAfter.getAllPiecesStatesAsStrings());
    });
});