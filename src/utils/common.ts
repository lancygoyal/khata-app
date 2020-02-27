import sha256 from "crypto-js/sha256";

export const encryptPassword = message => sha256(message).toString();
