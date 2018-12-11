import {RPGAtsumaruApi} from "./RPGAtsumaruApi";

declare var window: any;

export class RPGAtsumaru {
    atsumaruApi: RPGAtsumaruApi | undefined;
    isAtsumaru: boolean;

    static getAtsumaruApiObject(): RPGAtsumaruApi | undefined {
        if (typeof window !== 'undefined' && window.RPGAtsumaru) {
            return window.RPGAtsumaru;
        }
        return undefined;
    }

    constructor(atsumaruApi: RPGAtsumaruApi | undefined = RPGAtsumaru.getAtsumaruApiObject()) {
        this.isAtsumaru = typeof this.atsumaruApi !== 'undefined';
    }

}