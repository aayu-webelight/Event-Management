import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { forwardRef, SyntheticEvent } from "react";

const Alertbox = (props: any) => {
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleAlertClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.setAlertOpen(false);
  };
  return (
    <Snackbar
      open={props.alertOpen}
      autoHideDuration={600}
      onClose={handleAlertClose}
    >
      <Alert
        onClose={handleAlertClose}
        severity={props.error ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {props.error ? "Error" : "Success"}
      </Alert>
    </Snackbar>
  );
};

export default Alertbox;
