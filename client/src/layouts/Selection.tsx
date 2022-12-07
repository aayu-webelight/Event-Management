import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ISeats from "../interfaces/Seat";
import BookSeat from "../Components/BookSeat";
import CancelBooking from "../Components/CancelBooking";
import Radio from "@mui/material/Radio";
import { getSlots } from "../services/httprequest";
import { useMediaQuery } from "@mui/material";

const Selection = () => {
  const [seats, setSeats] = useState<ISeats[]>([]);
  const [statusChange, setStatusChange] = useState<Boolean>(true);

  const [selectedSeat, setSelectedSeat] = useState<ISeats>({
    bookerName: "",
    seatNo: 0,
    isBooked: false,
    _id: "",
  });
  const [showBookSeatDialog, setShowBookSeatDialog] = useState<boolean>(false);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);
  const MobileGrid = useMediaQuery("(max-width:720px)");
  const MobilePadding = useMediaQuery("(min-width:1280px)");

  useEffect(() => {
    getEvents();
  }, [statusChange]);

  const getEvents = async () => {
    const response: any = await getSlots();
    if (response.status === 200) {
      setSeats(response.data);
      setStatusChange(false);
    }
  };

  const handleSelected = (event: ISeats) => {
    setSelectedSeat(event);
  };
  return (
    <>
      <Box mt={10} ml={5}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container item spacing={5} ml={MobilePadding ? 8 : 0}>
            {seats.map((seat: ISeats, key: number) => {
              return (
                <Grid
                  pt={1}
                  key={key}
                  margin={1}
                  xs={MobileGrid ? 4 : 2}
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
                        <span style={{ fontWeight: 700 }}>Occupied By:</span>
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
        </Box>

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
      </Box>
    </>
  );
};

export default Selection;
