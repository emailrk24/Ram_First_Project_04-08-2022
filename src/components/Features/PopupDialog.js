import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

export default function PopupDialog(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog
      sx={[
        {
          "& .MuiDialog-paper": {
            backgroundColor: "#a892ee",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 1px 8px rgba(0, 0, 0, 0.25)"
          }
        }
      ]}
      open={openPopup}
      onClose={handleClose}
      maxWidth="md"
    >
      <DialogTitle sx={{ fontFamily: "Noto Sans JP", fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
