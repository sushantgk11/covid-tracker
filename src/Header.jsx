import React from 'react';
import './Header.css';
import './assets/covid-19.png';
import {NavLink} from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

function Header(){
    return(<><nav>
        <input type="checkbox"  id="check" />
        <label for="check">
            <i className="fa fa-bars" id="btn" onclick="myfunc()"></i>
            <i className="fa fa-times" id="cancel"></i>
        </label>
         <span className="ml-4 covid_c" id="covid" > C</span><img id="covidImg" src="https://zivilrecht.univie.ac.at/fileadmin/user_upload/i_zivilrecht/Wendehorst/765px-SARS-CoV-2_without_background.png" width="32px" height="32px" claas="logo" /> <span id="covid">VID</span> <img id="tracker" src="https://www.pinclipart.com/picdir/big/200-2009660_tracker-logo-png-transparent-svg-vector-cbc-radio.png" width="auto" height="50px" alt="image"/>
        <ul>
            <li><NavLink to='/covid-tracker'>India-Data</NavLink> </li>
            <li><NavLink to="/Country">Global-Data</NavLink></li>
            {/* <li><NavLink to="/News">News</NavLink></li> */}
            {/* <li><NavLink to="/Helpline">Helplines</NavLink></li> */}
            
        </ul>
    </nav></>)
}

export default Header