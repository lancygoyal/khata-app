import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import createElectronStorage from "redux-persist-electron-storage";
import app, { AppState } from "./app";
import users, { UsersState } from "./users";
import parties, { AccountsState } from "./accounts";
import bills, { LedgerState } from "./ledger";
import electronStore from "../config/storage";

export interface IRootState {
  readonly app: AppState;
  readonly users: UsersState;
  readonly parties: AccountsState;
  readonly bills: LedgerState;
}

const appPersistConfig =
  process.env.NODE_ENV === "development"
    ? {
        key: "app",
        storage: createElectronStorage({
          electronStore
        })
      }
    : {
        key: "app",
        storage: createElectronStorage({
          electronStore
        }),
        whitelist: ["locale"]
      };

const rootReducer = combineReducers<IRootState>({
  app: persistReducer(appPersistConfig, app),
  users,
  parties,
  bills
});

export default rootReducer;
