import React, { Component, useEffect, useState } from "react";
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import _ from "lodash";

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
import { io } from "socket.io-client";
import DashboardContainer from "./container";
import SocketContainer from "./SocketContainer";

function Index(props) {

  return (
    <React.Fragment>
      <DashboardContainer />
    </React.Fragment>
  );
}

// const mapStateToProps = (state) => {
//   const { users } = state.Chat;
//   const { active_user } = state.Chat;
//   const { user } = state.Auth;
//   const { loading } = state.Auth;
//   const lasmessages = state.Chat.lasmessages;
//   const { chatList } = state.Chat;
//   const { activeChatId } = state.Chat;

//   return {
//     users,
//     user,
//     loading,
//     active_user,
//     lasmessages,
//     chatList,
//     activeChatId,
//   };
// };

// export default withRouter(
//   connect(mapStateToProps, {
//     getUser,
//     isLogining,
//     setFullUser,
//     setOnlineUsers,
//     updateLastMessages,
//     addLoggedinUser,
//     activeUser,
//     setchatList,
//     addNewChat,
//     updateChatListMessage,
//     setActiveChatId,
//     deleteChat,
//     changeLastMessage,
//     updateSignleMessage,
//   })(Index)
// );

export default Index;
