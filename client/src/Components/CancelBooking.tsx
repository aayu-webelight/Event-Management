import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";
import { cancelSlot } from "../services/httprequest";

const CancelBooking = (props: any) => {
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const handleClose = () => {
    props.setShowCancelDialog(false);
  };

  const handleSubmit = async () => {
    const body = JSON.stringify({
      id: props.selectedSheet._id,
    });
    const response = await cancelSlot(body);

    if (response.status === 200) {
      props.setStatusChange(true);
    } else {
      setError(true);
    }
    setAlertOpen(true);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={props.showCancelDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do You want to delete the cancel the booking?`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleSubmit} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Alertbox
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        error={error}
      />
    </>
  );
};

export default CancelBooking;
