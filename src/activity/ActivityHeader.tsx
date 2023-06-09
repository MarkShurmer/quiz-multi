import { ActivityType } from '../app-state/state-types';
import { GameStep } from '../app-state/state-types';
import { RoundsActivity, FlowActivity } from '../app-state/state-types';

export type ActivityHeaderProps = {
    activity: FlowActivity | RoundsActivity;
    currentStep: GameStep;
};

export default function ActivityHeader(props: ActivityHeaderProps) {
    const { activity, currentStep } = props;

    return (
        <header className="page-header">
            <h1>
                <span data-testid="sub-header-1">{activity.name}</span>
                <span data-testid="sub-header-2">
                    {activity.type === ActivityType.Rounds ? ` / ROUND ${currentStep.round}` : null}
                </span>
            </h1>
            <h2>Q{currentStep.question}.</h2>
        </header>
    );
}
