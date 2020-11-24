
import { journeyActions, Actions } from './store.actions';

export interface IAppState {
    readonly state: State;
}

export interface State {
    isModalOpened: boolean;
    isLoading: boolean;
    drawerView: any;
}


export const INITIAL_STATE = {
    isModalOpened: false,
    isLoading: false,
    drawerView: null,
}

export const journeyActionMappedWithExecution = (action, actions) => {
    return {
        JOURNEY_SET_DRAWER_VIEW: () => actions.journeySetDrawerView(),
        JOURNEY_CLEAR_DRAWER_VIEW: () => actions.journeyClearDrawerView(),
    };
};

export function stateReducer(state: State = INITIAL_STATE, action): State {
    const actions = new Actions(state, action);
    if (journeyActions[action.type]) {
        return journeyActionMappedWithExecution(action, actions)[action.type]();
    }

    return state;
}
