import localforage from "localforage";
import createEncryptor from "redux-persist-transform-encrypt";
import { APP_NAME, APP_STORE, APP_STORE_KEY } from "../constants/app";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: APP_STORE,
  storeName: APP_STORE,
  description: APP_NAME
});

export const storage = localforage;

export const encryptor = createEncryptor({
  secretKey: APP_STORE_KEY,
  onError: function(error) {
    // Handle the error.
  }
});
