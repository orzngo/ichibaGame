/**
 * 実験放送関連のイベントを受け取ってなんかする
 * アツマール上で動いている場合は何もせずシーン遷移する
 * 実験放送でもアツマールでもない環境（ローカルなど）ではちょっと待ってから勝手にシーン遷移する
 */
import {TitleScene} from "./TitleScene";

export class MyInitialScene extends g.Scene {
    frameCount: number = 0;
    isInitializeStarted: boolean = false;

    constructor() {
        super({game: g.game});

        // アツマールの時はstartイベントがこないことがわかっているため、直ちに初期化を開始する
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

        // 実験放送でない時はstartがこないため、ループでちょっと待って開始する
        this.update.add(() => {
            this.mainLoop();
        });
    }

    initialize(): void {
        if (this.isInitializeStarted) {
            return;
        }
        this.isInitializeStarted = true;

        g.game.vars.totalTimeLimit = 60;
        if (g.game.vars.parameters && g.game.vars.parameters.totalTimeLimit && g.game.vars.parameters.totalTimeLimit > 0) {
            g.game.vars.totalTimeLimit = g.game.vars.parameters.totalTimeLimit;
        }

        g.game.vars.gameState = {
            score: 0
        };

        g.game.replaceScene(new TitleScene(g.game.vars.totalTimeLimit));
    }

    // アツマールでもなく、実験放送でもない時、ちょっと待ってから自動で初期化開始するためのループ
    mainLoop(): void {
        this.frameCount++;
        if (this.frameCount > 0.5 * g.game.fps) {
            this.initialize();
        }
    }

}