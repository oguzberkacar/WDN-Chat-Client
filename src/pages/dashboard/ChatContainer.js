import React, { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat";

import {
  getUser,
  isLogining,
  setFullUser,
  setOnlineUsers,
  updateLastMessages,
  addLoggedinUser,
  activeUser,
  setchatList,
  addNewChat,
  updateChatListMessage,
  setActiveChatId,
  deleteChat,
  changeLastMessage,
  updateSignleMessage,
  setConnectionData,
} from "../../redux/actions";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import _ from "lodash";
import SocketContainer from "./SocketContainer";
import { ChangeTheActiveUser, socket } from "../../helpers/socket";

function ChatContainer(props) {
  useEffect(() => {
    if (props.user && props.user.id !== undefined) {
      getChats(props.user.id);
    }
  }, [props.user]);
  async function getChats(id) {
    const response = await fetch(
      `https://chat.spapp.click/api/userChatList?user_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application",
        },
      }
    );
    const data = await response.json();
    data.success.data.map((item, index) => {
      if (item.last_message !== undefined && item.last_message !== null) {
        getChatDetail(item.chat_id, id, index, item.last_message);
      }
    });
  }

  async function getChatDetail(chatid, id, index, last_message) {
    const response = await fetch(
      `https://chat.spapp.click/api/chatDetail?chat_id=${chatid}&user_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application",
        },
      }
    );

    const data = await response.json();

    let obj = {
      chat_id: chatid,
      last_message: last_message,
      away_user: data.result.away_user,
      counter: data.result.counter,
      created_at: data.result.created_at,
      id: data.result.id,
      home_user: data.result.home_user,
      messages: data.result.messages ? data.result.messages : [],
      updated_at: data.result.updated_at,
      users: data.result.users,
      users_deleted_info: data.result.users_deleted_info,
    };
    obj.messages.data = obj.messages.data.reverse();
    console.log(obj);
    // eğer hiç yeni mesaj yoksa napcaz
    if (data.result.messages.total == 0) {
      console.log("no messages");
      return;
    } else if ((props.chatList.length == 0, data.result.messages.total !== 0)) {
      props.addNewChat(obj);
      if (index == 0) {
        // props.setActiveChatId(data.result.chat_id);
      }
    } else if ((props.chatList.length > 0, data.result.messages.total !== 0)) {
      props.chatList.map((i, index) => {
        if (i.chat_id !== chatid) {
          props.addNewChat(obj);
        }
      });
    } else {
    }
  }

  return (
    <React.Fragment>
      <ChatLeftSidebar />
      <UserChat />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { active_user } = state.Chat;
  const { user } = state.Auth;
  const { chatList } = state.Chat;
  const { activeChatId } = state.Chat;

  return {
    user,
    active_user,
    chatList,
    activeChatId,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    isLogining,
    setFullUser,
    setOnlineUsers,
    updateLastMessages,
    addLoggedinUser,
    activeUser,
    setchatList,
    addNewChat,
    updateChatListMessage,
    setActiveChatId,
    deleteChat,
    changeLastMessage,
    updateSignleMessage,
    setConnectionData,
  })(ChatContainer)
);
