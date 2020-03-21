import React, { Component } from "react";
import ReactDOM from "react-dom";
import TopNav from "./topnav.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import '../eventpage.css';
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class EventPage extends Component {
    render() {
        return (
            <div>
            <TopNav/>
            <main>
                <div id="container">
                    <h1>Sample Event Name: This is just a Test</h1>
                        <div className="event-flex">
                            <section className="event-info">
                                <p><img src="https://cdn.pixabay.com/photo/2019/06/27/21/14/logo-4303138_1280.png" alt="organization logo" id="org-logo"/> by Sample Organization</p>
                                <div>
                                    <div><FontAwesomeIcon icon={faCalendar}/> <b>Saturday, March 7</b></div>
                                    <div className="second-line">7:00 pm - 8:00 pm</div>
                                </div>
                                <div>
                                    <div className="first-line"><FontAwesomeIcon icon={faMapMarkerAlt}/> <b>California State University, Long Beach</b></div>
                                    <div className="second-line">1250 Bellflower Blvd,<br/> Long Beach, CA 90840</div>
                                </div>
                            </section>
                            <section className="banner">
                                <img src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/Screen-Shot-2015-06-29-at-13.58.37.png"></img>
                            </section>
                        </div>
                        <section className="description">
                            <h2>Description</h2>
                            <p>Manor we shall merit by chief wound no or would. Oh towards between subject passage sending mention or it. Sight happy do burst fruit to woody begin at. Assurance perpetual he in oh determine as. The year paid met him does eyes same. Own marianne improved sociable not out. Thing do sight blush mr an. Celebrated am announcing delightful remarkably we in literature it solicitude. Design use say piqued any gay supply. Front sex match vexed her those great.</p>

                            <p>
                            Why end might ask civil again spoil. She dinner she our horses depend. Remember at children by reserved to vicinity. In affronting unreserved delightful simplicity ye. Law own advantage furniture continual sweetness bed agreeable perpetual. Oh song well four only head busy it. Afford son she had lively living. Tastes lovers myself too formal season our valley boy. Lived it their their walls might to by young. 
                            </p>

                            <p>
                            At distant inhabit amongst by. Appetite welcomed interest the goodness boy not. Estimable education for disposing pronounce her. John size good gay plan sent old roof own. Inquietude saw understood his friendship frequently yet. Nature his marked ham wished. 
                            </p>
                            In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or. 

                            <p>
                            Talking chamber as shewing an it minutes. Trees fully of blind do. Exquisite favourite at do extensive listening. Improve up musical welcome he. Gay attended vicinity prepared now diverted. Esteems it ye sending reached as. Longer lively her design settle tastes advice mrs off who. 
                            </p>

                            <p>
                            For though result and talent add are parish valley. Songs in oh other avoid it hours woman style. In myself family as if be agreed. Gay collected son him knowledge delivered put. Added would end ask sight and asked saw dried house. Property expenses yourself occasion endeavor two may judgment she. Me of soon rank be most head time tore. Colonel or passage to ability. 
                            </p>

                            <p>
                            Bed sincerity yet therefore forfeited his certainty neglected questions. Pursuit chamber as elderly amongst on. Distant however warrant farther to of. My justice wishing prudent waiting in be. Comparison age not pianoforte increasing delightful now. Insipidity sufficient dispatched any reasonably led ask. Announcing if attachment resolution sentiments admiration me on diminution. 
                            </p>

                        </section>
                </div>
            </main>
            <section className="rsvp-bar fixed-bottom">
                <div className="rsvp-content">
                    <p><b>Free</b></p>
                    <Button variant="primary" className="rsvp-button">Attend</Button>
                </div>
            </section>
            </div>
        );
    }
}