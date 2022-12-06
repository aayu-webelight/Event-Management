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
    // console.log(response);
    setEvents(response.data);
    setEventChange(false);
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
                        <Radio color="success" checked={true} />
                      </>
                    ) : (
                      <>
                        <Radio color="error" checked={true} />
                      </>
                    )}
                    <hr />
                    <Typography sx={{ fontWeight: "bold" }} pb={1}>
                      Slot No: {event.slotNo}
                    </Typography>
                    {changeBookingStatus && selectedEvent._id === event._id && (
                      <>
                        <hr style={{ margin: "0" }}></hr>
                        {event.isBooked ? (
                          <List>
                            <ListItem>
                              <span style={{ fontWeight: 700 }}>
                                Booked By:
                              </span>
                              &nbsp;&nbsp;
                              {event.bookerName}
                            </ListItem>
                            <hr></hr>
                            <ListItemButton
                              onClick={() => setShowCancelDialog(true)}
                            >
                              Cancel Booking
                            </ListItemButton>
                          </List>
                        ) : (
                          <>
                            <List>
                              <ListItemButton
                                onClick={() => setShowAddDialog(true)}
                              >
                                Add Booking
                              </ListItemButton>
                            </List>
                          </>
                        )}
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
