import React from "react";
import {
    AppBar,
    Toolbar,
    Container,
    List,
    ListItem,
    ListItemText,
    Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core"
import SideDrawer from "./SideDrawer"
import Selector from '../selector/Selector'
import { NavLink } from 'react-router-dom';

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
    { title: `home`, path: `/` },
    { title: `linecharts`, path: `/linecharts` },
    { title: `tables`, path: `/tables` },
];

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
                    <List className="app__title">
                        <NavLink to={'/'} key={'covid19ww'} className={classes.linkText}>
                            <ListItem button>
                                <h1 className="app__covid">covid19<span>ww</span> </h1>
                            </ListItem>
                        </NavLink>
                    </List>
                    <Hidden xsDown>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
                        >
                            {navLinks.map(({ title, path }) => (
                                <NavLink to={path} key={title} className={classes.linkText}>

                                    <ListItem button>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </NavLink>
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
