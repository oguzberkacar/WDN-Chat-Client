import React, { Component, useEffect, useState } from "react";
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/";

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
import { socket } from "../../helpers/socket";
import DashboardContainer from "./container";

function Index(props) {
  const [socketData, setSocketData] = useState({});

  const url = "https://img.workwdn.com";

  // a fucntion for adding new element to state object
  const addSocketData = (key, value) => {
    setSocketData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  let data = {};

  // if all values are ready, connect to socket.io

  const [temp, setTemp] = useState();
  useEffect(() => {
    if (token !== undefined) {
      props.isLogining();
      getProfile();
    }
  }, []);

  if (Object.entries(socketData).length >= 9) {
    console.log("bağladım");
    console.log(socket);
    let conncetData = {
      user_chat_id: socketData.user_chat_id,
      uid: null,
      showname: socketData.showname,
      avatar: socketData.avatar,
      city: socketData.city,
      country: socketData.country,
      age: socketData.age,
      user_id: socketData.user_id,
      role_id: socketData.role_id,
      gender_id: socketData.genderId,
    };
    socket.on("connect", function () {
      let socketID = socket.id;
      conncetData.uid = socketID;
      socket.emit("connected", conncetData);
    });
    socket.on("new_message", function (data) {
      console.log(data);
      // if (data.result.from_id == props.user.id) {
      //   let updateDataObj = {
      //     chat_id: data.result.chat_id,
      //     message: data.result.message,
      //     message_id: data.result.id,
      //   };
      //   props.updateSignleMessage(updateDataObj);
      // }
    });
    socket.on("user_list", function (data) {
      props.setOnlineUsers(data);
      console.log(data);
    });

    // });
  }

  const token = Cookies.get("access_token");

  async function getChatId(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let newid = parseInt(id);
    await fetch(
      `https://chat.spapp.click/api/userChatInfo?user_id=${newid}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let newresult = JSON.parse(result);

        let userChatId = newresult.result.user_chat_id;
        data.chatid = userChatId;
        addSocketData("user_chat_id", userChatId);
        return userChatId;
      });
  }

  async function getProfile() {
    // Fetch user profile
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch("https://api.devapp.one/profile", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let obj = JSON.parse(result);
        let id = obj.result.id;

        let role_id = obj.result.role_id;
        addSocketData("user_id", id);
        getChats(id);
        addSocketData("role_id", role_id);

        if (obj.status === 200 && obj.success == true) {
          let id = obj.result.id;

          getChatId(id);

          if (obj.result.ads) {
            getAds(id);
          } else {
            // username because account has no ads
            let avatarUrl = obj.result.avatar;

            let avatarfull = `${url}/${id}/400/600/jpeg/${avatarUrl}`;
            data.avatar = avatarfull;
            addSocketData("avatar", avatarfull);
            data.username = obj.result.username;
            addSocketData("showname", obj.result.username);
            data.id = id;
            // data.userchatid = chatid;

            // this is real solution
            // props.getUser(data);

            // this is testing purpuse for no ads account

            getAds(10);
          }
        } else {
          Cookies.remove("access_token");
          getUser(null);
          props.props.history.push("/dashboard");
        }
      })
      .catch((error) => console.log("error" + error));
  }

  async function getAds(id) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`https://api.devapp.one/ads/detail/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let adsDetail = JSON.parse(result);
        data.ads = true;
        if (adsDetail.status === 200 && adsDetail.success === true) {
          // check gender_id
          let Gender =
            adsDetail.result.gender_id !== undefined
              ? adsDetail.result.gender_id
              : "No Gender Info";

          let Showname =
            adsDetail.result.showname !== undefined
              ? adsDetail.result.showname
              : adsDetail.result.username;

          let Country =
            adsDetail.result.get_locations !== undefined
              ? adsDetail.result.get_locations[0].location_details.code
              : "No Country";

          // checking user city
          let City =
            adsDetail.result.get_locations !== undefined
              ? adsDetail.result.get_locations[1].location_details
                  .location_contents[0].name
              : "No City";
          // checking user age
          let Age = adsDetail.result.ads_meta[0]
            ? adsDetail.result.ads_meta[0].ads_options[0].title
            : "No Age";
          // checking user avatar
          let Imageurl =
            adsDetail.result.ads_photo_profile == null
              ? "placeholder"
              : `${url}/${adsDetail.result.user.id}/400/600/jpeg/${adsDetail.result.ads_photo_profile.profile_photo.file_name}`;
          // mercing all the in formation to one object
          data.country = Country;
          addSocketData("country", Country);

          data.city = City;
          addSocketData("city", City);
          data.age = Age;
          addSocketData("age", Age);
          data.avatar = Imageurl;
          addSocketData("avatar", Imageurl);

          data.username = Showname;
          addSocketData("showname", Showname);

          data.genderId = Gender;
          addSocketData("genderId", Gender);
          props.getUser(data);
        } else if (
          adsDetail.status === 200 &&
          adsDetail.success === false &&
          adsDetail.message === "ads_not_found"
        ) {
          getProfileWithNoAds();
        } else {
          props.getUser(null);
        }

        // props.history.push("/dashboard");
      })
      .catch((error) => console.log(error));
  }

  async function getProfileWithNoAds() {
    // Fetch user profile
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch("https://api.devapp.one/profile", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let obj = JSON.parse(result);

        if (obj.status === 200 && obj.success == true) {
          let id = obj.result.id;
          let avatarUrl = obj.result.avatar;
          // username because account has no ads
          data.avatar = `${url}/${id}/400/600/jpeg/${avatarUrl}`;
          data.username = obj.result.username;
          data.id = id;
          data.ads = false;

          // this is real solution
          props.getUser(data);
        } else {
          Cookies.remove("access_token");
          getUser(null);
          props.props.history.push("/dashboard");
        }
      })
      .catch((error) => console.log("error" + error));
  }

  const [listAPI, setListAPI] = useState([]);

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
      getChatDetail(item.chat_id, id, index, item.last_message);
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
    // eğer hiç yeni mesaj yoksa napcaz
    if (data.result.messages.total == 0) {
      console.log("no messages");
      return;
    } else if ((props.chatList.length == 0, data.result.messages.total !== 0)) {
      props.addNewChat(obj);
      props.setActiveChatId(data.result.chat_id);
    } else if ((props.chatList.length > 0, data.result.messages.total !== 0)) {
      props.chatList.map((i, index) => {
        if (i.chat_id !== chatid) {
          props.addNewChat(obj);
        }
      });
    } else {
    }
  }

  // useEffect(() => {
  //   console.log('eklendi');
  //   props.updateChatListMessage("db2b14a865879b1e79cce6adccf007cc", 'selam :)')
  // }, []);

  // useEffect(() => {
  //   console.log(props.activeChatId);
  // }, [props.activeChatId]);

  async function deletechat() {
    props.deleteChat(props.activeChatId);

    const response = await fetch(
      `https://chat.spapp.click/api//userChatDelete?chat_id=${props.activeChatId}&user_id=${props.user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application",
        },
      }
    );
    const data = await response.json();
    props.setActiveChatId(props.chatList[0].chat_id);
  }

  async function addChat(newChat) {
    // let updateData = { chat_id: newChat.chat_id, message: newChat.message };
    // props.updateChatListMessage(updateData);
    // props.changeLastMessage(updateData);
    // props.setchatList([])
    // props.setchatList(chatList);
    // console.log("çalıştı");
    // // console.log(props.chatList);
    // props.addNewChat(chatList);
  }

  // useEffect(() => {}, [props.chatList]);

  if (props.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-3 vh-100 vw-100">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <DashboardContainer>
          <ChatLeftSidebar listAPI={listAPI} recentChatList={props.users} />

          <UserChat
            addChat={addChat}
            deleteChat={deletechat}
            recentChatList={props.users}
          />
        </DashboardContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state.Chat;
  const { active_user } = state.Chat;
  const { user } = state.Auth;
  const { loading } = state.Auth;
  const lasmessages = state.Chat.lasmessages;
  const { chatList } = state.Chat;
  const { activeChatId } = state.Chat;

  return {
    users,
    user,
    loading,
    active_user,
    lasmessages,
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
  })(Index)
);
