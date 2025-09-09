import { insertCoin, isHost, myPlayer, onPlayerJoin, RPC, type PlayerState } from "playroomkit";
import { Events, Service } from "./service";
import { Player } from "../api/connect-four";

export class PlayroomService extends Service {
    static readonly MAX_PLAYERS = 2;
    players: { [key: string]: PlayerState } = {};

    async connect(): Promise<boolean> {
        try {
            this.registerEvents();
            await insertCoin({
                maxPlayersPerRoom: PlayroomService.MAX_PLAYERS,
                defaultPlayerStates: {
                    player: Player.NONE,
                },
            }, () => {
                if (!isHost()) return;
                const amountPlayers = Object.keys(this.players).length;

                Object.values(this.players).forEach((player, i) => {
                    if (amountPlayers === PlayroomService.MAX_PLAYERS) {
                        player.setState('player', Player[i === 0 ? 'ONE' : 'TWO']);
                    } else if (player.getState('player') === Player.NONE) {
                        player.setState('player', myPlayer().getState('player') == Player.ONE ? Player.TWO : Player.ONE);
                    }
                });

                RPC.call(Events.GAME_START, undefined, RPC.Mode.ALL);
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public override winnerText(): string {
        return this.winner() && !this.isCurrentPlayer() ? "You Win!" : "Opponent Wins!";
    }

    makeMove(x: number): void {
        const data = this.connectFour.makeMove(x);
        RPC.call(Events.MOVE, data, RPC.Mode.ALL);
    }

    registerEvents() {
        RPC.register(Events.GAME_START, async () => {
            this.events.emit(Events.GAME_START);
        });

        RPC.register(Events.MOVE, async (data) => {
            this.events.emit(Events.MOVE, data);
        });

        onPlayerJoin((player) => {
            this.players[player.id] = player;
            player.onQuit(() => {
                delete this.players[player.id];
            });
        });
    }
}

