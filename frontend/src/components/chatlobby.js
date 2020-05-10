import React, { Component } from "react";
import "../styles/chat.css";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPaperPlane);

class ChatLobby extends Component {
  render() {
    return (
      <div class="chat-container">
        <header class="chat-header">
          <h1>Event Chat</h1>
          <Button color="primary" className="chat-button">
            Go Back
          </Button>
        </header>
        <main class="chat-main">
          <div class="chat-sidebar">
            <h3>
              <i class="fas fa-comments"></i>Event Name:
            </h3>
            <h2 id="room-name"></h2>
            <h3>
              <i class="fas fa-users"></i>Online Users:
            </h3>
            <ul id="users"></ul>
          </div>
          <div class="chat-messages"></div>
        </main>
        <div class="chat-form-container">
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autocomplete="off"
            />
            <Button color="primary" className="chat-button">
              <FontAwesomeIcon icon={faPaperPlane} /> Send
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatLobby;
