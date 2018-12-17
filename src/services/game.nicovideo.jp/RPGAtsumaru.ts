import {RPGAtsumaruApi} from "./RPGAtsumaruApi";
import {Scoreboards} from "./RPGAtsumaruApi";
import ScoreboardData = Scoreboards.ScoreboardData;

declare var window: any;

export class RPGAtsumaru {
    isAtsumaru: boolean;

    static getAtsumaruApiObject(): RPGAtsumaruApi | undefined {
        if (typeof window !== 'undefined' && window.RPGAtsumaru) {
            return window.RPGAtsumaru;
        }
        return undefined;
    }

    constructor(private atsumaruApi: RPGAtsumaruApi | undefined = RPGAtsumaru.getAtsumaruApiObject()) {
        this.isAtsumaru = typeof this.atsumaruApi !== 'undefined';
    }

    async setRecordtoScoreboard(score: number, boardId: number = 1): Promise<void> {
        if (!this.isAtsumaru) {
            throw new NotIsAtsumaruModeError();
        }
        return this.atsumaruApi.experimental.scoreboards.setRecord(boardId, score);
    }

    async openScoreboard(boardId: number = 1): Promise<void> {
        if (!this.isAtsumaru) {
            throw new NotIsAtsumaruModeError();
        }
        return this.atsumaruApi.experimental.scoreboards.display(boardId);
    }

    async getScoreboardRecords(boardId: number = 1): Promise<ScoreboardData> {
        if (!this.isAtsumaru) {
            throw new NotIsAtsumaruModeError();
        }
        return this.atsumaruApi.experimental.scoreboards.getRecords(boardId);
    }
}

export class NotIsAtsumaruModeError extends Error {
    constructor() {
        super("isAtsumaru is not true");
    }

}