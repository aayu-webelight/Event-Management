import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { List, ListItemButton, ListItem } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IBooking from "../interfaces/Booking";
import AddBooking from "../Components/AddBooking";
import CancelBooking from "../Components/CancelBooking";
import Radio from "@mui/material/Radio";
import { getSlots } from "../services/httprequest";

const Selection = () => {
  const [events, setEvents] = useState<IBooking[]>([]);
  const [eventChange, setEventChange] = useState<Boolean>(true);
  const [changeBookingStatus, setChangeBookingStatus] =
    useState<Boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IBooking>({
    bookerName: "",
    slotNo: "",
    isBooked: false,
    _id: "",
  });
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);

  useEffect(() => {
    getEvents();
  }, [eventChange]);

  const getEvents = async () => {
    const response: any = await getSlots();
    if (response.status === 200) {
      setEvents(response.data);
      setEventChange(false);
    }
  };

  const handleClickAway = () => {
    setChangeBookingStatus(false);
  };

  const handleSelected = (event: IBooking) => {
    setChangeBookingStatus(true);
    setSelectedEvent(event);
  };
  return (
    <>
      <Box mt={10} ml={5}>
        <Box sx={{ flexGrow: 1 }}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Grid container item spacing={5} ml={3}>
              {events.map((event: IBooking, key: number) => {
                return (
                  <Grid
                    pt={1}
                    key={key}
                    margin={1}
                    xs={2}
                    onClick={() => handleSelected(event)}
                    border={"1px solid black"}
                    borderRadius={"15px"}
                    textAlign="center"
                  >
                    {event.isBooked ? (
                      <>
                        <Radio
                          color="success"
                          checked={true}
                          onClick={() => setShowCancelDialog(true)}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 32,
                            },
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Radio
                          color="error"
                          checked={true}
                          onClick={() => setShowAddDialog(true)}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 32,
                            },
                          }}
                        />
                      </>
                    )}
                    <hr />
                    {event.isBooked ? (
                      <>
                        <Typography sx={{ fontWeight: "bold" }} pb={1}>
                          Sheet No: {event.slotNo}
                        </Typography>

                        <hr></hr>
                        <Typography pb={1}>
                          <span style={{ fontWeight: 700 }}>Booked By:</span>
                          &nbsp;&nbsp;
                          {event.bookerName}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography sx={{ fontWeight: "bold" }} pb={5} pt={3}>
                          Sheet No: {event.slotNo}
                        </Typography>
                      </>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </ClickAwayListener>
        </Box>

        <AddBooking
          showAddDialog={showAddDialog}
          setShowAddDialog={setShowAddDialog}
          selectedEvent={selectedEvent}
          setEventChange={setEventChange}
        />

        <CancelBooking
          showCancelDialog={showCancelDialog}
          setShowCancelDialog={setShowCancelDialog}
          selectedEvent={selectedEvent}
          setEventChange={setEventChange}
        />
      </Box>
    </>
  );
};

export default Selection;
