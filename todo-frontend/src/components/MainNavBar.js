import React from 'react';
import { Link } from 'react-router-dom';
const logo = require('../images/logo3.svg');
class NavBar extends React.Component{
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
    logout(){
        //this.props.loggedin = false;
        console.log('logout');

    }
    
    render(){
        //console.log(this.props.user);
    return (
        <div>
            <nav className="navbar  navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link  className="navbar-brand" style = {{paddingLeft: "20px"}} to = '/main'>
                        <img src={logo} height = "70" className="d-inline-block align-top" alt = ""/> 
                    </Link>
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to = '/main' style = {{fontSize: "28px", fontWeight: "bold", marginLeft: "24px"}}>Home</Link>
                            </li>
                        </ul>
                        <div style = {{marginRight: "20px"}}>
                            
                        </div>
                    </div>
                    <div style = {{display: "flex", justifyContent: "space-evenly"}} >
                        <div className = "dropdown">
                            <Link id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link" to = '#' style = {{fontSize: "28px", fontWeight: "bold", marginLeft: "24px"}}><i className="fa fa-user-circle-o" style={{fontSize: "56px", color:"#217A7A"}}></i></Link>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" style = {{padding: "40px 30px", boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                                <h3 style = {{textAlign: "center", padding: "8px"}}>Welcome</h3>
                                <div style = {{textAlign: "center", padding: "8px"}}>
                                    <i className="fa fa-user-circle-o" style={{fontSize: "56px", color:"#217A7A"}}></i>
                                </div>
                                <h5 style = {{textAlign: "center", padding: "8px"}}>username</h5>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/" onClick = {this.logout} style = {{textAlign: "center", padding: "8px", fontSize: "20px"}}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
}

export default NavBar;