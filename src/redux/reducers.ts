import { combineReducers } from "redux";
import app, { AppState } from "./app";
import users, { UserState } from "./users";

export interface IRootState {
  readonly app: AppState;
  readonly users: UserState;
}

const rootReducer = combineReducers<IRootState>({
  app,
  users
});

export default rootReducer;
