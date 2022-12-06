import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ISheets from "../interfaces/Sheets";
import BookSheet from "../Components/BookSheet";
import CancelBooking from "../Components/CancelBooking";
import Radio from "@mui/material/Radio";
import { getSlots } from "../services/httprequest";

const Selection = () => {
  const [sheets, setSheets] = useState<ISheets[]>([]);
  const [statusChange, setStatusChange] = useState<Boolean>(true);

  const [selectedSheet, setSelectedSheet] = useState<ISheets>({
    bookerName: "",
    sheetNo: 0,
    isBooked: false,
    _id: "",
  });
  const [showBookAddDialog, setShowBookAddDialog] = useState<boolean>(false);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);

  useEffect(() => {
    getEvents();
  }, [statusChange]);

  const getEvents = async () => {
    const response: any = await getSlots();
    if (response.status === 200) {
      setSheets(response.data);
      setStatusChange(false);
    }
  };

  const handleSelected = (event: ISheets) => {
    setSelectedSheet(event);
  };
  return (
    <>
      <Box mt={10} ml={5}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container item spacing={5} ml={3}>
            {sheets.map((sheet: ISheets, key: number) => {
              return (
                <Grid
                  pt={1}
                  key={key}
                  margin={1}
                  xs={2}
                  onClick={() => handleSelected(sheet)}
                  border={"1px solid black"}
                  borderRadius={"15px"}
                  textAlign="center"
                >
                  {sheet.isBooked ? (
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
                        onClick={() => setShowBookAddDialog(true)}
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 32,
                          },
                        }}
                      />
                    </>
                  )}
                  <hr />
                  {sheet.isBooked ? (
                    <>
                      <Typography sx={{ fontWeight: "bold" }} pb={1}>
                        Sheet No: {sheet.sheetNo}
                      </Typography>

                      <hr></hr>
                      <Typography pb={1}>
                        <span style={{ fontWeight: 700 }}>Occupied By:</span>
                        &nbsp;&nbsp;
                        {sheet.bookerName}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography sx={{ fontWeight: "bold" }} pb={5} pt={3}>
                        Sheet No: {sheet.sheetNo}
                      </Typography>
                    </>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <BookSheet
          showAddDialog={showBookAddDialog}
          setShowAddDialog={setShowBookAddDialog}
          selectedSheet={selectedSheet}
          setStatusChange={setStatusChange}
        />

        <CancelBooking
          showCancelDialog={showCancelDialog}
          setShowCancelDialog={setShowCancelDialog}
          selectedSheet={selectedSheet}
          setStatusChange={setStatusChange}
        />
      </Box>
    </>
  );
};

export default Selection;
