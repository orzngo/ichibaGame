import {RPGAtsumaru} from "../services/game.nicovideo.jp/RPGAtsumaru";

declare var window: any;

export class ResultScene extends g.Scene {
    static LENGTH_SECONDS: number = 5;

    frameCount: number = 0;
    isRunning: boolean = false;
    atsumaruApi: RPGAtsumaru;

    constructor(public remainingTime: number = ResultScene.LENGTH_SECONDS) {
        super({game: g.game, assetIds: ["title"]});
        this.atsumaruApi = new RPGAtsumaru();

        this.loaded.addOnce(() => {
            this.initialize();
        });
    }

    initialize(): void {
        this.append(new g.FilledRect({scene: this, width: g.game.width, height: g.game.height, cssColor: "white"}));

        const font = new g.DynamicFont({game: g.game, fontFamily: g.FontFamily.Serif, size: 40});
        const label = new g.Label({scene: this, font: font, text: `${g.game.vars.gameState.score} pt`, fontSize: 40});
        label.x = (g.game.width / 2) - label.width / 2;
        label.y = (g.game.height / 2) - label.height / 2;
        this.append(label);

        this.update.add(() => {
            this.mainLoop();
        });
        this.isRunning = true;
    }

    mainLoop(): void {
        this.frameCount++;

        if (this.atsumaruApi.isAtsumaru && this.getRemainingTime() === 0 && this.isRunning) {
            this.isRunning = false;
            window.RPGAtsumaru.experimental.scoreboards.setRecord(1, this.game.vars.gameState.score);
            this.setTimeout(() => {
                window.RPGAtsumaru.experimental.scoreboards.display(1);
            }, 3000);
        }
    }

    getRemainingTime(): number {
        return this.remainingTime - Math.floor(this.frameCount / this.game.fps);
    }
}