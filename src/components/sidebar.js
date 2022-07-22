import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
    sideBar: {
        color: "white",
        height: "100vh",
        backgroundColor: theme.palette.primary.main
    },
    icon: {
        color: "white"
    }
}));

let items = [
    {
        name: "categories",
        icon: CategoryIcon
    },
    {
        name: "subcategories",
        icon: SubtitlesIcon
    },
    {
        name: "products",
        icon: CheckroomIcon
    },
    {
        name: "inventory",
        icon: InventoryIcon
    },
    {
        name: "offers",
        icon: LocalOfferIcon
    }
]
export default function Sidebar() {

    const classes = useStyles();
    return (
        <List className={classes.sideBar}>
            {items.map((item, index) => (
                <ListItem key={item.name} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <item.icon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}
