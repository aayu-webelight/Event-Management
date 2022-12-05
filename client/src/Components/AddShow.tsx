import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Alertbox from "./Alertbox";

const AddShow = (props: any) => {
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<String>("");
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));

  const handleSubmit = () => {
    const dateTime = dayjs(date).toDate().toString();
    fetch("http://localhost:3001", {
      method: "POST",
      body: JSON.stringify({
        showName: name,
        dateTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        props.setEventChange(true);
        setOpen(false);
        setAlertOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Add an Event
      </Button>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Enter Show Name And Deatils</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Add Show Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => setName(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                label="Select Event Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                minDateTime={dayjs(new Date())}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add The Event</Button>
        </DialogActions>
      </Dialog>
      <Alertbox alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
    </>
  );
};

export default AddShow;
