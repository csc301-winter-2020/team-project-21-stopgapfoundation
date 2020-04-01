import React from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import Navbar from "../Navbar";
import AdminDashboard from "./Admin/admin_dash";
import ClientDashboard from "./client_dash";
import RampInfoPage from "./RampInfoPage";

/* Primary Component for the Admin Dashboard page */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStack: [], // when we navigate to a "sub-page", push to stack. When we "go back", pop from stack
      isLoaded: false, // 
      orders: [] // list of all orders TODO: don't load ALL orders here, since then clients can view it via dev tools
    }
  }

  pushToStack = (component) => {
    const newStack = [... this.state.pageStack];
    newStack.push(component);
    this.setState({
      pageStack: newStack
    });
  }

  goBack = () => {
    const newStack = [... this.state.pageStack];
    newStack.pop();
    this.setState({
      pageStack: newStack
    });
  }

  gotoFuncs = {
    ramp_info: (isAdmin,data) => this.pushToStack(<RampInfoPage goBack = {this.goBack} data = {data} isAdmin={isAdmin} />)
  }

  
  

  render () {
    if (!this.props.loggedIn) // user is not logged in.
      return <Redirect to="/" /> 
    
    return (
      <div>
        <Navbar title={this.props.isAdmin ? "Admin Dashboard" : "Client Dashboard"} logout={this.props.logout} goBack={this.goBack} stackSize={this.state.pageStack.length}/>
        <div className={"content"}>
          {this.state.pageStack.length == 0 ? 
            this.props.isAdmin 
              ? <AdminDashboard logout={this.props.logout} gotoFuncs={this.gotoFuncs} /> 
              : <ClientDashboard logout={this.props.logout}  gotoFuncs={this.gotoFuncs} /> :
            this.state.pageStack[this.state.pageStack.length - 1]
          }
        </div>
      </div>
    );
  }
}


export default Dashboard;
