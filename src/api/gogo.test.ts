import { test, expect, describe } from 'bun:test';
import { GoGo, GoGoError, Piece } from './gogo';

describe('Initializing Game', () => {
    const game = new GoGo();

    test('should have an x by x board with all empty cells', () => {
        expect(game.board.length).toBe(GoGo.SIZE);
        expect(game.board[0]!.length).toBe(GoGo.SIZE);
        game.board.forEach((row) => row.forEach((cell) => expect(cell).toBe(Piece.EMPTY)));
    });

    test('should be black turn and should make a move', () => {
        expect(game.turn).toBe(Piece.BLACK);
        const position = game.makeMove(0, 0);
        expect(position).toEqual({ x: 0, y: 0 });
        expect(game.board[0]![0]).toBe(Piece.BLACK);
    });

    test('should be white turn and make another move and fail', () => {
        expect(game.turn).toBe(Piece.WHITE);
        expect(() => game.makeMove(0, 0)).toThrow(GoGoError.ALREADY_TAKEN);
        expect(game.turn).toBe(Piece.WHITE);
    });

    test('it should fail if illegal move', () => {
        expect(game.turn).toBe(Piece.WHITE);
        expect(() => game.makeMove(-1, 0)).toThrow(GoGoError.OUT_OF_BOUNDS);
        expect(() => game.makeMove(0, -1)).toThrow(GoGoError.OUT_OF_BOUNDS);
        expect(() => game.makeMove(GoGo.SIZE, 0)).toThrow(GoGoError.OUT_OF_BOUNDS);
        expect(() => game.makeMove(0, GoGo.SIZE)).toThrow(GoGoError.OUT_OF_BOUNDS);
        expect(game.turn).toBe(Piece.WHITE);
    })

    test('white should capture black', () => {
        expect(game.count(Piece.WHITE)).toBe(0);
        expect(game.count(Piece.BLACK)).toBe(1);
        expect(game.captures[Piece.BLACK]).toBe(0);
        expect(game.captures[Piece.WHITE]).toBe(0);

        game.makeMove(0, 1); // white below
        game.makeMove(1, 0); // black right
        game.makeMove(1, 1); // white right-below
        game.makeMove(0, 2); // black below
        game.makeMove(2, 0); // white right

        game.printBoard();

        expect(game.captures[Piece.BLACK]).toBe(0);
        expect(game.captures[Piece.WHITE]).toBe(2);
        expect(game.count(Piece.BLACK)).toBe(0);
        expect(game.count(Piece.WHITE)).toBe(3);
    });

    test.todo('should be expected game state', () => {
        const board = [
            [Piece.EMPTY, Piece.EMPTY, Piece.WHITE, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
            [Piece.WHITE, Piece.WHITE, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
            [Piece.BLACK, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],

            [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
            [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
            [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],

            [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
            [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
            [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
        ];

        expect(game.board).toEqual(board);
    });

    test.todo('white should be winning', () => {
        for (let i = 0; i < GoGo.SIZE; i++) {
            for (let j = 0; j < GoGo.SIZE; j++) {
                try { game.makeMove(i, j); } catch (e) { }
            }
        }
        expect(game.captures[Piece.BLACK]).toBe(0);
        expect(game.captures[Piece.WHITE]).toBe(42);
    });

    test.todo('should ask to end, reject, have no winner, then accept and have winner', () => {
        game.askForEnd();
        game.rejectEnd();
        expect(() => game.acceptEnd()).toThrow(GoGoError.NOT_ENDED);
        expect(game.winner).toBe(undefined);

        game.askForEnd();
        game.acceptEnd();
        expect(game.winner).toBe(Piece.WHITE);
    });

    test.todo('should error if game is already ended', () => {
        expect(() => game.askForEnd()).toThrow(GoGoError.ALREADY_ENDED);
        expect(() => game.makeMove(0, 0)).toThrow(GoGoError.ALREADY_ENDED);
    });

    test.todo('should reset the game', () => {
        game.restart();
        expect(game.turn).toBe(Piece.BLACK);
        expect(game.board).toEqual(Array.from({ length: GoGo.SIZE }, () => new Array(GoGo.SIZE).fill(Piece.EMPTY)));
        expect(game.captures[Piece.BLACK]).toBe(0);
        expect(game.captures[Piece.WHITE]).toBe(0);
    });
});
