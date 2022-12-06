import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";

const AddBooking = (props: any) => {
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [name, setName] = useState<String>("");
  const handleClose = () => {
    props.setShowAddDialog(false);
  };
  const handleSubmit = () => {
    fetch("http://localhost:3001", {
      method: "PUT",
      body: JSON.stringify({
        id: props.selectedEvent._id,
        bookerName: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setAlertOpen(true);
        props.setEventChange(true);
        props.setShowAddDialog(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog fullWidth open={props.showAddDialog} onClose={handleClose}>
        <DialogTitle>
          Enter Bookie Name For {props.selectedEvent.showName}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Add Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => setName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Alertbox alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
    </>
  );
};

export default AddBooking;
