import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

export default function CustomIconButton({ action }) {
    return <IconButton variant='contained' onClick={action}
        sx={{ width: "50px", height: "50px", fontSize: "25px", bgcolor: "primary.main", ":hover": { bgcolor: "primary.light" } }}>
        <AddIcon sx={{ color: "white", fontSize: "25px" }} />
    </IconButton>;
}
