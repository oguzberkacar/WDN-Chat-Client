import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  openUserSidebar,
  setFullUser,
  activeUser,
  updateLastMessages,
  deleteChat,
  setActiveChatId,
} from "../../../redux/actions";

//import images
import user from "../../../assets/images/users/avatar-4.jpg";
import { ChangeTheActiveUser } from "../../../helpers/socket";
import Moment from "react-moment";

function UserHead(props) {
  let isUserLoggedIn = props.user == null ? false : true;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [Callmodal, setCallModal] = useState(false);
  const [Videomodal, setVideoModal] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
  const toggleCallModal = () => setCallModal(!Callmodal);
  const toggleVideoModal = () => setVideoModal(!Videomodal);

  const openUserSidebar = (e) => {
    e.preventDefault();
    if (isUserLoggedIn) {
      props.openUserSidebar();
    }
  };

  function closeUserChat(e) {
    e.preventDefault();

    var userChat = document.getElementsByClassName("user-chat");
    if (userChat) {
      userChat[0].classList.remove("user-chat-show");
    }
  }

  async function deletechat(e) {
    e.preventDefault();
    props.deleteChat(props.activeChatId);

    let chatIndex = props.chatList.findIndex(
      (e) => e.chat_id == props.activeChatId
    );

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
    if (chatIndex == 0) {
      props.setActiveChatId(props.chatList[1].chat_id);
    } else {
      props.setActiveChatId(props.chatList[0].chat_id);
    }
  }

  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [age, setAge] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [lastSeen, setLastSeen] = useState();
  const [online, setOnline] = useState();
  const [isGroup, setIsgroup] = useState(false);
  useEffect(() => {
    if (props.chatList !== undefined) {
      let chatIndex = props.chatList.findIndex(
        (e) => e.chat_id == props.activeChatId
      );
      let chat = props.chatList[chatIndex];
      if (chat !== undefined && chat.chatroom == undefined) {
        console.log(chat);
        setName(chat.away_user.showname);
        setAvatar(chat.away_user.avatar);
        setAge(chat.away_user.age);
        setCountry(chat.away_user.country.toUpperCase());
        setCity(chat.away_user.city.toUpperCase());
        setLastSeen(chat.away_user.last_seen);
        setOnline(chat.away_user.is_online);
      } else if (chat && chat.chatroom) {
        setName(chat.showname);
        setAvatar(null);
        setAge(null);
        setCountry(null);
        setCity(null);
        setIsgroup(true);
      }
    }
  }, [props.chatList, props.activeChatId]);

  return (
    <React.Fragment>
      <div className="p-3 p-lg-4 border-bottom">
        <Row className="align-items-center">
          <Col sm={8} xs={8}>
            <div className="d-flex align-items-center">
              <div className="d-block d-lg-none me-2 ms-0">
                <Link
                  to="#"
                  onClick={(e) => closeUserChat(e)}
                  className="user-chat-remove text-muted font-size-16 p-2"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </Link>
              </div>
              {isUserLoggedIn && (
                <div>
                  {avatar !== null ? (
                    <div className="me-3 ms-0">
                      <img
                        src={avatar}
                        className="rounded-circle avatar-xs"
                        alt=""
                        onError={() => {
                          setAvatar(null);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="chat-user-img align-self-center me-3">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle wdncolor text-white">
                          {name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex-grow-1 overflow-hidden">
                <h5 className="font-size-16 mb-0 text-truncate">
                  <Link
                    id="profile-receiver"
                    to="#"
                    className="text-reset user-profile-show pb-2"
                  >
                    <p className="p-0 m-0 d-flex justify-items-center align-items-cente gap-2">
                      {name}
                      {!isGroup && (
                        <>
                          {country !== "NULL" &&
                          country !== undefined &&
                          country !== null ? (
                            <i className="ri-user-star-line"></i>
                          ) : (
                            <i className="ri-user-line"></i>
                          )}
                        </>
                      )}
                    </p>
                  </Link>
                  {!isUserLoggedIn && (
                    <UncontrolledTooltip
                      target="profile-receiver"
                      placement="bottom-start"
                    >
                      Please login to see profile
                    </UncontrolledTooltip>
                  )}
                </h5>
                {isUserLoggedIn && !isGroup && (
                  <span className="text-muted mb-0 ">
                    {age !== null ||
                      (age !== "NULL" && <p className="m-0">Age: {age}</p>)}
                    {city !== "NULL" && country !== "NULL" && (
                      <p className="m-0">
                        Location: {city} {city && "/"} {country}
                      </p>
                    )}
                    {online !== undefined && online !== null && online == 1 ? (
                      <p className="p-0 m-0 text-primary">Online</p>
                    ) : (
                      <div>
                        {lastSeen !== undefined && lastSeen !== null && (
                          <div className="d-flex justify-items-center align-items-center">
                            <p className="m-0 p-0">
                              Last Seen:{" "}
                              <Moment date={lastSeen} format="DD/MM hh:mm" />
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </span>
                )}
              </div>
            </div>
          </Col>
          {isUserLoggedIn && (
            <Col sm={4} xs={4}>
              <ul className="list-inline user-chat-nav text-end mb-0">
                <li className="list-inline-item">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      color="none"
                      className="btn nav-btn "
                      type="button"
                    >
                      <i className="ri-search-line"></i>
                    </DropdownToggle>
                    <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-md">
                      <div className="search-box p-2">
                        <Input
                          type="text"
                          className="form-control bg-light border-0"
                          placeholder="Search.."
                        />
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </li>

                <li className="list-inline-item">
                  <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                    <DropdownToggle
                      className="btn nav-btn "
                      color="none"
                      type="button"
                    >
                      <i className="ri-more-fill"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      {/* <DropdownItem
                        className="d-block d-lg-none user-profile-show"
                        onClick={(e) => openUserSidebar(e)}
                      >
                        View profile{" "}
                        <i className="ri-user-2-line float-end text-muted"></i>
                      </DropdownItem> */}
                      {/* <DropdownItem>Archive <i className="ri-archive-line float-end text-muted"></i></DropdownItem> */}
                      {/* <DropdownItem>Muted <i className="ri-volume-mute-line float-end text-muted"></i></DropdownItem> */}
                      <DropdownItem onClick={(e) => deletechat(e)}>
                        Delete
                        <i className="ri-delete-bin-line float-end text-muted"></i>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              </ul>
            </Col>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const { chatList } = state.Chat;
  const { activeChatId } = state.Chat;

  return {
    ...state.Layout,
    user,
    chatList,
    activeChatId,
  };
};

export default connect(mapStateToProps, {
  openUserSidebar,
  setFullUser,
  activeUser,
  updateLastMessages,
  deleteChat,
  setActiveChatId,
})(UserHead);
