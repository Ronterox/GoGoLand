import { Service, Events } from "./service";

export class LocalService extends Service {
    connect(): Promise<boolean> {
        return new Promise((resolve) => {
            resolve(true);
            this.events.emit(Events.GAME_START);
        });
    }

    public override winnerText(): string {
        return this.winner() && !this.isCurrentPlayer() ? "You Win!" : "Opponent Wins!";
    }

    setPiecePosition(x: number): void {
        this.events.emit(Events.HOVER, x);
    }

    makeMove(x: number): void {
        const data = this.connectFour.makeMove(x);
        this.events.emit(Events.MOVE, data);
    }
}

