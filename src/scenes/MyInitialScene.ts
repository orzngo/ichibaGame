/**
 * 実験放送関連のイベントを受け取ってなんかする
 * アツマール上で動いている場合は何もせずシーン遷移する
 * 実験放送でもアツマールでもない環境（ローカルなど）ではちょっと待ってから勝手にシーン遷移する
 */
import {TitleScene} from "./TitleScene";

export class MyInitialScene extends g.Scene {
    timerId: g.TimerIdentifier;

    constructor() {
        super({game: g.game});
        if (g.game.vars.isAtsumaru) {
            this.loaded.add(() => {
                this.initialize();
            });
        } else {
            this.message.add((e) => {
                if (e.data && e.data.type === "start") {
                    if (e.data.parameters) {
                        g.game.vars.parameters = e.data.parameters;
                    }
                    this.initialize();
                }
            });
        }
        // 実験放送でもアツマールでもない時はstartがこないので勝手にやる
        // FIXME: こいつをdestroyしようとするとエラー出る
        this.timerId = this.setTimeout(() => {
            this.initialize();
        }, 1000);
    }

    initialize(): void {
        g.game.vars.totalTimeLimit = 60;
        if (g.game.vars.parameters && g.game.vars.parameters.totalTimeLimit && g.game.vars.parameters.totalTimeLimit > 0) {
            g.game.vars.totalTimeLimit = g.game.vars.parameters.TotalTimeLimit;
        }

        g.game.vars.gameState = {
            score: 0
        };

        g.game.replaceScene(new TitleScene(g.game.vars.totalTimeLimit));
    }
}