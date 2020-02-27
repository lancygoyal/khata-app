import { combineReducers } from "redux";
import app, { AppState } from "./app";
import user, { UserState } from "./user";

export interface IRootState {
  readonly app: AppState;
  readonly user: UserState;
}

const rootReducer = combineReducers<IRootState>({
  app,
  user
});

export default rootReducer;
