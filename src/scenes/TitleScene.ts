import {MainScene} from "./MainScene";

export class TitleScene extends g.Scene {
    static LENGTH_SECONDS: number = 5;

    titleImage: g.Sprite;
    frameCount: number = 0;

    constructor() {
        super({game: g.game, assetIds: ["title"]});

        this.loaded.add(() => {
            this.initialize();
        });
    }

    initialize(): void {
        const font = new g.DynamicFont({game: g.game, fontFamily: g.FontFamily.Serif, size: 40});
        const label = new g.Label({scene: this, font: font, text: "TITLE GAMEN", fontSize: 64});
        label.x = (g.game.width / 2) - label.width / 2;
        this.append(label);

        this.titleImage = new g.Sprite({scene: this, src: (<g.ImageAsset>this.assets["title"])});
        this.titleImage.x = (g.game.width / 2) - this.titleImage.width / 2;
        this.titleImage.y = (g.game.height / 2) - this.titleImage.height / 2;
        this.append(this.titleImage);

        this.update.add(() => {
            this.mainLoop();
        });
    }

    mainLoop(): void {
        this.frameCount++;
        this.titleImage.angle = this.frameCount % 360;
        this.titleImage.modified();
        if (this.frameCount > TitleScene.LENGTH_SECONDS * g.game.fps) {
            g.game.replaceScene(new MainScene(g.game.vars.totalTimeLimit - TitleScene.LENGTH_SECONDS));
        }
    }
}