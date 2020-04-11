import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import rootReducer, { IRootState } from "./reducers";
import { storage, encryptor } from "./storage";

const isDev = process.env.NODE_ENV === "development";
const persistConfig = isDev
  ? {
      key: "root",
      storage: storage,
      transforms: [encryptor],
    }
  : {
      key: "root",
      storage: storage,
      blacklist: ["app"],
      transforms: [encryptor],
    };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (initialState?: IRootState) => {
  const store = createStore(
    persistedReducer,
    initialState,
    isDev
      ? composeWithDevTools(applyMiddleware(thunkMiddleware))
      : compose(applyMiddleware(thunkMiddleware))
  );
  const persistor = persistStore(store);

  return { store, persistor };
};
