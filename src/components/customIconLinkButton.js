import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomIconLinkButton({ link }) {
    return <IconButton variant='contained'
        sx={{ position: "fixed", width: "50px", height: "50px", fontSize: "25px", bottom: "5%", right: 0, zIndex: 2000, bgcolor: "primary.main", ":hover": { bgcolor: "primary.light" } }}>
        <Link to={link}>
            <AddIcon sx={{ color: "white", fontSize: "25px" }} />
        </Link>
    </IconButton>;
}
