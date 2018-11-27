import {LoadingScene} from "./scenes/LoadingScene";
import {MyInitialScene} from "./scenes/MyInitialScene";

declare var window: any;

function main(param: g.GameMainParameterObject): void {
    g.game.loadingScene = new LoadingScene();

    g.game.vars.isAtsumaru = false;
    if (typeof window !== 'undefined' && window.RPGAtsumaru) {
        g.game.vars.isAtsumaru = true;
    }
    g.game.pushScene(new MyInitialScene());
}

export = main;
