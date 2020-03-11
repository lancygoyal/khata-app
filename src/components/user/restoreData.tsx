import Button from "@material-ui/core/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { restoreState } from "../../redux";
import { decryptData } from "../../utils/common";

const Restore = ({ style = {} }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let fileRestoreInput = null;
  const uploadFile = e => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const output = e.target.result;
        dispatch(restoreState(decryptData(output)));
      };
      reader.readAsText(files[0]);
    }
  };

  return (
    <>
      <input
        id={"fileRestoreInput"}
        ref={e => (fileRestoreInput = e)}
        type="file"
        onChange={uploadFile}
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => fileRestoreInput.click()}
        style={style}
      >
        {t("app:restore")}
      </Button>
    </>
  );
};

export default Restore;
