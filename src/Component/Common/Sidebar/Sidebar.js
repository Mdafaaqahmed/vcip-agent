import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { LogoutAction } from '../../../Store/Actions/Login';

class Sidebar extends Component {
    // state = {
    //     id: ''
    // }
    // componentDidMount(){
    //     const id = this.props.match?.params;  
    //     console.log(id);

    //     this.setState({
    //         id: id
    //     })
    // }

    logout = () => {
        const $this = this.props.push;
        this.props.LogoutAction($this)
        // sessionStorage.clear();
    }

    render() {
        const theme = this.props.toggleStatus || localStorage.getItem("theme");

        return (
            <aside id="hideSidebar">
                <div className="sidebar-title mb-4">
                    <div className="m-0 p-0">
                        <img src="../images/Seal_of_Odisha.png" width="50" height="50" style={{ backgroundColor: "white" }} />
                    </div>
                    <div className="text-center mt-2">
                        <h6>Government of Odisha</h6>
                        <h6>Finance Department</h6>
                    </div>
                </div>

                <ul className="nav flex-column custom-sidebar">
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/dashboard" exact activeClassName="active-tab" strict className="nav-link custom-sidebar-link">
                            <i className="fas fa-home" />
                        </NavLink>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/vciplist" exact strict activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-user-alt" />
                        </NavLink>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/vcipSchedulePendingList" exact strict activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-calendar-alt"></i>
                        </NavLink>
                    </li>
                    {/* <li className="nav-item custom-sidebar-item">
                        <NavLink to="/pendinglist" exact strict activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-user-alt" />
                        </NavLink>
                    </li> */}
                    {/* <li className="nav-item custom-sidebar-item">
                        <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-cog" />
                        </NavLink>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-comments" />
                        </NavLink>
                    </li> */}
                    {/* <li className="nav-item custom-sidebar-item">
                        <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-calendar" />
                        </NavLink>
                    </li> */}
                    {/* <li className="nav-item custom-sidebar-item">
                        <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-bell" />
                        </NavLink>
                    </li> */}
                    <li className="nav-item custom-sidebar-item">
                        {/* <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-bell" />
                        </NavLink> */}
                        {theme === "dark" ? <button className="logout mb-2" onClick={() => this.props.toggle(1)}>
                            <i className="far fa-moon"></i>
                        </button> : <button className="logout mb-2" onClick={() => this.props.toggle(2)}>
                            <i className="fas fa-moon"></i>
                        </button>}
                    </li>
                </ul>
                <div className="syntizen_watermark mb-3 mx-3">
                    <hr className="hr w-75 my-2 mx-auto" />
                    <p className="sidebar-subtitle mb-0 text-muted" style={{ fontSize: "10px" }}>Powered By</p>
                    <h2 className="sidebar-title mt-0 text-muted">
                        Syntizen
                    </h2>
                    <div className="text-center mt-3">
                        <button className="logout" onClick={this.logout}><i className="fas fa-power-off" /></button>
                    </div>
                </div>

            </aside >

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        LogoutAction: ($this) => dispatch(LogoutAction($this))
    }
}

export default connect(null, mapDispatchToProps)(Sidebar);
