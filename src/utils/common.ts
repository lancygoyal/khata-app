import sha256 from "crypto-js/sha256";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const encryptPassword = message => sha256(message).toString();

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
