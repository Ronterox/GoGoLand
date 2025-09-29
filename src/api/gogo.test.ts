
import { test, expect, describe } from 'bun:test';
import { GoGo, Piece } from './gogo';

// https://www.mastersofgames.com/rules/go-rules.html
// https://www.allaboutgo.com/play-go.html

describe('Initializing Game', () => {
    const game = new GoGo();

    test('should have an x by x board with all cells empty', () => {
        expect(game.board.length).toBe(GoGo.ROWS);
        expect(game.board[0]!.length).toBe(GoGo.COLS);
        game.board.forEach((row) => row.forEach((cell) => expect(cell).toBe(Piece.EMPTY)));
    });

    test.todo('should be black turn and should make a move', () => {
        expect(game.turn).toBe(Piece.BLACK);
        game.makeMove(0, 0);
        expect(game.board[0]![0]).toBe(Piece.BLACK);
    });

    test.todo('should be white turn and make another move and fail', () => {
        expect(game.turn).toBe(Piece.WHITE);
        expect(() => game.makeMove(0, 0)).toThrow(GoGoError.ALREADY_TAKEN);
        expect(game.turn).toBe(Piece.WHITE);
    });

    test.todo('it should fail if illegal move', () => {
        expect(game.turn).toBe(Piece.WHITE);
        expect(() => game.makeMove(-1, 0)).toThrow(GoGoError.OUT_OF_BOUNDS);
        expect(() => game.makeMove(0, -1)).toThrow(GoGoError.OUT_OF_BOUNDS);
        expect(() => game.makeMove(GoGo.ROWS, 0)).toThrow(GoGoError.OUT_OF_BOUNDS);
        expect(() => game.makeMove(0, GoGo.COLS)).toThrow(GoGoError.OUT_OF_BOUNDS);
        expect(game.turn).toBe(Piece.WHITE);
    })

    test.todo('white should capture black', () => {
        expect(game.count(Piece.WHITE)).toBe(0);
        expect(game.count(Piece.BLACK)).toBe(1);
        expect(game.prisoners[Piece.BLACK]).toBe(0);
        expect(game.prisoners[Piece.WHITE]).toBe(0);

        game.makeMove(0, 1); // white below
        game.makeMove(1, 0); // black right
        game.makeMove(1, 1); // white right-below
        game.makeMove(0, 2); // black below
        game.makeMove(2, 0); // white right

        expect(game.prisoners[Piece.BLACK]).toBe(2);
        expect(game.prisoners[Piece.WHITE]).toBe(0);
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
});
