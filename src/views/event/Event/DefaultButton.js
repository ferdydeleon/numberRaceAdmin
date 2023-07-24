import React,{useState,useEffect} from 'react';
import {
    Divider,
    Button,
    TableHead,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    TableRow,
    withStyles,
    Table,
    TableCell,
    TableBody

} from '@material-ui/core';
import Api from "../../../Api";
import {fetchDefultButton} from "../../../adminModel/data";
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: Api.table.head,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);



const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const DefaultButton = ({ status, handleClose,gameID}) => {

    const [confirmButton, setConfirmButton] = useState([]);
    useEffect(() => {
        //setLoading(true);
        async function fetchData() {
            // You can await here
            const results = await fetchDefultButton(gameID);
      
            if (results === "NO DATA FOUND") {
                setConfirmButton([]);
              } else {
                setConfirmButton(results);
              }


            //setLoading(false);
        }
        fetchData().catch(console.error);
    }, [gameID]);

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={status}
                TransitionComponent={'Transition'}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <CardHeader title="Default Button" />
                <DialogContent>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center">Button Name</StyledTableCell>
                                <StyledTableCell align="center">Button Color</StyledTableCell>
                                <StyledTableCell align="center">Image</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {confirmButton.length ? (
                                confirmButton.map((row, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <StyledTableCell align="center">
                                                {row.button_name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.button_color}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.img_url}
                                            </StyledTableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <StyledTableCell key={1} colSpan={3}>
                                        No record found!
                                    </StyledTableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                    // style={Api.button_orange}
                    >
                        Exit
                    </Button>
                    <Button
                        onClick={'handleSaveDefaultButton'}
                        variant="outlined"
                    //style={Api.button_green}
                    >
                        Use Button
                    </Button>
                </DialogActions>
            </Dialog>

        </div>

    );
};


export default DefaultButton;
