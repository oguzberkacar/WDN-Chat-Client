import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//simplebar
import SimpleBar from "simplebar-react";
import InfiniteScroll from "react-infinite-scroll-component";
//actions
import {
  setconversationNameInOpenChat,
  activeUser,
  updateLastMessages,
  setFullUser,
  addLoggedinUser,
  setActiveChatId,
} from "../../../redux/actions";

//components
import OnlineUsers from "./OnlineUsers";
import { t } from "i18next";
import Moment from "react-moment";

function Chats(props) {
  const [state, setState] = useState([]);
  // const [search, setsearch] = useState("");
  // const [searchResult, setsearchResult] = useState([]);
  // const [recentChatList, setRecentChatList] = useState(props.recentChatList);
  // const [listLenght, setListLenght] = useState(8);
  // useEffect(() => {
  //   setState(props);
  // }, [props]);

  const [AllLastMessages, setAllLastMessages] = useState([]);

  useEffect(() => {
    console.log("props.chatList", props.chatList);

    // props.chatList.map((item, index) => {
    //   setAllLastMessages(item);
    // });
    console.log("AllLastMessages", AllLastMessages);

    setAllLastMessages(props.chatList);

    // props.chatList.map((item, index) => {
    //   setMessages(item);
    // });
  }, [props.chatList]);

  useEffect(() => {}, [AllLastMessages]);

  const url = "https://chat.spapp.click/api";

  function handleChange(e) {
    setState({ searchChat: e.target.value });
    var search = e.target.value;
    let conversation = state.recentChatList;
    let filteredArray = [];

    //find conversation name from array
    for (let i = 0; i < conversation.length; i++) {
      if (
        conversation[i].name.toLowerCase().includes(search) ||
        conversation[i].name.toUpperCase().includes(search)
      )
        filteredArray.push(conversation[i]);
    }

    //set filtered items to state
    setState({ recentChatList: filteredArray });

    //if input value is blanck then assign whole recent chatlist to array
    if (search === "") setState({ recentChatList: props.recentChatList });
  }

  function openUserChat(e, chat) {
    e.preventDefault();
    //set active chat id
    props.setActiveChatId(chat);

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

    // activation of clicked coversation user
    if (currentli) {
      currentli.classList.add("active");
    }

    var userChat = document.getElementsByClassName("user-chat");
    if (userChat) {
      userChat[0].classList.add("user-chat-show");
    }

    // //removes unread badge if user clicks
    // var unread = document.getElementById("unRead" + chat.id);
    // if (unread) {
    //   unread.style.display = "none";
    // }
  }

  const cutList = (i) => {
    let newList = props.recentChatList.slice(0, i);
    // set new list to state.recentChatlist
    setState({ recentChatList: newList });
  };

  let isUserLoggedIn = props.user == null ? false : true;

  return (
    <React.Fragment>
      <div>
        <div className="px-4 pt-4">
          {/* Needs Translate */}
          <h4 className="mb-4">{t("Chat")}</h4>
          {isUserLoggedIn && (
            <div className="search-box chat-search-box">
              <InputGroup size="lg" className="mb-3 rounded-lg">
                <span
                  className="input-group-text text-muted bg-light pe-1 ps-3"
                  id="basic-addon1"
                >
                  <i className="ri-search-line search-icon font-size-18"></i>
                </span>
                {/* Needs Translate */}
                {/* Placeholder */}
                <Input
                  type="text"
                  value={state.searchChat}
                  onChange={(e) => handleChange(e)}
                  className="form-control bg-light"
                  placeholder="Search messages or users"
                />
              </InputGroup>
            </div>
          )}
          {/* Search Box */}
        </div>

        {/* online users */}
        <OnlineUsers />

        <div className="px-2">
          {/* Needs Translate */}
          <h5 className="mb-3 px-3 font-size-16">{t("Messages")}</h5>
          {isUserLoggedIn ? (
            <ul
              className="list-unstyled chat-list chat-user-list"
              id="chat-list"
            >
              {AllLastMessages !== null &&
                AllLastMessages.map((chat, key) => {
                  {
                  }
                  if (
                    AllLastMessages.length === key + 1 &&
                    key > 9 &&
                    chat.chatroom == undefined
                  ) {
                    return (
                      <li
                        // ref={lastPostRef}
                        key={key}
                        id={"conversation13223" + key}
                        className={
                          chat.chat_id === props.activeChatId ? "active" : ""
                        }
                      >
                        <Link
                          to="#"
                          onClick={(e) => openUserChat(e, chat.chat_id)}
                        >
                          <div className="d-flex">
                            {chat.away_user.avatar === null ? (
                              <div
                                className={
                                  "chat-user-img " +
                                  " align-self-center me-3 ms-0"
                                }
                              >
                                <div className="avatar-xs">
                                  <span className="avatar-title rounded-circle wdncolor text-white">
                                    {chat.away_user.showname
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                </div>
                                {chat.status && (
                                  <span className="user-status"></span>
                                )}
                              </div>
                            ) : (
                              <div
                                className={
                                  "chat-user-img " +
                                  " align-self-center me-3 ms-0"
                                }
                              >
                                <div className="avatar-xs">
                                  <img
                                    src={chat.away_user.avatar}
                                    alt=""
                                    className="rounded-circle onlineuseravatar"
                                    onError={() => {
                                      let copy = [...AllLastMessages];
                                      copy[key].away_user.avatar = null;
                                      setAllLastMessages(copy);
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex-grow-1 overflow-hidden">
                              <h5 className="text-truncate font-size-15 mb-1">
                                {chat.away_user.showname}
                              </h5>
                              <p className="chat-user-message text-truncate mb-0">
                                {chat.last_message.message}
                              </p>
                            </div>
                            <div className="font-size-11 d-flex justify-content-center align-items-center">
                              <Moment
                                date={chat.last_message_time}
                                format="hh:mm"
                              />
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  } else if (chat.chatroom == undefined) {
                    return (
                      <li
                        key={key}
                        id={"conversation" + key}
                        className={
                          chat.chat_id === props.activeChatId ? "active" : ""
                        }
                      >
                        <Link
                          to="#"
                          onClick={(e) => openUserChat(e, chat.chat_id)}
                        >
                          <div className="d-flex">
                            {chat.away_user.avatar === null ? (
                              <div
                                className={
                                  "chat-user-img " +
                                  " align-self-center me-3 ms-0"
                                }
                              >
                                <div className="avatar-xs">
                                  <span className="avatar-title rounded-circle wdncolor text-white">
                                    {chat.away_user.showname
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                </div>
                                {chat.status && (
                                  <span className="user-status"></span>
                                )}
                              </div>
                            ) : (
                              <div
                                className={
                                  "chat-user-img " +
                                  " align-self-center me-3 ms-0"
                                }
                              >
                                <div className="avatar-xs">
                                  <img
                                    src={chat.away_user.avatar}
                                    alt=""
                                    className="rounded-circle onlineuseravatar"
                                    onError={() => {
                                      let copy = [...AllLastMessages];
                                      copy[key].away_user.avatar = null;
                                      setAllLastMessages(copy);
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex-grow-1 overflow-hidden">
                              <h5 className="text-truncate font-size-15 mb-1">
                                {chat.away_user.showname}
                              </h5>
                              <p className="chat-user-message text-truncate mb-0">
                                {chat.last_message.message}
                              </p>
                            </div>
                            <div className="font-size-11 d-flex justify-content-center align-items-center">
                              <Moment
                                date={chat.last_message_time}
                                format="hh:mm"
                              />
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  }
                })}
            </ul>
          ) : (
            <div>
              <div className="text-center mt-4">
                <h4 className="mb-4">Please Login to see your chats</h4>
                <a href="/login" className="btn btn-primary">
                  Login
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { active_user } = state.Chat;
  const { users } = state.Chat;
  const { user } = state.Auth;
  const lasmessages = state.Chat.lasmessages;
  const list = state.Chat.online_user_list;
  const { activeChatId } = state.Chat;
  const { chatList } = state.Chat;

  return {
    active_user,
    user,
    users,
    lasmessages,
    list,
    chatList,
    activeChatId,
  };
};

export default connect(mapStateToProps, {
  setconversationNameInOpenChat,
  activeUser,
  updateLastMessages,
  setFullUser,
  addLoggedinUser,
  setActiveChatId,
})(Chats);
