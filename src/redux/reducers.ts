import { combineReducers } from "redux";
import user, { UserState } from "./user";

export interface IRootState {
  readonly user: UserState;
}

const rootReducer = combineReducers<IRootState>({
  user
});

export default rootReducer;
