import { tassign } from 'tassign';
import { State } from './store.reducer';

export const journeyActions = {
    JOURNEY_SET_DRAWER_VIEW: 'JOURNEY_SET_DRAWER_VIEW',
    JOURNEY_CLEAR_DRAWER_VIEW: 'JOURNEY_CLEAR_DRAWER_VIEW',
};

export interface IAppState {
    readonly state: State;
}

export class Actions {

    constructor(private state: State, private action: any) {
    }


    public journeySetDrawerView(): State {
        return tassign(this.state, {
            drawerView: this.action.view,
        });
    }

    public journeyClearDrawerView(): State {
        return tassign(this.state, { drawerView: null });
    }

}

