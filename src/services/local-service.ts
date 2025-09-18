import { Service, Events } from "./service";

export class LocalService extends Service {
    public override winnerText(): string {
        return this.winner() && !this.isCurrentPlayer() ? "You Win!" : "Opponent Wins!";
    }

    connect(): Promise<boolean> {
        return new Promise((resolve) => {
            resolve(true);
            this.events.emit(Events.GAME_START);
        });
    }

    reload(): void {
        this.events.emit(Events.WAITING);
    }

    setPiecePosition(x: number): void {
        this.events.emit(Events.HOVER, x);
    }

    makeMove(x: number): void {
        const data = this.connectFour.makeMove(x);
        this.events.emit(Events.MOVE, data);
    }
}

