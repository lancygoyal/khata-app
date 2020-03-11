import CryptoJS from "crypto-js";
import { writeFileSync } from "fs";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import { APP_STORE_KEY } from "../constants/app";
import { remote } from "electron";

export const dialog = remote.dialog;

export const encryptPassword = message => CryptoJS.SHA256(message).toString();

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

export const formatDate = (date = Date.now()) => {
  const dateObj = new Date(date);
  const momentDate = moment()
    .format("dddd, Do MMMM YYYY")
    .split(" ");
  return `${momentDate[0]} ${dateObj.getDate()} ${
    momentDate[2]
  } ${dateObj.getFullYear()}`;
};

export const encryptData = data =>
  CryptoJS.AES.encrypt(JSON.stringify(data), APP_STORE_KEY).toString();

export const decryptData = data =>
  JSON.parse(
    CryptoJS.AES.decrypt(data, APP_STORE_KEY).toString(CryptoJS.enc.Utf8)
  );

export const backupData = (data, folderPath = "") => {
  const kaFolderPath = folderPath
    ? folderPath
    : dialog.showOpenDialogSync({
        properties: ["openDirectory"]
      })[0];

  writeFileSync(
    kaFolderPath + "/" + "khata-app-backup-" + Date.now() + ".ka",
    encryptData(data)
  );
};
