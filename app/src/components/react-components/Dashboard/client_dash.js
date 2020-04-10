import React from "react";
import "./styles.css";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import ListingBox from "../Listings";

/* Primary Component for the Admin Dashboard page */
class ClientDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      userisLoaded: false,
      orders: [],
      users:[],
      username:this.props.username
    }
  }


  componentDidMount()  {
    // if(!this.state.isLoaded){

    
    fetch("/users", {
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

        const users = result["results"];
        // users.map(x => {
        //   if (x["username"] == this.props.username){
        //       id = x["pk"]

              
        //   }
        // })

        this.setState({
          isLoaded: true,
          users:users
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
    // }
  

  }

  


  

  handleUser() {




    fetch("/order-information/", {
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
        var results = []

        
        const users = this.state.users;


        var user
        console.log(users)
        console.log(this.state.username)

        users.map(x => {
            if (x["username"] == this.state.username){
              user = x
            }
          }
         )


        orders.map(x => {
          // console.log(x["user"])
          if (x["user"] == user["pk"]){
            
              results.push(x)
          }
        })




        this.setState({
          userisLoaded:true,
          orders: results
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          userisLoaded:true,
          error
        });
      }
    )
  

}
  

  render() {
   
  
    if (this.state.isLoaded && !this.state.userisLoaded){
      this.handleUser()
    }
    const gotoFuncs = this.props.gotoFuncs;
    console.log(gotoFuncs)
    const orders= this.state.orders;
    const isLoaded = this.state.userisLoaded;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Welcome to StopGap!
        </h1>
        <Link to='/form'>
          <Button
            className="newRequestButton"
            color="primary" variant="contained" size='large'
            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
            Create New Ramp Request
          </Button>
        </Link>
        <br />
        <br />
        <ListingBox click={(data) => gotoFuncs.ramp_info(false,data)} orders={orders} isAdmin = { this.props.isAdmin} isLoaded={isLoaded}/>
        {/* <ListingBox click={(id) => this.props.gotoFuncs.ramp_info(false,id)} /> */}
      </div>
    );
  }
}

export default ClientDashboard;
