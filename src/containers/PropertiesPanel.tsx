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
import {observer} from 'mobx-react'

import propertiesContext from '../contexts/properties-context'
import mapContext, {ItemType} from '../contexts/map-context'

export const TextProperty: React.SFC<any> = (props) => {
  const onChange = (e) => {
    props.onChange({styleName: props.id, styleVal: e.target.value})
  }
  return (
    <TextField
      label={props.name}
      id={props.id}
      key={props.id}
      defaultValue={props.inputOptions.defaultValue}
      margin="dense"
      className="textItem"
      onChange={onChange}
    />
  )
}

export const ListProperty: React.SFC<any> = (props) => {
  const onChange = (e) => {
    props.onChange({styleName: props.id, styleVal: e.target.value})
  }
  return (
    <TextField
      label={props.name}
      id={props.id}
      key={props.id}
      defaultValue={props.inputOptions.defaultValue}
      margin="dense"
      className="textItem"
      onChange={onChange}
    />
  )
}

export const ColorPickerProperty: React.SFC<any> = (props) => {
  return (
    <TextField
      label={props.name}
      id={props.id}
      key={props.id}
      defaultValue={props.inputOptions.defaultValue}
      margin="dense"
      className="textItem"
    />
  )
}

const styles: any = (theme: any) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textItem: {
    margin: 0
  }
});

@observer
export class PropertiesPanel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.onChange = this.onChange.bind(this)
  }

  onChange(data: any) {
    propertiesContext.onChange(data)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListSubheader inset>Properties</ListSubheader>
        {
          propertiesContext.propertiesTemplate && propertiesContext.propertiesTemplate.properties
            .map(property => {
              switch (property.inputType) {
                case 'list':
                  return (<ListProperty {...property} onChange={this.onChange}/>)
                case 'colorPicker':
                  return (<ColorPickerProperty {...property} onChange={this.onChange} />)
                case 'text':
                  return (<TextProperty {...property} onChange={this.onChange} />)
                default:
                  return (<TextProperty {...property} onChange={this.onChange} />)
              }
            })
            .map((component, index) => (
              <ListItem
                key={index}
                dense>
                <div className={classes.container}>
                  { component }
                </div>
              </ListItem>
            ))
        }
      </div>
    );
  }
}

export default withStyles(styles)(PropertiesPanel);
