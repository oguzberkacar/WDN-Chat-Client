import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Form,
  Label,
  Input,
  Collapse,
  CardHeader,
  CardBody,
  Alert,
  InputGroup,
  Card,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withTranslation } from "react-i18next";

//simple bar
import SimpleBar from "simplebar-react";

//actions
import {
  setconversationNameInOpenChat,
  setActiveChatId,
} from "../../../redux/actions";

//components
import SelectContact from "../../../components/SelectContact";
import { t } from "i18next";

function Groups(props) {
  const [state, setState] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  // useEffect(() => {
  //   console.log(props.groups);
  //   setState({
  //     groups: props.groups,
  //   });
  // }, [props.groups]);

  useEffect(() => {
    props.chatList.map((chat) => {
      if (chat.chatroom) {
        // setState([...prev => prev,chat])
        // looking for state has chat, if not adding chat to state
        setIsloading(false);
        if (state.findIndex((item) => item.id === chat.id) === -1) {
          setState((prev) => [...prev, chat]);
        }

        // setState((prev) => [...prev, chat]);
      }
    });
  }, [props.chatList]);

  function openUserChat(e, group) {
    e.preventDefault();

    props.setActiveChatId(group.chat_id);

    var chatList = document.getElementById("chat-list");
    var clickedItem = e.target;
    var currentli = null;

    if (chatList) {
      var li = chatList.getElementsByTagName("li");
      //remove coversation user
      for (var i = 0; i < li.length; ++i) {
        if (li[i].classList.contains("active")) {
          li[i].classList.remove("active");
        }
      }
      //find clicked coversation user
      for (var k = 0; k < li.length; ++k) {
        if (li[k].contains(clickedItem)) {
          currentli = li[k];
          break;
        }
      }
    }

    //activation of clicked coversation user
    if (currentli) {
      currentli.classList.add("active");
    }

    var userChat = document.getElementsByClassName("user-chat");
    if (userChat) {
      userChat[0].classList.add("user-chat-show");
    }

    //removes unread badge if user clicks
    var unread = document.getElementById("unRead" + group.id);
    if (unread) {
      unread.style.display = "none";
    }
  }

  if (state !== null && state !== undefined) {
    return (
      <React.Fragment>
        <div>
          <div className="p-4">
            {/* Needs Translate */}
            <h4 className="mb-4">{t("Chat Rooms")}</h4>
          </div>

          {/* Start chat-group-list */}
          <SimpleBar
            style={{ maxHeight: "100%" }}
            className="p-4 chat-message-list chat-group-list"
          >
            <ul className="list-unstyled chat-list">
              {state.map((group, key) => (
                <li
                  key={key}
                  className={
                    group.chat_id === props.activeChatId ? "active" : ""
                  }
                >
                  <Link to="#" onClick={(e) => openUserChat(e, group)}>
                    <div className="d-flex align-items-center">
                      <div className="chat-user-img me-3 ms-0">
                        <div className="avatar-xs">
                          <span className="avatar-title rounded-circle wdncolor text-white">
                            {group && group.showname.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="text-truncate font-size-14 mb-0">
                          {group.showname}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              {isLoading ? <li>Loading...</li> : null}
            </ul>
          </SimpleBar>
          {/* End chat-group-list */}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { groups, active_user } = state.Chat;
  const { user } = state.Auth;
  const { chatList } = state.Chat;
  const { activeChatId } = state.Chat;

  return { groups, active_user, user, chatList, activeChatId };
};

export default connect(mapStateToProps, {
  setconversationNameInOpenChat,
  setActiveChatId,
})(withTranslation()(Groups));
