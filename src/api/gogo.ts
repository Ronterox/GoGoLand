export enum Piece {
    EMPTY = 0,
    BLACK = 1,
    WHITE = 2,
}

export enum GoGoError {
    NOT_ENDED = 'No player has requested to end the game',
    ALREADY_ENDED = 'Game has already ended',
    OUT_OF_BOUNDS = 'Illegal move, out of bounds',
    ALREADY_TAKEN = 'Illegal move, already taken',
}

export class GoGo {
    static readonly SIZE = 9;

    board: number[][];
    turn: Piece = Piece.BLACK;
    captures = { [Piece.BLACK]: 0, [Piece.WHITE]: 0 };

    constructor() {
        this.board = Array.from({ length: GoGo.SIZE }, () => new Array(GoGo.SIZE).fill(Piece.EMPTY));
    }

    isInBounds(x: number, y: number): boolean {
        return x >= 0 && x < GoGo.SIZE && y >= 0 && y < GoGo.SIZE;
    }

    public makeMove(x: number, y: number): { x: number, y: number } {
        if (!this.isInBounds(x, y)) throw new Error(GoGoError.OUT_OF_BOUNDS);
        if (this.board[y]![x] !== Piece.EMPTY) throw new Error(GoGoError.ALREADY_TAKEN);

        this.board[y]![x] = this.turn;
        this.turn = this.turn === Piece.BLACK ? Piece.WHITE : Piece.BLACK;

        let i, j;
        for (let [di, dj] of [[1, 0], [0, 1], [-1, 0], [0, -1], [0, 0]]) {
            i = y + di!;
            j = x + dj!;
            const piece = this.board[i]?.[j];
            const other = piece === Piece.BLACK ? Piece.WHITE : Piece.BLACK;
            if (!piece || piece === Piece.EMPTY) continue;

            let liberties = 4;
            let inBattle = false;
            for (let [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
                const bx = i + dx!;
                const by = j + dy!;
                if (!this.isInBounds(bx, by) || this.board[by]![bx] !== Piece.EMPTY) {
                    liberties--;
                    inBattle = by === y && bx === x || inBattle;
                }
            }

            if (liberties === 0 && inBattle) {
                this.captures[other]++;
                this.board[i]![j] = Piece.EMPTY;
            }
        }

        return { x, y };
    }

    public count(piece: Piece): number {
        return this.board.reduce((count, row) => count + row.filter((cell) => cell === piece).length, 0);
    }

    public printBoard() {
        console.log();
        this.board.forEach((row) => console.log(row.join(' ')));
        console.log();
    }
}
