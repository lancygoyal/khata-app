import CryptoJS from "crypto-js";
import * as FileSaver from "file-saver";
import map from "lodash/map";
import uniqBy from "lodash/uniqBy";
import moment from "moment";
import * as XLSX from "xlsx";
import { APP_STORE_KEY, LANGS } from "../constants/app";
// import { fileOpen, directoryOpen, fileSave } from "browser-nativefs";

export const encryptPassword = (message) => CryptoJS.SHA256(message).toString();

export const jsonToXLS = (data, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = { Sheets: { Ledger: ws }, SheetNames: ["Ledger"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const blobData = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(blobData, fileName + "-" + Date.now() + fileExtension);
};

export const formatDate = (date) => {
  return moment(date).locale(LANGS.EN).format("DD-MM-YYYY");
};

export const encryptData = (data) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), APP_STORE_KEY).toString();

export const decryptData = (data) =>
  JSON.parse(
    CryptoJS.AES.decrypt(data, APP_STORE_KEY).toString(CryptoJS.enc.Utf8)
  );

export const backupData = async (data) => {
  const blob = new Blob([encryptData(data)], {
    type: "text/plain;charset=utf-8",
  });
  FileSaver.saveAs(blob, "khata-app-backup-" + Date.now() + ".ka");
  // await fileSave(blob, { fileName: "khata-app-backup-" + Date.now() + ".ka" });
  // const blobsInDirectory = await directoryOpen();
  // console.log(blobsInDirectory)
};

export const setBackupTime = () =>
  localStorage.setItem("backupAt", String(Date.now()));

export const getBackupTime = (backupTime) =>
  backupTime
    ? " - " + moment(Number(backupTime)).locale(LANGS.EN).fromNow()
    : "";

export const getCities = (accounts) => map(
  uniqBy(accounts, (x) => x.city.toLowerCase().trim()),
  "city"
).sort();