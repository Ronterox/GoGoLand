import { ConnectFour, ConnectFourError, Player } from './connect-four';
import { test, expect, describe } from 'bun:test';

describe('Initializing Game', () => {
    const connectFour = new ConnectFour();

    test('should be instance of ConnectFour', () => {
        expect(connectFour).toBeInstanceOf(ConnectFour);
    });

    test('should initialize with game not being over', () => {
        expect(connectFour.isGameOver()).toBe(false);
    });

    test('should initialize with no winner', () => {
        expect(connectFour.winner).toBe(undefined!);
    });

    test('should initialize with the first player turn', () => {
        expect(connectFour.currentPlayer).toBe(Player.ONE);
    });

    test('board should be of correct size', () => {
        expect(connectFour.board.length).toBe(ConnectFour.BOARD_SIZE);
        expect(connectFour.board[0]!.length).toBe(ConnectFour.BOARD_SIZE);
    });

    test('should initialize with all Player.NONE board', () => {
        expect(connectFour.board.every((row) => row.every((cell) => cell === Player.NONE))).toBe(true);
    });
});

describe('Restarting game', () => {
    const connectFour = new ConnectFour();

    connectFour.currentPlayer = Player.TWO;
    connectFour.board[0]![0] = Player.ONE;
    connectFour.winner = Player.ONE;

    connectFour.restart();

    test('should restart with game not being over', () => {
        expect(connectFour.isGameOver()).toBe(false);
    });

    test('should restart with no winner', () => {
        expect(connectFour.winner).toBe(undefined!);
    });

    test('should restart with the first player turn', () => {
        expect(connectFour.currentPlayer).toBe(Player.ONE);
    });

    test('should restart with all Player.NONE board', () => {
        expect(connectFour.board.every((row) => row.every((cell) => cell === Player.NONE))).toBe(true);
    });
});

describe('Gameplay', () => {
    const connectFour = new ConnectFour();

    test('should get the coordinate where it was placed, be allowed to make a move and change player', () => {
        expect(connectFour.currentPlayer).toBe(Player.ONE);
        expect(connectFour.makeMove(0)).toEqual({ x: 0, y: ConnectFour.BOARD_SIZE - 1 });
        expect(connectFour.currentPlayer).toBe(Player.TWO);
    });

    test('second player should be able to make a move and change player', () => {
        expect(connectFour.currentPlayer).toBe(Player.TWO);
        expect(connectFour.makeMove(0)).toEqual({ x: 0, y: ConnectFour.BOARD_SIZE - 2 });
        expect(connectFour.currentPlayer).toBe(Player.ONE);
    });

    test('should be able play one after another', () => {
        for (let i = 1; i < ConnectFour.BOARD_SIZE; i++) {
            expect(connectFour.makeMove(i)).toEqual({ x: i, y: ConnectFour.BOARD_SIZE - 1 });
        }
    });

    test('should fail after filling up', () => {
        const x = 1;
        for (let i = 1; i < ConnectFour.BOARD_SIZE; i++) {
            expect(connectFour.makeMove(x)).toEqual({ x, y: ConnectFour.BOARD_SIZE - i - 1 });
        }
        expect(() => connectFour.makeMove(x)).toThrowError(ConnectFourError.ALREADY_TAKEN);
    });

    test('should fail after illegal move', () => {
        expect(() => connectFour.makeMove(ConnectFour.BOARD_SIZE)).toThrowError(ConnectFourError.OUT_OF_BOUNDS);
        [0, 2, 4, 3].forEach((x) => connectFour.makeMove(x));
        expect(connectFour.isGameOver()).toBe(true);
        expect(connectFour.winner).toBe(Player.TWO);
        expect(() => connectFour.makeMove(0)).toThrowError(ConnectFourError.GAME_OVER);
    });

    test('should win after diagonal', () => {
        connectFour.restart();
        expect(connectFour.isGameOver()).toBe(false);

        connectFour.makeMove(0); // P1

        connectFour.makeMove(1); // P2
        connectFour.makeMove(1); // P1

        connectFour.makeMove(2); // P2
        connectFour.makeMove(3); // P1
        connectFour.makeMove(2); // P2
        connectFour.makeMove(2); // P1

        connectFour.makeMove(3); // P2
        connectFour.makeMove(4); // P1
        connectFour.makeMove(3); // P2
        connectFour.makeMove(3); // P1

        connectFour.printBoard();

        expect(connectFour.isGameOver()).toBe(true);
        expect(connectFour.winner).toBe(Player.ONE);
    });
});
