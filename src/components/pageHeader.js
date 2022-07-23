import { Box, } from "@mui/material";
import React from "react";


export default function PageHeader({ text }) {
    return <Box textAlign="center" fontSize="38px" fontWeight="bold" marginBottom={3}>{text}</Box>;
}
