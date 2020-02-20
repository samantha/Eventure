import React, {Component} from 'react';
import '../nav.css';
import Logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default class TopNav extends Component {
    render() {
        return (
                <div class="nav nav-container">
                    <div class="nav">
                        <div><a href="./dashboard.js"><img src="" alt="Eventure Logo"/></a></div>
                        <div><input class="form-control" type="text" placeholder="Search"></input></div>
                    </div>
                    <div class="nav">
                        <div><FontAwesomeIcon icon={faEnvelope}/> Messages</div>
                        <div><FontAwesomeIcon icon={faBell}/> Notifications</div>
                        <div><FontAwesomeIcon icon={faUserCircle}/> Profile</div>
                    </div>
                </div>
        );
    }
}