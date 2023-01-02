import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  Button,
  ModalFooter,
} from "reactstrap";
import { connect, ReactReduxContext } from "react-redux";
import _ from "lodash";

import SimpleBar from "simplebar-react";

import { withRouter } from "react-router-dom";
import Moment from "react-moment";

//Import Components
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import SelectContact from "../../../components/SelectContact";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";
import moment from "moment";

//actions
import {
  openUserSidebar,
  setFullUser,
  updateLastMessages,
  setchatList,
  addNewChat,
  updateChatListMessage,
  setActiveChatId,
  changeLastMessage,
  deleteChat,
  setOldMessageLoading,
  oldMessageSuccess,
  setOldMessageError,
} from "../../../redux/actions";

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from "react-i18next";

import { io } from "socket.io-client";
import {
  SendMessageToSocket,
  GetMoreMessage,
  SendChatRoomMessageToSocket,
} from "../../../helpers/socket";

function UserChat(props) {
  const ref = useRef();

  /* intilize t variable for multi language implementation */
  const { t } = useTranslation();

  const [chatMessages, setchatMessages] = useState();

  const [messages, setMessages] = useState([]);
  const [isChannel, setIsChannel] = useState(false);

  useEffect(() => {
    // if (ref.current !== undefined) {
    //   ref.current.recalculate();

    //   if (ref.current.el) {
    //     ref.current.getScrollElement().scrollTop =
    //       ref.current.getScrollElement().scrollHeight;
    //   }
    // }

    if (!isLoading) {
      console.log("scroll to bottom");
      scrolltoBottom();
    }
  }, [messages]);
  useEffect(() => {
    setIsloading(false);
  }, [messages]);

  useEffect(() => {
    console.log(props.user);
  }, [props.user]);
  useEffect(() => {
    let chatIndex = props.chatList.findIndex(
      (e) => e.chat_id == props.activeChatId
    );
    let chat = props.chatList[chatIndex];
    console.log(chat);
    if (
      chat !== undefined &&
      chat.messages !== undefined &&
      chat.chatroom == undefined
    ) {
      setIsChannel(false);
      let newM = [...chat.messages.data];
      setMessages(newM);
      setLastPage(chat.messages.last_page);
      setIsChannel(false);
    } else if (chat && chat.chatroom) {
      setIsChannel(true);
      setMessages(chat.data);
      setLastPage(chat.last_page);
    }
  }, [props.chatList, props.activeChatId]);

  const [isLoading, setIsloading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    console.log("page number changed");
    console.log(pageNum);

    if (pageNum > 1 && pageNum <= lastPage) {
      props.setOldMessageLoading();
      GetMoreMessage(pageNum);
    } else if (pageNum > lastPage) {
      setHasMore(false);
      props.setOldMessageError("No more messages");
    }
  }, [pageNum]);

  const { store } = useContext(ReactReduxContext);
  const GetMoreMessage = async (page) => {
    let user = store.getState().Auth.user;
    let chatid = store.getState().Chat.activeChatId;

    if (!isChannel) {
      await fetch(
        `https://chat.spapp.click/api/chatDetail?chat_id=${chatid}&user_id=${user.id}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          let obj = responseJson;
          let newMessages = obj.result.messages.data;
          setMessages((oldArray) => [...newMessages, ...oldArray]);
          setIsloading(true);
          props.oldMessageSuccess();
        })
        .catch((error) => {
          console.error(error);
          props.setOldMessageError(error);
        });
    } else if (isChannel) {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        `https://chat.spapp.click/api/chatRoomMessages?chat_room_chat_id=${chatid}&page=${page}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setIsloading(true);
          let obj = responseJson;
          let oldMessages = obj.result.data.reverse();
          setLastPage(obj.result.last_page);
          let copyMessages = [...messages];
          let newMessages = [...oldMessages, ...copyMessages];
          if (ref.current.el) {
            ref.current.getScrollElement().scrollTop =
              ref.current.getScrollElement().scrollTop + 200;
            console.log(ref.current.getScrollElement().scrollTop);
            console.log(ref.current.getScrollElement().scrollHeight);
          }
          console.log(newMessages);
          setMessages(newMessages);
          props.oldMessageSuccess();
        })
        .catch((error) => {
          console.error(error);
          props.setOldMessageError(error);
        });
    }
  };

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (props.oldMessageLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasMore) {
          console.log("We are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [hasMore, isLoading]
  );

  const addMessage = (message) => {
    let messageObj = {};

    let chatIndex = props.chatList.findIndex(
      (e) => e.chat_id == props.activeChatId
    );
    let chat = props.chatList[chatIndex];

    console.log(chat);

    if (chat.chatroom == undefined) {
      messageObj = {
        chat_id: chat.chat_id !== undefined ? chat.chat_id : "temp",
        created_at: Date.now(),
        from_id: props.user.id,
        id: "temp",
        is_channel: 0,
        is_seen: 0,
        message: message,
        to_id: chat.away_user.user_id,
        updated_at: Date.now(),
        current_page: "1",
        is_sendToOthers: 0,
      };
      setMessages((oldArray) => [...oldArray, messageObj]);
    } else if (chat.chatroom) {
      messageObj = {
        chat_id: chat.chat_id,
        created_at: Date.now(),
        from_id: props.user.id,
        id: "temp",
        is_channel: 0,
        is_seen: 0,
        message: message,
        updated_at: Date.now(),
        current_page: "1",
        is_sendToOthers: 0,
        chatroom: true,
        chat_room_id: chat.chat_room_id,
      };
      let newMessageArray = [messageObj];
      let copyMessagesArray = [...messages];
      let array3 = copyMessagesArray.concat(newMessageArray);
      setMessages(array3);
    }

    // console.log(orderedList);
    // setMessages(orderedList);

    // copyChat.messages.data.push(messageObj);
    // copyChat.last_message = messageObj
    let messageObjTostate = {};

    if (chat.chatroom == undefined) {
      messageObjTostate = {
        chat_id: chat.chat_id,
        created_at: null,
        from_id: props.user.id,
        id: "temp",
        is_channel: 0,
        is_seen: 0,
        message: message,
        to_id: chat.away_user.user_id,
        updated_at: null,
        current_page: "1",
        is_sendToOthers: 0,
      };
      /////// ////
      let updateData = { chat_id: chat.chat_id, message: messageObj };
      // props.addChat(updateData);

      props.updateChatListMessage(updateData);
      props.changeLastMessage(updateData);

      // send data to socket.io
      SendMessageToSocket(messageObjTostate);
      scrolltoBottom();
    } else if (chat.chatroom) {
      messageObjTostate = {
        chat_room_id: chat.chat_room_id,
        user_id: props.user.id,
        message: message,
      };

      let updateData = {
        chat_id: chat.chat_id,
        message: messageObj,
        chatroom: true,
      };

      props.updateChatListMessage(updateData);

      // send data to socket.io

      SendChatRoomMessageToSocket(messageObjTostate);
      scrolltoBottom();
    }
  };

  function scrolltoBottom() {
    if (ref.current.el) {
      ref.current.getScrollElement().scrollTop =
        ref.current.getScrollElement().scrollHeight;
    }
  }

  if (messages !== undefined) {
    if (isChannel) {
      return (
        <React.Fragment>
          <div className="user-chat w-100 ">
            <div className="d-flex ">
              <div
                className={`${
                  props.userSidebar ? "w-70" : "w-100"
                } d-flex flex-column vh-100`}
              >
                {/* render user head */}
                <UserHead deletechat={props.deleteChat} chat={messages} />

                <SimpleBar
                  style={{ maxHeight: "100%" }}
                  className="chat-conversation p-3 p-lg-4 flex-grow-1"
                  id="messages"
                >
                  {props.oldMessageLoading && (
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  )}
                  {props.oldMessageError !== null && (
                    <p className="text-center">{props.oldMessageError}</p>
                  )}
                  <ul className="list-unstyled mb-0">
                    {messages !== undefined &&
                      messages.map((chat, key) => (
                        <div key={key}>
                          {key == 0 && messages.length > 9 ? (
                            <li
                              key={key}
                              ref={lastPostRef}
                              className={
                                (props.user !== null &&
                                  chat.away_user &&
                                  chat.away_user.user_id == props.user.id) ||
                                (chat.from_id && chat.from_id == props.user.id)
                                  ? "right"
                                  : ""
                              }
                            >
                              <div className="conversation-list">
                                <div className="user-chat-content">
                                  <div className="ctext-wrap">
                                    <div
                                      className={`ctext-wrap-content ${
                                        props.user !== null &&
                                        chat.from_id !== props.user.id &&
                                        "wdncolor wdnborder"
                                      }`}
                                    >
                                      {" "}
                                      {chat.message && (
                                        <p className="mb-0">{chat.message}</p>
                                      )}
                                      <p className="chat-time mb-0">
                                        <i
                                          className={`${
                                            chat.is_sendToOthers == 0
                                              ? "ri-check-fill"
                                              : "ri-check-double-fill"
                                          } align-middle ${
                                            chat.is_seen == 1 && "text-primary"
                                          }`}
                                        ></i>
                                        <i className="ri-time-line align-middle"></i>
                                        <span className="align-middle">
                                          <Moment
                                            date={chat.created_at}
                                            format="DD-MM hh:mm"
                                          />
                                        </span>
                                      </p>
                                    </div>

                                    <UncontrolledDropdown className="align-self-start">
                                      <DropdownToggle tag="a">
                                        <i className="ri-more-2-fill wdntext1"></i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              chat.message
                                            )
                                          }
                                        >
                                          {t("Copy")}{" "}
                                          <i className="ri-file-copy-line float-end text-muted"></i>
                                        </DropdownItem>
                                        <DropdownItem
                                        // onClick={() => deleteMessage(chat.id)}
                                        >
                                          Delete{" "}
                                          <i className="ri-delete-bin-line float-end text-muted"></i>
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>

                                  <div className="conversation-name">
                                    {props.user !== null &&
                                    chat.from_id === props.user.id
                                      ? "You"
                                      : chat.name}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li
                              key={key}
                              className={
                                (props.user !== null &&
                                  chat.away_user &&
                                  chat.away_user.user_id == props.user.id) ||
                                (chat.from_id && chat.from_id == props.user.id)
                                  ? "right"
                                  : ""
                              }
                            >
                              <div className="conversation-list">
                                <div className="user-chat-content">
                                  <div className="ctext-wrap">
                                    <div
                                      className={`ctext-wrap-content ${
                                        props.user !== null &&
                                        chat.from_id !== props.user.id &&
                                        "wdncolor wdnborder"
                                      }`}
                                    >
                                      {" "}
                                      {chat.message && (
                                        <p className="mb-0">{chat.message}</p>
                                      )}
                                      <p className="chat-time mb-0">
                                        <i
                                          className={`${
                                            chat.is_sendToOthers == 0
                                              ? "ri-check-fill"
                                              : "ri-check-double-fill"
                                          } align-middle ${
                                            chat.is_seen == 1 && "text-primary"
                                          }`}
                                        ></i>
                                        <i className="ri-time-line align-middle"></i>
                                        <span className="align-middle">
                                          {chat.created_at !== null && (
                                            <Moment
                                              date={chat.created_at}
                                              format="DD-MM hh:mm"
                                            />
                                          )}
                                        </span>
                                      </p>
                                    </div>

                                    <UncontrolledDropdown className="align-self-start">
                                      <DropdownToggle tag="a">
                                        <i className="ri-more-2-fill wdntext1"></i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              chat.message
                                            )
                                          }
                                        >
                                          {t("Copy")}
                                          <i className="ri-file-copy-line float-end text-muted"></i>
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>

                                  <div className="conversation-name">
                                    {props.user !== null &&
                                    chat.from_id === props.user.id
                                      ? "You"
                                      : chat.away_user.showname +
                                        " / " +
                                        chat.away_user.age}
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}
                        </div>
                      ))}
                  </ul>
                </SimpleBar>

                <ChatInput onaddMessage={addMessage} />
              </div>

              {/* <UserProfileSidebar activeUser={props.users[props.active_user]} /> */}
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="user-chat w-100 ">
            <div className="d-flex ">
              <div
                className={`${
                  props.userSidebar ? "w-70" : "w-100"
                } d-flex flex-column vh-100`}
              >
                {/* render user head */}
                <UserHead deletechat={props.deleteChat} chat={messages} />

                <SimpleBar
                  style={{ maxHeight: "100%" }}
                  ref={ref}
                  className="chat-conversation p-3 p-lg-4 flex-grow-1 position-relative"
                  id="messages"
                >
                  {" "}
                  {props.oldMessageLoading && (
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  )}
                  {props.oldMessageError !== null && (
                    <p className="text-center">{props.oldMessageError}</p>
                  )}
                  <ul className="list-unstyled mb-0">
                    {messages !== undefined &&
                      messages.map((chat, key) => (
                        <div key={key}>
                          {key == 0 && messages.length > 9 ? (
                            <li
                              key={key}
                              ref={lastPostRef}
                              className={
                                props.user !== null &&
                                chat.from_id == props.user.id
                                  ? "right"
                                  : ""
                              }
                            >
                              <div className="conversation-list">
                                <div className="user-chat-content">
                                  <div className="ctext-wrap">
                                    <div
                                      className={`ctext-wrap-content ${
                                        props.user !== null &&
                                        chat.from_id !== props.user.id &&
                                        "wdncolor wdnborder"
                                      }`}
                                    >
                                      {" "}
                                      {chat.message && (
                                        <p className="mb-0">{chat.message}</p>
                                      )}
                                      <p className="chat-time mb-0">
                                        <i
                                          className={`${
                                            chat.is_sendToOthers == 0
                                              ? "ri-check-fill"
                                              : "ri-check-double-fill"
                                          } align-middle ${
                                            chat.is_seen == 1 && "text-primary"
                                          }`}
                                        ></i>
                                        <i className="ri-time-line align-middle"></i>
                                        <span className="align-middle">
                                          <Moment
                                            date={chat.created_at}
                                            format="DD-MM hh:mm"
                                          />
                                        </span>
                                      </p>
                                    </div>

                                    <UncontrolledDropdown className="align-self-start">
                                      <DropdownToggle tag="a">
                                        <i className="ri-more-2-fill wdntext1"></i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              chat.message
                                            )
                                          }
                                        >
                                          {t("Copy")}{" "}
                                          <i className="ri-file-copy-line float-end text-muted"></i>
                                        </DropdownItem>
                                        <DropdownItem
                                        // onClick={() => deleteMessage(chat.id)}
                                        >
                                          Delete{" "}
                                          <i className="ri-delete-bin-line float-end text-muted"></i>
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>

                                  <div className="conversation-name">
                                    {props.user !== null &&
                                    chat.from_id === props.user.id
                                      ? "You"
                                      : chat.name}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li
                              key={key}
                              className={
                                props.user !== null &&
                                chat.from_id == props.user.id
                                  ? "right"
                                  : ""
                              }
                            >
                              <div className="conversation-list">
                                <div className="user-chat-content">
                                  <div className="ctext-wrap">
                                    <div
                                      className={`ctext-wrap-content ${
                                        props.user !== null &&
                                        chat.from_id !== props.user.id &&
                                        "wdncolor wdnborder"
                                      }`}
                                    >
                                      {" "}
                                      {chat.message && (
                                        <p className="mb-0">{chat.message}</p>
                                      )}
                                      <p className="chat-time mb-0">
                                        <i
                                          className={`${
                                            chat.is_sendToOthers == 0
                                              ? "ri-check-fill"
                                              : "ri-check-double-fill"
                                          } align-middle ${
                                            chat.is_seen == 1 && "text-primary"
                                          }`}
                                        ></i>
                                        <i className="ri-time-line align-middle"></i>
                                        <span className="align-middle">
                                          {chat.created_at !== null && (
                                            <Moment
                                              date={chat.created_at}
                                              format="DD-MM hh:mm"
                                            />
                                          )}
                                        </span>
                                      </p>
                                    </div>

                                    <UncontrolledDropdown className="align-self-start">
                                      <DropdownToggle tag="a">
                                        <i className="ri-more-2-fill wdntext1"></i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              chat.message
                                            )
                                          }
                                        >
                                          {t("Copy")}
                                          <i className="ri-file-copy-line float-end text-muted"></i>
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>

                                  <div className="conversation-name">
                                    {props.user !== null &&
                                    chat.from_id === props.user.id
                                      ? "You"
                                      : chat.showname}
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}
                        </div>
                      ))}
                  </ul>
                </SimpleBar>

                <ChatInput onaddMessage={addMessage} />
              </div>

              {/* <UserProfileSidebar activeUser={props.users[props.active_user]} /> */}
            </div>
          </div>
        </React.Fragment>
      );
    }
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center my-3 vh-100 vw-100">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { active_user } = state.Chat;
  const { userSidebar } = state.Layout;
  const { user } = state.Auth;
  const { users } = state.Chat;
  const lasmessages = state.Chat.lasmessages;
  const { chatList } = state.Chat;
  const { activeChatId } = state.Chat;
  const { oldMessageLoading } = state.Chat;
  const { oldMessageError } = state.Chat;

  return {
    active_user,
    userSidebar,
    user,
    users,
    lasmessages,
    chatList,
    activeChatId,
    oldMessageLoading,
    oldMessageError,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    openUserSidebar,
    setFullUser,
    updateLastMessages,
    setchatList,
    addNewChat,
    updateChatListMessage,
    setActiveChatId,
    changeLastMessage,
    deleteChat,
    setOldMessageLoading,
    oldMessageSuccess,
    setOldMessageError,
  })(UserChat)
);
