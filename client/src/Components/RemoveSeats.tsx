import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alertbox from "./Alertbox";
import { removeSlot } from "../services/httprequest";
import Loader from "./Loader";

const RemoveSeats = (props: any) => {
  const [submitted, setSubmitted] = useState(false);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [totalSeats, setTotalSeats] = useState<any>(0);
  const [password, setPassword] = useState<String>("");
  const handleClose = () => {
    props.setShowRemoveSeats(false);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const body = JSON.stringify({
      totalSeats,
      password,
    });
    const response = await removeSlot(body);
    if (response.status === 200) {
      props.setStatusChange(true);
      setSubmitted(false);
    } else {
      setError(true);
      setSubmitted(false);
    }
    setAlertOpen(true);
    handleClose();
    setSubmitted(false);
  };

  return (
    <>
      <Dialog fullWidth open={props.showRemoveSeats} onClose={handleClose}>
        <DialogTitle>Enter Number of Seats To Remove</DialogTitle>
        <DialogContent>
          <TextField
            type={"number"}
            id="outlined-basic"
            label="Add Number Of Seats To Remove"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => {
              setTotalSeats(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitted ? true : false}>
            Remove
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

export default RemoveSeats;
