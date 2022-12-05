import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddShow from "../Components/AddShow";
import Typography from "@mui/material/Typography";
import { List, ListItemButton } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DeleteDialog from "../Components/DeleteDialog";
import IBooking from "../interfaces/Booking";
import AddBooking from "../Components/AddBooking";
import CancelBooking from "../Components/CancelBooking";
import moment from "moment";

const Selection = () => {
  const [events, setEvents] = useState<IBooking[]>([]);
  const [eventChange, setEventChange] = useState<Boolean>(true);
  const [changeBookingStatus, setChangeBookingStatus] =
    useState<Boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IBooking>({
    showName: "",
    bookerName: "",
    dateTime: "",
    isBooked: false,
    _id: "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);

  useEffect(() => {
    getEvents();
  }, [eventChange]);

  const getEvents = async () => {
    await fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((response) => {
        response.sort((a: IBooking, b: IBooking) => {
          let date1: any = new Date(a.dateTime);
          var date2: any = new Date(b.dateTime);
          return date1 - date2;
        });

        setEvents(response);
        setEventChange(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickAway = () => {
    setChangeBookingStatus(false);
  };

  const handleSelected = (event: IBooking) => {
    setSelectedEvent(event);
    setChangeBookingStatus(!changeBookingStatus);
  };
  return (
    <>
      {events.length ? (
        <>
          <Box mt={10} ml={20} mr={10}>
            <Box mt={10} ml={20} mb={10}>
              <Box textAlign={"right"}>
                <AddShow setEventChange={setEventChange} />
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Grid container spacing={2}>
                  {events.map((event: IBooking, key: number) => {
                    const jsdate = new Date(event.dateTime);
                    const date = moment(jsdate).format("DD/MM/YYYY");
                    const time = moment(jsdate).format("LT");
                    return (
                      <Grid
                        key={key}
                        xs={2}
                        margin={1}
                        onClick={() => handleSelected(event)}
                        border={"1px solid black"}
                        borderRadius={"15px"}
                        style={{ paddingLeft: "0 !important" }}
                        mt={0}
                        pl={0}
                      >
                        <Typography sx={{ fontWeight: "bold" }} pl={2} pt={2}>
                          Name:
                        </Typography>
                        <Typography pl={2}>{event.showName} </Typography>
                        <hr></hr>
                        <Typography pl={2} sx={{ fontWeight: "bold" }}>
                          Date of Event:
                        </Typography>
                        <Typography pl={2}>{date}</Typography>
                        <hr></hr>
                        <Typography pl={2} sx={{ fontWeight: "bold" }}>
                          Time of Event:
                        </Typography>
                        <Typography pl={2}>{time}</Typography>

                        {event.isBooked ? (
                          <>
                            <hr></hr>
                            <Typography pl={2} sx={{ fontWeight: "bold" }}>
                              Booked By:
                            </Typography>
                            <Typography pl={2}>{event.bookerName}</Typography>
                          </>
                        ) : (
                          <></>
                        )}
                        {changeBookingStatus ? (
                          <>
                            {selectedEvent._id === event._id ? (
                              <>
                                <hr style={{ margin: "0" }}></hr>
                                {event.isBooked ? (
                                  <List>
                                    <ListItemButton
                                      onClick={() => setShowCancelDialog(true)}
                                    >
                                      Cancel Booking
                                    </ListItemButton>
                                    <hr></hr>
                                    <ListItemButton
                                      onClick={() => setShowDeleteDialog(true)}
                                    >
                                      Delete Show
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
                                      <hr></hr>
                                      <ListItemButton
                                        onClick={() =>
                                          setShowDeleteDialog(true)
                                        }
                                      >
                                        Delete Show
                                      </ListItemButton>
                                    </List>
                                  </>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </ClickAwayListener>
            </Box>
            <DeleteDialog
              showDeleteDialog={showDeleteDialog}
              setShowDeleteDialog={setShowDeleteDialog}
              selectedEvent={selectedEvent}
              setEventChange={setEventChange}
            />
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
      ) : (
        <>
          <div className="App-header">
            <div className="app">
              <Typography variant="h4" gutterBottom>
                No Events Available Add a Event Now
              </Typography>
              <br></br>
              <AddShow setEventChange={setEventChange} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Selection;
