import React from "react";
import {
    AppBar,
    Toolbar,
    Container,
    List,
    ListItem,
    ListItemText,
    Hidden,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core"
import SideDrawer from "./SideDrawer"
import Selector from '../selector/Selector'

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    }
});

const navLinks = [
    { title: `linecharts`, path: `/linecharts` },
    { title: `tables`, path: `/tables` },
];

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="xlg" className={classes.navbarDisplayFlex}>
                    <List className="app__title">
                        <a href={'/'} key={'covid19ww'} className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary={'covid19ww'} />
                            </ListItem>
                        </a>
                    </List>
                    <Hidden xsDown>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
                        >
                            {navLinks.map(({ title, path }) => (
                                <a href={path} key={title} className={classes.linkText}>
                                    <ListItem button>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </a>
                            ))}

                            <Selector />
                        </List>
                    </Hidden>


                    <Hidden smUp>
                        <Selector />
                        <SideDrawer navLinks={navLinks} />
                    </Hidden>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
