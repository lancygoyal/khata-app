import { combineReducers } from "redux";
import app, { AppState } from "./app";
import setting, { SettingState } from "./setting";
import users, { UsersState } from "./users";
import accounts, { AccountsState } from "./accounts";
import ledger, { LedgerState } from "./ledger";

export interface IRootState {
  readonly app: AppState;
  readonly setting: SettingState;
  readonly users: UsersState;
  readonly accounts: AccountsState;
  readonly ledger: LedgerState;
}

const rootReducer = combineReducers<IRootState>({
  app,
  setting,
  users,
  accounts,
  ledger
});

export default rootReducer;
