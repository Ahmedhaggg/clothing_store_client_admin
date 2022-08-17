import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomPopup({ question, agreeAction, disAgreeAction }) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{question}</DialogTitle>
                <Box display="flex" justifyContent="center" >
                    <DialogActions>
                        <Button onClick={() => {
                            handleClose()
                            disAgreeAction()
                        }}
                            variant="contained"
                        >Disagree</Button>
                        <Button onClick={() => {
                            handleClose();
                            agreeAction()
                        }}
                            variant="contained"
                        >Agree</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}

// export default React.useMemo(() => CustomPopup, [])