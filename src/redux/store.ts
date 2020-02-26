import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer, { IRootState } from "./reducers";
import createElectronStorage from "redux-persist-electron-storage";
import { APP_STORE } from "../constants/app";

const persistConfig = {
  key: "root",
  storage: createElectronStorage({
    electronStoreOpts: {
      encryptionKey: APP_STORE
    }
  })
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
