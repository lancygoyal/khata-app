import { RESET, RESTORE } from "../constants/app";
import { IRootState } from "./reducers";

// ACTIONS
export const resetState = () => {
  return { type: RESET };
};

export const restoreState = (payload: IRootState) => {
  return { type: RESTORE, payload };
};
