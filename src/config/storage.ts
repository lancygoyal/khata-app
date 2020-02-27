import ElectronStore from "electron-store";
import { APP_STORE, APP_STORE_KEY } from "../constants/app";

const electronStore = new ElectronStore({
  name: APP_STORE,
  encryptionKey: APP_STORE_KEY
});

export const clearData = () => {
  electronStore.clear();
};

export const viewData = () => {
  // electronStore.path
  electronStore.openInEditor();
};

export default electronStore;
