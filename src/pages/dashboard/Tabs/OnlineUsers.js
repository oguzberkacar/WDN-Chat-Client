import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

//carousel
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

//Import Images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import ScrollContainer from "react-indiana-drag-scroll";
import { connect } from "react-redux";

import {
  setOnlineUsers,
  addLoggedinUser,
  activeUser,
  setActiveChatId,
  addNewChat,
} from "../../../redux/actions";
import { t, use } from "i18next";

const OnlineUsers = (props) => {
  const responsive = {
    0: { items: 4 },
    1024: { items: 4 },
  };

  const [onlineUserList, setOnlineUserList] = useState();

  useEffect(() => {
    console.log(onlineUserList);
  }, [onlineUserList]);

  useEffect(() => {
    if (props.list !== undefined) {
      let tempList = props.list;
      // console.log(props.user);
      // delete which user_id equals to props.user.user_id
      tempList = tempList.filter((i) => i.user_id !== props.user.id);
      tempList = tempList.filter((i) => i.user_id !== "Visitor");
      // tempList = tempList.filter((i) => i.is_online !== 0);

      // console.log(tempList);s
      setOnlineUserList(tempList);
    }
  }, [props.list, props.user]);

  function openUserChat(chat) {
    // searcing index of matching chatid at users
    console.log(chat);
    let userchatid = chat.user_id;
    let chatFound = false;
    props.chatList.map((item, index) => {
      if (item.chatroom == undefined) {
        console.log(item);

        if (item.away_user.user_id == userchatid) {
          console.log("found");
          chatFound = true;
          props.setActiveChatId(item.chat_id);
          return;
        }
      }
    });
    if (!chatFound) {
      console.log("not found");
      let obj = {
        isNewMessage: true,
        chat_id: "temp",
        last_message: {
          id: null,
          chat_id: null,
          from_id: props.user.id,
          to_id: chat.user_id,
          message: "",
          is_seen: "0",
          is_channel: "0",
          created_at: null,
          updated_at: null,
        },
        away_user: {
          id: null,
          user_id: chat.user_id,
          user_chat_id: userchatid,
          status: null,
          is_online: null,
          last_seen: null,
          avatar: null,
          showname: chat.showname,
          age: chat.age,
          city: chat.city,
          country: chat.country,
          role_id: chat.role_id,
          gender_id: chat.gender_id,
          created_at: null,
          updated_at: null,
          deleted_at: null,
        },
        counter: null,
        created_at: null,
        id: null,
        home_user: props.chatList[0].home_user,
        messages: {
          current_page: 1,
          data: [
            {
              id: null,
              chat_id: null,
              from_id: props.user.id,
              to_id: chat.user_id,
              message: "Send your first message.",
              is_seen: "0",
              is_channel: "0",
              created_at: null,
              updated_at: null,
            },
          ],
          first_page_url: "https://chat.spapp.click/api/chatDetail?page=1",
          from: 1,
          last_page: 1,
          last_page_url: "https://chat.spapp.click/api/chatDetail?page=1",
          next_page_url: "https://chat.spapp.click/api/chatDetail?page=1",
          path: "https://chat.spapp.click/api/chatDetail",
          per_page: 10,
          prev_page_url: null,
          to: 1,
          total: 1,
        },
        updated_at: null,
        users: null,
        users_deleted_info: null,
      };
      console.log(chat);

      console.log(obj);
      props.addNewChat(obj);
      props.setActiveChatId("temp");
    }
  }
  return (
    <React.Fragment>
      <h4 className="mb-4 px-4 ">{t("Online Users")}</h4>
      <div>
        <ScrollContainer
          id="container"
          className="px-4 pb-4 dot_remove d-flex gap-2 scrollflow w-100"
          dir="ltr"
        >
          {onlineUserList !== null &&
            onlineUserList !== undefined &&
            onlineUserList.map((user, index) => {
              return (
                <div className="item  position-relative" key={index}>
                  <Link
                    onClick={() => openUserChat(user)}
                    to="#"
                    className="user-status-box"
                  >
                    {user.avatar !== null && user.avat !== undefined ? (
                      <div className="avatar-xs mx-auto chat-user-img online">
                        <img
                          src={user.avatar}
                          alt="user-img"
                          className={`onlineuseravatar ${
                            props.mode == "dark" ? "avatarBW" : "avatarBB"
                          }`}
                          onError={() => {
                            setOnlineUserList((prevState) => {
                              let temp = prevState;
                              temp[index].avatar = null;
                              return temp;
                            });
                          }}
                        />
                        <span className="user-status"></span>
                      </div>
                    ) : (
                      <div className="avatar-xs mx-auto chat-user-img online">
                        <span
                          className={`avatar-title rounded-circle wdncolor text-white ${
                            props.mode == "dark" ? "avatarBW" : "avatarBB"
                          }`}
                        >
                          {user.showname
                            ? user.showname.charAt(0).toUpperCase()
                            : "X"}
                        </span>
                      </div>
                    )}

                    <div className="onlinew">
                      <h5 className="font-size-13 text-truncate mt-3 mb-1">
                        {user.showname ? user.showname : "No Name"}
                      </h5>
                      {user.user_id}
                    </div>
                  </Link>
                </div>
              );
            })}
        </ScrollContainer>
      </div>

      {/* end user status  */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const list = state.Chat.online_user_list;
  const mode = state.Layout.layoutMode;
  const { activeChatId } = state.Chat;
  const { user } = state.Auth;
  const { chatList } = state.Chat;

  return { list, mode, activeChatId, user, chatList };
};

export default connect(mapStateToProps, {
  setOnlineUsers,
  addLoggedinUser,
  activeUser,
  setActiveChatId,
  addNewChat,
})(OnlineUsers);
