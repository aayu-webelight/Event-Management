import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";
import { bookslot } from "../services/httprequest";

const AddBooking = (props: any) => {
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [name, setName] = useState<String>("");
  const handleClose = () => {
    props.setShowAddDialog(false);
  };
  const handleSubmit = async () => {
    const body = JSON.stringify({
      id: props.selectedSheet._id,
      bookerName: name,
    });
    const response = await bookslot(body);
    if (response.status === 201) {
      props.setStatusChange(true);
    } else {
      setError(true);
    }
    setAlertOpen(true);
    props.setShowAddDialog(false);
  };

  return (
    <>
      <Dialog fullWidth open={props.showAddDialog} onClose={handleClose}>
        <DialogTitle>
          Enter Bookie Name For Sheet {props.selectedSheet.sheetNo}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Add Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
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

export default AddBooking;
