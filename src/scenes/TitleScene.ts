import {DescriptionScene} from "./DescriptionScene";

/**
 * 最初に出すシーン
 */
export class TitleScene extends g.Scene {
    static LENGTH_SECONDS: number = 5;

    titleImage: g.Sprite;
    frameCount: number = 0;

    constructor(public remainingTime: number) {
        super({game: g.game, assetIds: ["title"]});

        this.loaded.add(() => {
            this.initialize();
        });
    }

    initialize(): void {
        this.append(new g.FilledRect({scene: this, width: g.game.width, height: g.game.height, cssColor: "white"}));

        const font = new g.DynamicFont({game: g.game, fontFamily: g.FontFamily.Serif, size: 40});
        const label = new g.Label({scene: this, font: font, text: "TITLE GAMEN", fontSize: 64});
        label.x = (g.game.width / 2) - label.width / 2;
        this.append(label);

        const timeLabel = new g.Label({
            scene: this,
            font: font,
            text: `totalTimeLimit: ${this.remainingTime}`,
            fontSize: 64
        });
        timeLabel.x = (g.game.width / 2) - (timeLabel.width / 2);
        timeLabel.y = g.game.height - timeLabel.height;
        this.append(timeLabel);

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
            g.game.replaceScene(new DescriptionScene(this.remainingTime - TitleScene.LENGTH_SECONDS));
        }
    }
}