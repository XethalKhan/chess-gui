import React from 'react';
import './App.css';

//Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Container from '@material-ui/core/Container';

//Used for navigation bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

//Left side drawer
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';

//Open and close drawer button
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

//Icons
//Drawer icons
import TimelineIcon from '@material-ui/icons/Timeline';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import PersonIcon from '@material-ui/icons/Person';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

//Pages
import Home from './pages/home/Home';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <CssBaseline/>
            <div id="app">
                <AppBar
                    id = "nav"
                    position="fixed">
                    <Toolbar>
                        {
                            open 
                            ? 
                            <IconButton
                                color="inherit"
                                onClick={handleDrawerClose}
                                edge="start">
                                <CloseIcon />
                            </IconButton>
                            : 
                            <IconButton
                                color="inherit"
                                onClick={handleDrawerOpen}
                                edge="start">
                                <MenuIcon />
                            </IconButton>
                        }
                        <Typography 
                            style={{flexGrow: 1}}>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    id = "drawer"
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar}/>
                    <List>
                        <ListItem button component={Link} to="/openings" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <TimelineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Openings"/>
                        </ListItem>
                        <ListItem button component={Link} to="/campaign" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <FeaturedVideoIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Campaigns"/>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Employees"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <CardGiftcardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Rewards"/>
                        </ListItem>
                    </List>
                </Drawer>
                <Container maxWidth="xl" id="content">
                    <div className={classes.toolbar}/>
                    <br/>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/openings">
                            <Typography paragraph>
                                Innovation
                            </Typography>
                        </Route>
                        <Route path="/campaign">
                            <Typography paragraph>
                                Campaigns
                            </Typography>
                        </Route>
                        <Route path="*">
                            <Typography paragraph>
                                404
                            </Typography>
                        </Route>
                    </Switch>
                </Container>
            </div>
        </Router>
    );
}

export default App;
