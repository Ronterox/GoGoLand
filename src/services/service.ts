import * as Phaser from "phaser";
import { ConnectFour, Player } from "../api/connect-four";

export enum Events {
    HOVER = "hover",
    MOVE = "move",
    WAITING = "waiting",
    GAME_START = "game-start",
}

export interface EventsData {
    [Events.MOVE]: { x: number; y: number };
    [Events.HOVER]: number;
    [Events.WAITING]: void;
    [Events.GAME_START]: void;
}

export abstract class Service {
    events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
    connectFour: ConnectFour = new ConnectFour();

    public isCurrentPlayer(): boolean {
        return this.connectFour.currentPlayer === Player.ONE;
    }

    public winner(): Player | undefined {
        return this.connectFour.winner;
    }

    public isGameOver(): boolean {
        return this.connectFour.isGameOver();
    }

    public subscribe<T extends keyof EventsData>(event: T, callback: (data: EventsData[T]) => void) {
        this.events.on(event, callback);
    }

    public winnerText(): string {
        return this.winner() ? `Player ${this.connectFour.winner} Wins!` : "Draw";
    }

    public whoseTurn(): string {
        return this.isCurrentPlayer() ? "Your turn" : "Opponent's turn";
    }

    abstract makeMove(x: number): void;

    abstract setPiecePosition(x: number): void;

    abstract connect(): Promise<boolean>;
}

