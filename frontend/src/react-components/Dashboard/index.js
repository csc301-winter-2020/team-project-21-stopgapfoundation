import React from "react";
import "./styles.css";
import AdminDashboard from "./admin_dash";
import ClientDashboard from "./client_dash";

/* Primary Component for the Admin Dashboard page */
class Dashboard extends React.Component {
  render () {
    return (
      <div>
        {this.props.user.isAdmin ? <AdminDashboard /> : <ClientDashboard />}
      </div>
    );
  }
}


export default Dashboard;
