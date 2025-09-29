export enum Piece {
    EMPTY = 0,
    BLACK = 1,
    WHITE = 2,
}

export class GoGo {
    static readonly ROWS = 9;
    static readonly COLS = 9;

    board: number[][];

    constructor() {
        this.board = Array.from({ length: GoGo.ROWS }, () => new Array(GoGo.COLS).fill(Piece.EMPTY));
    }
}
