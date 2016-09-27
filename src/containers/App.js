import React, {Component, PropTypes} from 'react'
// import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import Header from '../components/Header'
// import MainSection from '../components/MainSection'
import {showPassenger, addPassenger} from '../actions'

import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import VerticalNonLinear from '../components/VerticalNonLinear';
import FullWidthSection from '../components/FullWidthSection';
import ChipExampleSimple from '../components/Chip';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

const muiTheme = getMuiTheme();
class App extends Component {
  state = {
    open: false,
  };

  // handleShowPassenger(){
  //   this.props.showPassenger()
  // }
  //
  // handleAddPassenger(){
  //   this.props.addPassenger(11)
  // }

  render() {
    const {passengers, showPassenger, addPassenger} = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
       <div>
         <Toolbar>
           <ToolbarGroup>
             <ToolbarTitle text="Options" />
             <FontIcon className="muidocs-icon-custom-sort" />
             <ToolbarSeparator />
             <RaisedButton label="Create Broadcast" primary={true} />
           </ToolbarGroup>
         </Toolbar>
         <TextField fullWidth={true}
           hintText="Hint Text"
         /><br/>
{/*<FullWidthSection>*/}
         <ChipExampleSimple />
  {/*</FullWidthSection>*/}

         <List>
           <ListItem primaryText="张三" leftIcon={<ActionGrade />} />
           <ListItem primaryText="张三" leftIcon={<ActionGrade />} />
           <ListItem primaryText="张三" leftIcon={<ActionGrade />} />
           <ListItem primaryText="张三" leftIcon={<ActionGrade />} />
           <ListItem primaryText="张三" leftIcon={<ActionGrade />} />
         </List>

         <VerticalNonLinear />



         {/*<div style={{display: 'none'}}>*/}

           <RaisedButton
             label="refresh"
             secondary={true}
             onTouchTap={ showPassenger }
           />
           <button onClick={ showPassenger }>refresh</button>
           <button onClick={ () => addPassenger(11) }>add</button>
           <ul className="todo-list">
             {passengers.map(todo =>
                          <li key={todo.id}>id: {todo.id} name: {todo.name}</li>
             )}
           </ul>

         {/*</div>*/}

       </div>
      </MuiThemeProvider>
     )
  }
}

App.propTypes = {
  passengers: PropTypes.array.isRequired,
  showPassenger: PropTypes.func.isRequired,
  addPassenger: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    passengers: state.passengers
  }
}

// console.log(actions)

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: TodoActions
//   }
// }

export default connect(
  mapStateToProps,
  {showPassenger, addPassenger}
)(App)
