import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import { makeStyles } from "@mui/styles"
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    sideBar: {
        color: "white",
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
        padding: "80px 0px 0px 0px"
    },
    icon: {
        color: "white"
    },
    link: {
        color: "white",
        textDecoration: "none"
    },
    list: {
        width: "100%"
    }
}));

let items = [
    {
        name: "categories",
        icon: CategoryIcon,
        link: "/categories"
    },
    {
        name: "subcategories",
        icon: SubtitlesIcon,
        link: "/subcategories"
    },
    {
        name: "products",
        icon: CheckroomIcon,
        link: "/products"
    },
    {
        name: "inventory",
        icon: InventoryIcon,
        link: "/inventory"
    },
    {
        name: "offers",
        icon: LocalOfferIcon,
        link: "/offers"
    }

]
export default function Sidebar() {

    const classes = useStyles();
    return (
        <Box className={classes.sideBar} position="fixed" width={320} >
            <List>
                {items.map((item, index) => (
                    <Link to={item.link} className={classes.link} key={item.name}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <item.icon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                ))}
            </List>
        </Box>
    )
}
