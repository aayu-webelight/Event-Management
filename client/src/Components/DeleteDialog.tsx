import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";

const DeleteDialog = (props: any) => {
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const handleClose = () => {
    props.setShowDeleteDialog(false);
  };
  const handleAgree = async () => {
    fetch("http://localhost:3001/delete", {
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
        setAlertOpen(true);
        props.setEventChange(true);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        open={props.showDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do You want to delete the event with name ${props.selectedEvent.showName}`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Alertbox alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
    </>
  );
};

export default DeleteDialog;
