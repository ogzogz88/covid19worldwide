import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';


const useStyles = makeStyles({
    list: {
        width: 250
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `black`
    }
});

const homeIcon = {
    home: <HomeRoundedIcon />,
    linecharts: <AssessmentRoundedIcon />,
    tables: <TableChartRoundedIcon />
}

const SideDrawer = ({ navLinks }) => {
    const classes = useStyles();
    const [state, setState] = useState({ right: false });

    const toggleDrawer = (anchor, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ [anchor]: open });
    };

    const sideDrawerList = anchor => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List component="nav">
                {navLinks.map(({ title, path }) => (
                    <NavLink to={path} key={title} className={classes.linkText}>
                        <ListItem button>
                            <ListItemIcon >
                                {homeIcon[title]}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer("right", true)}
            >
                <Menu fontSize="large" style={{ color: `white` }} />
            </IconButton>

            <Drawer
                anchor="right"
                open={state.right}
                onOpen={toggleDrawer("right", true)}
                onClose={toggleDrawer("right", false)}
            >
                {sideDrawerList("right")}
            </Drawer>
        </React.Fragment>
    );
};

export default SideDrawer;
