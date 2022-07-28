import React from "react";
import { Box } from "@mui/material";



export default function ImagePreview({ src, title }) {
    return <Box width="150px" height="150px" marginBottom={3}>
        <img
            height="100%"
            width="100%"
            src={URL.createObjectURL(src)}
            srcSet={src}
            alt={title}
            loading="lazy"
            style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
            }}
        />
    </Box>
}
