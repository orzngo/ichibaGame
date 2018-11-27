/**
 * Loading中に出るシーン
 * 一番最初の読み込み以外ではこいつがでる
 */
export class LoadingScene extends g.LoadingScene {

    font: g.DynamicFont;
    label: g.Label;
    isTargetReady: boolean = false;
    fadeOutRect: g.FilledRect;
    frameCount: number = 0;

    constructor() {
        super({
            game: g.game,
            explicitEnd: true
        });
        this.font = new g.DynamicFont({game: g.game, fontFamily: g.FontFamily.Serif, size: 40});
        this.loaded.addOnce(() => {
            this.initialize();
        });
        this.targetReset.add(() => {
            this.initialize();
        });
        this.targetReady.add(() => {
            this.finalize();
        });
    }

    initialize(): void {
        this.append(new g.FilledRect({scene: this, width: g.game.width, height: g.game.height, cssColor: "white"}));

        const icon = new g.FrameSprite({
            src: (<g.ImageAsset>g.game.assets["loading"]),
            width: 256,
            height: 256,
            srcWidth: 128,
            srcHeight: 128,
            scene: this,
            frames: [0, 1, 2],
            interval: 125
        });
        icon.x = (g.game.width / 2) - icon.width / 2;
        icon.y = (g.game.height / 2) - icon.height / 2;
        this.append(icon);
        icon.start();
        this.label = new g.Label({scene: this, font: this.font, text: "LOADING", fontSize: 256 / 7});
        this.label.x = icon.x;
        this.label.y = icon.y + icon.height;
        this.append(this.label);

        this.fadeOutRect = new g.FilledRect({
            scene: this,
            width: g.game.width,
            height: g.game.height,
            cssColor: "rgba(0,0,0,0)"
        });

        this.append(this.fadeOutRect);

        this.update.add(() => {
            this.mainLoop();
        });
    }


    mainLoop(): void {
        if (!this.isTargetReady) {
            this.updateLabel();
            return;
        }

        // FIXME: 終了演出を挟もうとするとエラー出る
        /*
        this.frameCount++;
        this.fadeOutRect.cssColor = `rgba(0,0,0,${this.frameCount / 100})`;

        if (this.frameCount > 3 * g.game.fps) {
            this.end();
        }
        */

    }

    updateLabel(): void {
        this.label.text = `LOADING ${this.getTargetWaitingAssetsCount()}`;
        this.label.modified();
    }

    finalize(): void {
        this.end();

        // FIXME: なんか終了演出を挟むと次のsceneがno sceneとかいわれる
        //this.isTargetReady = true;
    }
}