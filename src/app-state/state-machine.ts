import { getFlowActivities, getRoundsActivities } from './game-info';
import { StepType, GameStep, Activity } from './state-types';

const stateMachines: Map<number, Array<GameStep>> = new Map();

// function createStartStep(act: FlowActivity | RoundsActivity) {
//     return {
//         activityNumber: act.activityNumber,
//         activityType: act.type,
//         round: 0,
//         question: 0,
//         status: GameStatus.Start,
//     };
// }

function createFinalStep(act: Activity, stepNumber: number) {
    return {
        activityType: act.type,
        activityNumber: act.activityNumber,
        round: 0,
        stepType: StepType.StartWithResults,
        stepNumber,
        question: 0,
    } as GameStep;
}

function createResultStep(act: Activity, stepNumber: number) {
    return {
        activityType: act.type,
        activityNumber: act.activityNumber,
        round: 0,
        stepType: StepType.Results,
        stepNumber,
        question: 0,
    } as GameStep;
}

export async function createMachines() {
    // do flow ones first
    const flowActivities = await getFlowActivities();

    flowActivities.forEach((act) => {
        const steps = [];
        // // start step
        // const startStep: GameStep = {
        //     activityNumber: act.activityNumber,
        //     activityType: act.type,
        //     round: 0,
        //     question: 0,
        //     type: StepType.Start,
        // };
        // steps.push(startStep);

        // create a step for each question
        act.questions.forEach((question) => {
            const step: GameStep = {
                activityType: act.type,
                activityNumber: act.activityNumber,
                round: 0,
                stepType: StepType.Question,
                question: question.num,
                stepNumber: question.num,
            };
            steps.push(step);
        });

        // now create result step
        steps.push(createResultStep(act, act.questions.length + 1));

        // allow results to go back to start
        steps.push(createFinalStep(act, act.questions.length + 2));

        stateMachines.set(act.activityNumber, steps);
    });

    // now do rounds ones
    (await getRoundsActivities()).forEach((act) => {
        const steps = [];
        let stepNumber = 1;

        // create steps for each round
        act.rounds.forEach((round) => {
            // create a step for each question
            round.questions.forEach((question) => {
                const step: GameStep = {
                    activityType: act.type,
                    activityNumber: act.activityNumber,
                    round: round.num,
                    stepType: StepType.Question,
                    stepNumber: stepNumber++,
                    question: question.num,
                };
                steps.push(step);
            });
            // create a step for end of the round
            steps.push({
                activityType: act.type,
                activityNumber: act.activityNumber,
                round: round.num,
                question: 0,
                stepType: StepType.EndOfRound,
                stepNumber: stepNumber++,
            } as GameStep);
        });

        // now create result step
        steps.push(createResultStep(act, stepNumber++));

        // allow results to go back to start
        steps.push(createFinalStep(act, stepNumber));

        stateMachines.set(act.activityNumber, steps);
    });

    console.log('> sm > ', stateMachines);
}

export function getFirstStep(activityNumber: number) {
    const activityMachine = stateMachines.get(activityNumber);

    if (!activityMachine || activityMachine.length === 0) {
        throw new Error('Activity not found');
    }

    return activityMachine[0];
}

export function getNextStep(currentStep: GameStep) {
    const activityMachine = stateMachines.get(currentStep.activityNumber);

    if (!activityMachine || activityMachine.length === 0) {
        throw new Error('Activity not found');
    }

    return activityMachine[currentStep.stepNumber]; // current step is one based
}

export function getStep(activityNumber: number, stepNumber: number) {
    const activityMachine = stateMachines.get(activityNumber);

    if (!activityMachine || activityMachine.length === 0) {
        throw new Error('Activity not found');
    }

    return activityMachine[stepNumber - 1];
}
