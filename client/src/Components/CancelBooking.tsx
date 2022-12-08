import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";
import { cancelSlot } from "../services/httprequest";
import Loader from "./Loader";

const CancelBooking = (props: any) => {
  const [open, setOpen] = useState<Boolean>(false);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const handleClose = () => {
    props.setShowCancelDialog(false);
  };

  const handleSubmit = async () => {
    setOpen(true);
    const body = JSON.stringify({
      id: props.selectedSeat._id,
    });
    const response = await cancelSlot(body);

    if (response.status === 200) {
      setOpen(false);
      props.setStatusChange(true);
    } else {
      setOpen(false);
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
        <Loader open={open}></Loader>
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
