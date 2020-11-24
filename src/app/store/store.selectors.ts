import { IAppState } from './store.actions';


export const getJourneyIsLoading = (state: IAppState) => state.state.isLoading;
