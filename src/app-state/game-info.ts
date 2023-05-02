import { getGameData } from '../api/api-fetch';
import { convertToGameInfo } from '../api/api-helper';
import { ActivityType, FlowActivity, GameInfo, RoundsActivity } from './state-types';

let gameInfo: GameInfo | null = null;

export async function getGameInfo() {
    if (!gameInfo) {
        gameInfo = convertToGameInfo(await getGameData());
    }

    return gameInfo;
}

// export async function getActivities() {
//     const gameData = await getGameInfo();
//     return [...gameData.flowActivities, ...gameData.roundsActivities]
// }

export async function getFlowActivities() {
    return (await getGameInfo()).activities.filter(
        (act) => act.type === ActivityType.Flow
    ) as Array<FlowActivity>;
}

export async function getRoundsActivities() {
    return (await getGameInfo()).activities.filter(
        (act) => act.type === ActivityType.Rounds
    ) as Array<RoundsActivity>;
}

// export async function getActivity(activityNum: number) {
//     const gameInfo = await getGameInfo();

//     if (!gameInfo || activityNum < 1 || gameInfo.activities.length < activityNum) {
//         throw new Error('Activity not available');
//     }

//     return gameInfo.activities[activityNum - 1];
// }
