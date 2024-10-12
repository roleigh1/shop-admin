
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export default function DialogFoundOrder({ open, foundData, onClose, notFound }) {
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>
            Order Found
          </DialogTitle>
          <DialogContent>
            <table>
              <tbody>
                {foundData.foundOrder && // Check if foundOrder exists
                  Object.entries(foundData.foundOrder).map(([key, value]) => (
                    <tr key={key}>
                      <td
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          paddingRight: "10px",
                        }}
                      >
                        {key}:
                      </td>
                      <td>{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
  
        <Dialog
          open={notFound}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontWeight: "bold" }}
          ></DialogTitle>
          <DialogContent>
            <Alert className="notFound" severity="error">
              Order not found!
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  