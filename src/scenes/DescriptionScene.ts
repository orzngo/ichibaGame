import {MainScene} from "./MainScene";
import {ResultScene} from "./ResultScene";

declare var window: any;

export class DescriptionScene extends g.Scene {
    static LENGTH_SECONDS: number = 5;

    frameCount: number = 0;

    constructor(public remainingTime: number) {
        super({game: g.game, assetIds: ["title"]});

        this.loaded.addOnce(() => {
            this.initialize();
        });
    }

    initialize(): void {
        this.append(new g.FilledRect({scene: this, width: g.game.width, height: g.game.height, cssColor: "white"}));

        const font = new g.DynamicFont({game: g.game, fontFamily: g.FontFamily.Serif, size: 40});
        const label = new g.Label({scene: this, font: font, text: "スコアがランダムに決まります", fontSize: 40});
        label.x = (g.game.width / 2) - label.width / 2;
        label.y = (g.game.height / 2) - label.height / 2;
        this.append(label);

        this.update.add(() => {
            this.mainLoop();
        });
    }

    mainLoop(): void {
        this.frameCount++;
        if (this.frameCount > DescriptionScene.LENGTH_SECONDS * g.game.fps) {
            g.game.replaceScene(new MainScene(this.remainingTime - DescriptionScene.LENGTH_SECONDS - ResultScene.LENGTH_SECONDS));
        }
    }
}