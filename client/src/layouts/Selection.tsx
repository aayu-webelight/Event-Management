import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ISeats from "../interfaces/Seat";
import BookSeat from "../Components/BookSeat";
import CancelBooking from "../Components/CancelBooking";
import { getSlots } from "../services/httprequest";
import Logo from "../icons/Logo.png";
import AddSeats from "../Components/AddSeats";
import RemoveSeats from "../Components/RemoveSeats";
import Loader from "../Components/Loader";
import { Console } from "console";

const Selection = () => {
  const [error, setError] = useState<Boolean>(false);
  const [totalSeats, setTotalSeats] = useState<ISeats[]>([]);
  const [showAddSeats, setShowAddSeats] = useState<Boolean>(false);
  const [showRemoveSeats, setShowRemoveSeats] = useState<Boolean>(false);
  const [statusChange, setStatusChange] = useState<Boolean>(true);
  const [start, setStart] = useState<Boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<ISeats>({
    bookerName: "",
    seatNo: 0,
    isBooked: false,
    _id: "",
  });
  const [showBookSeatDialog, setShowBookSeatDialog] = useState<boolean>(false);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);
  const Mobile = useMediaQuery("(max-width:1366px)");
  const Desktop = useMediaQuery("(min-width:1367px)");

  useEffect(() => {
    getEvents();
  }, [statusChange]);

  const getEvents = async () => {
    setStart(true);
    try {
      const response: any = await getSlots();
      if (response.status === 200) {
        setTotalSeats(response.data);
        setStatusChange(false);
        setStart(false);
        return;
      } else {
        throw new Error("Unable to Connect");
      }
    } catch (err) {
      setError(true);
      setStart(false);
      return;
    }
  };

  const handleSelected = (event: ISeats) => {
    setSelectedSeat(event);
  };

  return (
    <>
      <Box mt={5} ml={18}>
        <Grid container mt={2}>
          <Grid item xs={3}>
            <img src={Logo} alt="Webelight-Logo" width="250px" />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h3" textAlign={"center"}>
              Seat Management
            </Typography>
          </Grid>

          <Grid item xs={4} mt={1} alignContent={"right"}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent={"center"}
              mr={30}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => setShowAddSeats(true)}
              >
                Add Seats
              </Button>

              <Button
                variant="contained"
                size="large"
                onClick={() => setShowRemoveSeats(true)}
              >
                Remove Seats
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {error ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "webkit-fill-availbale",
                marginTop: "8rem",
                marginLeft: "-10rem",
              }}
            >
              <h1 style={{ color: "red", fontSize: "50px" }}>
                Unable To Connect to server
              </h1>
            </div>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }} mt={15} ml={1}>
              <Grid container item spacing={5}>
                {totalSeats.map((seat: ISeats, key: number) => {
                  return (
                    <Grid
                      pt={1}
                      key={key}
                      margin={1}
                      xs={Mobile ? 4 : 2}
                      onClick={() => handleSelected(seat)}
                      border={"1px solid black"}
                      borderRadius={"15px"}
                      textAlign="center"
                    >
                      {seat.isBooked ? (
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
                            onClick={() => setShowBookSeatDialog(true)}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 32,
                              },
                            }}
                          />
                        </>
                      )}
                      <hr />
                      {seat.isBooked ? (
                        <>
                          <Typography sx={{ fontWeight: "bold" }} pb={1}>
                            Seat No: {seat.seatNo}
                          </Typography>

                          <hr></hr>
                          <Typography pb={1}>
                            <span style={{ fontWeight: 700 }}>
                              Occupied By:
                            </span>
                            &nbsp;&nbsp;
                            {seat.bookerName}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography sx={{ fontWeight: "bold" }} pb={5} pt={3}>
                            Seat No: {seat.seatNo}
                          </Typography>
                        </>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container justifyContent={"center"} pt={4}></Grid>

              <BookSeat
                showBookSeatDialog={showBookSeatDialog}
                setShowBookSeatDialog={setShowBookSeatDialog}
                selectedSeat={selectedSeat}
                setStatusChange={setStatusChange}
              />

              <CancelBooking
                showCancelDialog={showCancelDialog}
                setShowCancelDialog={setShowCancelDialog}
                selectedSeat={selectedSeat}
                setStatusChange={setStatusChange}
              />
              <AddSeats
                setShowAddSeats={setShowAddSeats}
                showAddSeats={showAddSeats}
                setStatusChange={setStatusChange}
              />
              <RemoveSeats
                totalSeats={totalSeats.length}
                showRemoveSeats={showRemoveSeats}
                setShowRemoveSeats={setShowRemoveSeats}
                setStatusChange={setStatusChange}
              />
            </Box>
          </>
        )}
      </Box>
      <Loader open={start} />
    </>
  );
};

export default Selection;
