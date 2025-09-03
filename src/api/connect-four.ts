export enum Player {
    NONE = 0,
    ONE = 1,
    TWO = 2,
}

export enum ConnectFourError {
    OUT_OF_BOUNDS = 'Illegal move, out of bounds',
    ALREADY_TAKEN = 'Illegal move, already taken',
    GAME_OVER = 'Illegal move, game is already over',
}

export type Cell = Player;

export class ConnectFour {
    static readonly BOARD_SIZE = 6;

    currentPlayer: Player = Player.ONE;
    winner?: Player;

    board: Cell[][];

    public isGameOver(): boolean {
        return this.winner !== undefined;
    }

    public restart() {
        this.winner = undefined;
        this.currentPlayer = Player.ONE;
        this.board.forEach((row) => row.fill(Player.NONE));
    }

    public printBoard() {
        console.log();
        this.board.forEach((row) => console.log(row.join(' ')));
        console.log();
    }

    private inBounds(x: number): boolean {
        return x >= 0 && x < ConnectFour.BOARD_SIZE;
    }

    public makeMove(x: number): { x: number, y: number } {
        if (!this.inBounds(x)) throw new Error(ConnectFourError.OUT_OF_BOUNDS);
        if (this.isGameOver()) throw new Error(ConnectFourError.GAME_OVER);

        for (let i = ConnectFour.BOARD_SIZE - 1; i >= 0; i--) {
            if (this.board[i]![x] === Player.NONE) {
                this.board[i]![x] = this.currentPlayer;
                const pos = { x, y: i };

                for (let [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
                    let x = pos.x + dx!;
                    let y = pos.y + dy!;
                    let connected = 1;


                    while (this.inBounds(x) && this.inBounds(y) && this.board[y]![x] === this.currentPlayer) {
                        connected++;
                        x += dx!;
                        y += dy!;
                    }

                    x = pos.x - dx!;
                    y = pos.y - dy!;

                    while (this.inBounds(x) && this.inBounds(y) && this.board[y]![x] === this.currentPlayer) {
                        connected++;
                        x -= dx!;
                        y -= dy!;
                    }

                    if (connected >= 4) this.winner = this.currentPlayer;
                }

                this.currentPlayer = this.currentPlayer === Player.ONE ? Player.TWO : Player.ONE;
                return pos;
            }
        }

        throw new Error(ConnectFourError.ALREADY_TAKEN);
    }

    constructor() {
        this.board = Array.from({ length: ConnectFour.BOARD_SIZE },
            () => new Array(ConnectFour.BOARD_SIZE).fill(Player.NONE));
    }
}
