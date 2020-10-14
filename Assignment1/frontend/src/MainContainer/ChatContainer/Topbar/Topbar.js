import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import Dropdown from "./DropDown/Dropdown";
import "./TopBar.scss"



const Topbar = (props) => {
    const [darkMode,setDarkMode] = useState(false);
    const [mode,setMode] = useState("");
    const [logout, setLogout] = useState(false);
    useEffect(() => {
    },[darkMode]);
   const handleClick = () => {
       setDarkMode(!darkMode);
       if (darkMode)
            setMode("dark");
        else
            setMode("");
   }
   const handleLogout = () => {
        props.setLoginPage(true);
   }
    return (
        <div className={`topbar ${mode}`}>
            <nav className="navbar-nav">
                <ul className="nav-item">
                    <li className="nav-list left laptop">
                        <Dropdown darkMode={mode}/>
                    </li>

                    <li className="nav-list username">{props.username}</li>
                    <ul className="nav-list right">
                        <li onClick={handleClick} className="toggle-darkmode">{darkMode ? <FontAwesomeIcon icon={['fas', 'sun']} title={"Light Mode"} className="light-icon" color="white"/>: <FontAwesomeIcon icon={['fas', 'moon']} title={"Dark Mode"} className="dark-icon" color="white"/> }</li>
                        <li onClick={handleLogout}><button className="logout">Logout</button></li>
                    </ul>
                </ul>
            </nav>
        </div>);
};

export default Topbar;
