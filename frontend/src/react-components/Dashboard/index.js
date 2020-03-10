import React from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import AdminDashboard from "./Admin/admin_dash";
import ClientDashboard from "./client_dash";

/* Primary Component for the Admin Dashboard page */
class Dashboard extends React.Component {
  render () {
    if (!this.props.loggedIn) // user is not logged in.
      return <Redirect to="/login" /> 
    return (
      <div>
        {this.props.user.isAdmin ? <AdminDashboard /> : <ClientDashboard />}
      </div>
    );
  }
}


export default Dashboard;
