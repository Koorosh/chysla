import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";

import {observer} from "mobx-react"

import DataTable from "./../components/DataTable";
import DatasourcePanel from "./DatasourcePanel";

import MapContext from '../contexts/map-context'
import PropertiesPanel from './PropertiesPanel'

const drawerWidth = 240;

const styles: any = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 36,
    marginRight: 0
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",

    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    // height: "100%",
    // width: "100%",
    overflow: "auto"
  }
});

@observer
class Dashboard extends React.Component<any, any> {
  mapRef

  state = {
    open: true,
    bottom: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  toggleDrawer = (side: any, open: any) => () => {
    this.setState({
      [side]: open
    });
  }

  componentDidMount() {
    MapContext.root = this.mapRef
    MapContext.render
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}
            >
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                { MapContext.name }
              </Typography>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div ref={ref => this.mapRef = ref} />
          </main>
          <Drawer
            variant="permanent"
            anchor="right"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <PropertiesPanel/>
            </List>
            <Divider />
            <Button onClick={this.toggleDrawer("bottom", true)}>
              Open Bottom
            </Button>
          </Drawer>

          <SwipeableDrawer
            anchor="bottom"
            open={this.state.bottom}
            onClose={this.toggleDrawer("bottom", false)}
            onOpen={this.toggleDrawer("bottom", true)}
          >
            <DatasourcePanel>
              <DataTable />
            </DatasourcePanel>
          </SwipeableDrawer>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
