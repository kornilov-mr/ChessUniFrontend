import {Move} from "./move/Move";

export class PiecePosition {
    public row: number;
    public col: number;

    constructor(col: number,row: number) {
        this.col = col;
        this.row = row;
    }
    public createNewPositionRelative(x:number, y:number){
        return new PiecePosition(this.col + x, this.row + y);
    }
    public createNewMoveRelative(x:number, y:number){
        return new Move(this, this.createNewPositionRelative(x,y));
    }
    toString(): string {
        return `PiecePosition{col:${this.col}, row:${this.row}}`;
    }
}