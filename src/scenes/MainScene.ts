export class MainScene extends g.Scene {

    titleImage: g.Sprite;
    scoreLabel: g.Label;
    timerLabel: g.Label;
    frameCount: number = 0;

    constructor(public lengthSeconds: number) {
        super({game: g.game, assetIds: ["title"]});

        this.loaded.addOnce(() => {
            this.initialize();
        });
    }

    initialize(): void {
        this.append(new g.FilledRect({scene: this, width: g.game.width, height: g.game.height, cssColor: "white"}));

        const font = new g.DynamicFont({game: g.game, fontFamily: g.FontFamily.Serif, size: 40});
        const label = new g.Label({scene: this, font: font, text: "MAIN GAMEN", fontSize: 64});
        label.x = (g.game.width / 2) - label.width / 2;
        this.append(label);

        this.titleImage = new g.Sprite({scene: this, src: (<g.ImageAsset>this.assets["title"])});
        this.titleImage.x = (g.game.width / 2) - this.titleImage.width / 2;
        this.titleImage.y = (g.game.height / 2) - this.titleImage.height / 2;
        this.append(this.titleImage);

        this.scoreLabel = new g.Label({scene: this, font: font, text: "RANDOM SCORE: 0", fontSize: 16});
        this.scoreLabel.y = this.game.height - 16;
        this.append(this.scoreLabel);

        this.timerLabel = new g.Label({scene: this, font: font, text: "TIME:", fontSize: 16});
        this.append(this.timerLabel);

        this.update.add(() => {
            this.mainLoop();
        });
    }

    mainLoop(): void {
        this.frameCount++;
        this.titleImage.angle = 360 - this.frameCount % 360;
        this.titleImage.modified();

        this.timerLabel.text = `TIME: ${this.lengthSeconds - Math.floor(this.frameCount / this.game.fps)}`;
        this.timerLabel.invalidate();

        if (this.frameCount % 10 === 0) {
            this.game.vars.gameState.score = this.game.random.get(0, 100000);
            this.scoreLabel.text = `RANDOM SCORE: ${this.game.vars.gameState.score}`;
            this.scoreLabel.invalidate();
        }

    }
}