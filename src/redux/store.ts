import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import createElectronStorage from "redux-persist-electron-storage";
import rootReducer, { IRootState } from "./reducers";
import electronStore from "../config/storage";

const persistConfig = {
  key: "root",
  storage: createElectronStorage({
    electronStore
  }),
  blacklist: ["app"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (initialState?: IRootState) => {
  const store = createStore(
    persistedReducer,
    initialState,
    process.env.NODE_ENV === "development"
      ? composeWithDevTools(applyMiddleware(thunkMiddleware))
      : compose(applyMiddleware(thunkMiddleware))
  );
  const persistor = persistStore(store);

  return { store, persistor };
};
