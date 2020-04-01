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
    ramp_info: (isAdmin,id) => this.pushToStack(<RampInfoPage goBack = {this.goBack} id = {id} isAdmin={isAdmin} orders={this.state.orders} isLoaded={this.state.isLoaded}/>)
  }

  componentDidMount() {
    fetch("http://localhost:8000/order-information/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token-access')}`
      }
    })
    .then(res => {
      if (res.ok)
        return res.json()
      throw new Error(`Something went wrong with error code ${res.status}`)
    })
    .then(
      (result) => {
        const orders = result["results"];

        this.setState({
          isLoaded: true,
          orders: orders
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
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
              ? <AdminDashboard logout={this.props.logout} gotoFuncs={this.gotoFuncs} orders={this.state.orders} isLoaded={this.state.isLoaded}/> 
              : <ClientDashboard logout={this.props.logout}  gotoFuncs={this.gotoFuncs} orders={this.state.orders} isLoaded={this.state.isLoaded}/> :
            this.state.pageStack[this.state.pageStack.length - 1]
          }
        </div>
      </div>
    );
  }
}


export default Dashboard;
