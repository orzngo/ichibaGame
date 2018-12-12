export interface RPGAtsumaruApi {
    experimental: {
        scoreboards: {
            setRecord(board_id: number, score: number): Promise<void>;
            display(board_id: number): Promise<void>;
            getRecords(board_id: number): Promise<Scoreboards.ScoreboardData>;
        }
    }
}


export namespace Scoreboards {
    export interface ScoreboardData {
        boardId: number;
        boardName: string;
        myRecord: MyRecord | null;
        myBestRecord: UserRecord | null;
        ranking: UserRecord[];
    }

    export interface Record {
        rank: number;
        score: number;
    }

    export interface MyRecord extends Record {
        isNewRecord: boolean;
    }

    export interface UserRecord extends Record {
        userName: string;
        rank: number;
    }
}