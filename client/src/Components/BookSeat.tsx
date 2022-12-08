import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";
import { bookslot } from "../services/httprequest";
import Loader from "./Loader";

const BookSeat = (props: any) => {
  const [open, setOpen] = useState<Boolean>(false);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [name, setName] = useState<String>("");
  const [nameEmpty, setNameEmpty] = useState<Boolean>(false);
  const handleClose = () => {
    props.setShowBookSeatDialog(false);
  };
  const handleSubmit = async () => {
    if (name.trim().length <= 0) {
      setNameEmpty(true);
      return;
    }
    setOpen(true);
    const body = JSON.stringify({
      id: props.selectedSeat._id,
      bookerName: name,
    });
    const response = await bookslot(body);
    if (response.status === 201) {
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
      <Dialog fullWidth open={props.showBookSeatDialog} onClose={handleClose}>
        <DialogTitle>
          Enter Occupy Name For Seat {props.selectedSeat.seatNo}
        </DialogTitle>
        <DialogContent>
          <TextField
            error={nameEmpty ? true : false}
            required={true}
            id="outlined-basic"
            label="Add Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => {
              setName(event.target.value);
            }}
            helperText={nameEmpty ? "Please Enter A valid name" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
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

export default BookSeat;
