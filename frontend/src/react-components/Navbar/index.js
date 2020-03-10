import React from 'react'
import logo from "../../img/logo.png"
import './styles.css'
class Nav extends React.Component {
    /*Will need to use states to change the title of the navbar*/
    render() {
        return (
            <div className="navbar">
                <span className="navTitle"><h3><b>{this.props.title}</b></h3></span>
                <span><img className='center' src={logo}></img></span>
            </div>
        )
    }

}
export default Nav;