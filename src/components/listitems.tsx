import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { withStyles } from "@material-ui/core/styles";

export const propertiesListItems = (
  <div>
    <ListSubheader inset>Properties</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
);

export const stylesListItems = (
  <div>
    <ListSubheader inset>Styles</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);

const styles: any = (theme: any) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textItem: {
    margin: 0
  }
});

export default withStyles(styles)(
  class DataItems extends React.Component<any, any> {
    constructor(props: any) {
      super(props)
    }
    render() {
      const { classes } = this.props;
      return (
        <div>
          <ListSubheader inset>Properties</ListSubheader>
          <ListItem dense>
            <div className={classes.container}>
              <TextField
                label="Font size"
                id="margin-none"
                defaultValue=""
                helperText="Some important text"
                margin="dense"
                className="textItem"
                fullWidth={false}
              />
              <TextField
                label="Font family"
                id="margin-dense"
                defaultValue=""
                helperText="Some important text"
                className="textItem"
                margin="dense"
              />
              <TextField
                label="Color"
                id="margin-normal"
                defaultValue=""
                helperText="Some important text"
                className="textItem"
                margin="dense"
              />
            </div>
          </ListItem>
        </div>
      )
    }
  }
);
