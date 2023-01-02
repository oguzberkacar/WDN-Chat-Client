import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
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
} from "../../redux/actions";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { SendChatRoomMessageToSocket, socket, SocketConnetion } from "../../helpers/socket";

function SocketContainer(props) {
  // var socket = io("https://chat.spapp.click", {
  //   secure: true,
  //   query: 4,
  // });

  if (props.user && props.user.id) {
    SocketConnetion();
  }
  return <></>;
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;

  return {
    user,
  };
};

export default connect(mapStateToProps, {})(SocketContainer);
