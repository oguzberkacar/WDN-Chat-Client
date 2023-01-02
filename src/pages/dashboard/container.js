import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

import {
  getUser,
  isLogining,
  setchatList,
  updateChatListMessage,
  setActiveChatId,
  stopLoading,
} from "../../redux/actions";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import _ from "lodash";
import SocketContainer from "./SocketContainer";

import ChatContainer from "./ChatContainer";

function DashboardContainer(props) {
  let data = {};
  const url = "https://img.workwdn.com";

  const token = Cookies.get("access_token");

  useEffect(() => {
    if (token !== undefined && token !== null) {
      getProfile();
      props.isLogining();
      getChatrooms();
    } else {
      getChatrooms();
      visitorSocketConnection();
    }
  }, []);

  function visitorSocketConnection() {
    var socket = io("https://chat.spapp.click", {
      secure: true,
      query: 4,
    });

    let conncetData = {
      user_chat_id: "visitor",
      uid: null,
      showname: "Visitor",
      avatar: null,
      city: null,
      country: null,
      age: null,
      user_id: "Visitor",
      role_id: "Visitor",
      gender_id: null,
    };
    socket.on("connect", function () {
      let socketID = socket.id;
      conncetData.uid = socketID;
      socket.emit("connected", conncetData);
    });

    socket.on("chat_room_new_message", function (data) {
      let updateChat = {
        chat_id: data.chat_room_chat_id,
        message: data.result,
      };

      props.updateChatListMessage(data);
    });
  }

  async function getChatrooms() {
    // Fetch user profile
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch("https://chat.spapp.click/api/chatRooms", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let obj = JSON.parse(result);
        let chatrooms = obj.result;
        console.log("chatrooms", chatrooms);

        if (obj.status === 200 && obj.success == true) {
          // props.setchatList(chatrooms);
          // props.setActiveChatId(chatrooms[0].chat_id)
          // props.stopLoading()

          chatrooms.map((i, index) => {
            getChatroomMessages(
              i.chat_id,
              i.name,
              index,
              i.chat_room_match.chat_room_id
            );
          });
        }
      })
      .catch((error) => console.log("error", error));
  }

  async function getChatroomMessages(chatid, name, index, chat_room_id) {
    // Fetch user profile
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://chat.spapp.click/api/chatRoomMessages?chat_room_chat_id=${chatid}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let obj = JSON.parse(result);
        let messages = obj.result;
        messages.showname = name;
        messages.chatroom = true;
        messages.chat_id = chatid;
        messages.chat_room_id = chat_room_id;
        messages.data = messages.data.reverse();

        if (obj.status === 200 && obj.success == true) {
          props.setchatList([messages]);
          props.stopLoading();
          if (index == 0) {
            props.setActiveChatId(messages.chat_id);
          }
        }
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
        console.log(obj.result);

        let role_id = obj.result.role_id;
        data.role_id = role_id;

        if (obj.status === 200 && obj.success == true) {
          let id = obj.result.id;

          // username because account has no ads
          let avatarUrl = obj.result.avatar;

          let avatarfull = `${url}/${id}/400/600/jpeg/${avatarUrl}`;
          data.avatar = avatarfull;
          // data.username = obj.result.username;
          data.id = id;
          data.showname = obj.result.username;
          data.username = obj.result.username;
          // data.userchatid = chatid;

          searchAdsInfoInAllAds(id);
        } else {
          Cookies.remove("access_token");
          getUser(null);
          props.history.push("/dashboard");
        }
      })
      .catch((error) => console.log("error" + error));
  }
  async function searchAdsInfoInAllAds(id) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`https://api.devapp.one/ads`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let obj = JSON.parse(result);

        // burada patlıyo ads yok
        console.log(obj);
        obj.result.data.map((item) => {
          if (item.user_id == id) {
            getAds(item.id);
            console.log(item);
            data.ads = true;
            data.ads_id = item.id;
          }
        });
        console.log(data.ads);
        if (data.ads == undefined) {
          data.ads = false;
          console.log("geldi");
          getChatId(id);
        }
      })
      .catch((error) => console.log(error));
  }

  async function getAds(id) {
    console.log(id);
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

          data.city = City;
          data.age = Age;

          data.avatar = Imageurl;
          data.avatarUrl = Imageurl;

          data.username = Showname;

          data.genderId = Gender;

          getChatId(adsDetail.result.user.id);
        } else if (
          adsDetail.status === 200 &&
          adsDetail.success === false &&
          adsDetail.message === "ads_not_found"
        ) {
          //   getProfileWithNoAds();
        } else {
          // props.getUser(null);
        }

        // props.history.push("/dashboard");
      })
      .catch((error) => console.log(error));
  }
  async function getChatId(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let newid = parseInt(id);
    console.log(id);
    await fetch(
      `https://chat.spapp.click/api/userChatInfo?user_id=${newid}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let newresult = JSON.parse(result);

        console.log(newresult);

        let userChatId = newresult.result.user_chat_id;
        data.chatid = userChatId;
        props.getUser(data);

        return userChatId;
      });
  }

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
        {/* <ChatLeftSidebar /> */}
        <ChatContainer />
        <SocketContainer />
        {/* <UserChat /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading } = state.Auth;

  return {
    loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    isLogining,
    setchatList,
    setActiveChatId,
    stopLoading,
    updateChatListMessage,
  })(DashboardContainer)
);
