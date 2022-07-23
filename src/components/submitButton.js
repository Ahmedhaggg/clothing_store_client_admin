import React from "react";

export default function SubmitButton({ text, action }) {
    return (
        <Button variant="contained" color="success" onSubmit={action}>
            {text}
        </Button>
    )
}
