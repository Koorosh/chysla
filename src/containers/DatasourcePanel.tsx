import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

export class DatasourcePanel extends React.Component<any, any> {
  state = {
    value: 0
  };

  handleChange = (event: any, value: any) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Raw data" />
          </Tabs>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(DatasourcePanel);
