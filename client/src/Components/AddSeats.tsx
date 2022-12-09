import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";
import { addSlot } from "../services/httprequest";
import Loader from "./Loader";

const AddSeats = (props: any) => {
  const [submitted, setSubmitted] = useState(false);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [totalSeats, setTotalSeats] = useState<any>(0);
  const [password, setPassword] = useState<String>("");
  const [passwordEmpty, setPasswordEmpty] = useState<Boolean>(false);
  const [seatEntered, setSeatEntered] = useState<Boolean>(false);
  const handleClose = () => {
    props.setShowAddSeats(false);
  };

  const handleSubmit = async () => {
    if (totalSeats <= 0) {
      setSeatEntered(true);
      return;
    } else {
      setSeatEntered(false);
    }
    if (password.trim().length <= 0) {
      setPasswordEmpty(true);
      return;
    } else {
      setPasswordEmpty(false);
    }

    setSubmitted(true);
    const body = JSON.stringify({
      totalSeats,
      password,
    });
    const response = await addSlot(body);
    if (response.status === 201) {
      props.setStatusChange(true);
      setSubmitted(false);
    } else {
      setError(true);
      setSubmitted(false);
    }

    setAlertOpen(true);
    handleClose();
  };

  return (
    <>
      <Dialog fullWidth open={props.showAddSeats} onClose={handleClose}>
        <DialogTitle>Enter Number of Seats To Add</DialogTitle>
        <DialogContent>
          <TextField
            error={!seatEntered ? false : true}
            required={true}
            type={"number"}
            id="outlined-basic"
            label="Add Number Of Seats To Add"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => {
              setTotalSeats(event.target.value);
            }}
            helperText={!seatEntered ? "" : "Enter Correct Number of Seats"}
          />
          <TextField
            error={!passwordEmpty ? false : true}
            required={true}
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            helperText={!passwordEmpty ? "" : "Enter Correct Password"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitted ? true : false}>
            Add
          </Button>
        </DialogActions>
        <Loader open={submitted} />
      </Dialog>
      <Alertbox
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        error={error}
      />
    </>
  );
};

export default AddSeats;
