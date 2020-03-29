import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import app, { AppState } from "./app";
import users, { UsersState } from "./users";
import accounts, { AccountsState } from "./accounts";
import ledger, { LedgerState } from "./ledger";
import { storage, encryptor } from "./storage";

export interface IRootState {
  readonly app: AppState;
  readonly users: UsersState;
  readonly accounts: AccountsState;
  readonly ledger: LedgerState;
}

const appPersistConfig =
  process.env.NODE_ENV === "development"
    ? {
        key: "app",
        storage: storage,
        transforms: [encryptor]
      }
    : {
        key: "app",
        storage: storage,
        whitelist: ["locale"],
        transforms: [encryptor]
      };

const rootReducer = combineReducers<IRootState>({
  app: persistReducer(appPersistConfig, app),
  users,
  accounts,
  ledger
});

export default rootReducer;
