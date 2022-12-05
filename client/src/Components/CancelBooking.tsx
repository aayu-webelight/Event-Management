import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";

const CancelBooking = (props: any) => {
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const handleClose = () => {
    props.setShowCancelDialog(false);
  };

  const handleSubmit = () => {
    fetch("http://localhost:3001", {
      method: "DELETE",
      body: JSON.stringify({
        id: props.selectedEvent._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        props.setEventChange(true);
        setAlertOpen(true);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
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
      <Alertbox alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
    </>
  );
};

export default CancelBooking;
