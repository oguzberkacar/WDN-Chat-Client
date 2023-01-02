import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import classnames from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";

import { setActiveTab, changeLayoutMode } from "../../redux/actions";

//Import Images
import logo from "../../assets/images/logo.png";
import avatar1 from "../../assets/images/users/avatar-1.jpg";

//i18n
import i18n from "../../i18n";

// falgs
import usFlag from "../../assets/images/flags/us.jpg";
import spain from "../../assets/images/flags/spain.jpg";
import germany from "../../assets/images/flags/germany.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import russia from "../../assets/images/flags/russia.jpg";

import Cookies from "js-cookie";

function LeftSidebarMenu(props) {
  const dispatch = useDispatch();
  const { layoutMode } = useSelector((state) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  const mode = layoutMode === "dark" ? "light" : "dark";

  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);

  const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
  const [lng, setlng] = useState("English");

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
  const toggle3 = () => setDropdownOpen3(!dropdownOpen3);

  const toggleMobile = () => setDropdownOpenMobile(!dropdownOpenMobile);

  const toggleTab = (tab) => {
    props.setActiveTab(tab);
  };

  const token = Cookies.get("access_token");
  let isUserLoggedIn = props.user == null ? false : true;


  let activeTab = props.activeTab;

  /* changes language according to clicked language menu item */
  const changeLanguageAction = (lng) => {
    /* set the selected language to i18n */
    i18n.changeLanguage(lng);

    if (lng === "sp") setlng("Spanish");
    else if (lng === "gr") setlng("German");
    else if (lng === "rs") setlng("Russian");
    else if (lng === "it") setlng("Italian");
    else if (lng === "eng") setlng("English");
  };

  if (props.loading) {
    return (
    <></>
    );
  } else {
    
  return (
    <React.Fragment>
      <div className="side-menu flex-lg-column me-lg-1">
        {/* LOGO */}
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="logo" height="30" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logo} alt="logo" height="30" />
            </span>
          </Link>
        </div>
        {/* end navbar-brand-box  */}

        {/* Start side-menu nav */}
        <div className="flex-lg-column my-auto">
          <Nav
            pills
            className="side-menu-nav justify-content-center"
            role="tablist"
          >
            {isUserLoggedIn && (
              <>
                <NavItem id="profile">
                  <NavLink
                    id="pills-user-tab"
                    className={classnames({ active: activeTab === "profile" })}
                    onClick={() => {
                      toggleTab("profile");
                    }}
                  >
                    <i className="ri-user-2-line"></i>
                  </NavLink>
                </NavItem>

                <UncontrolledTooltip target="profile" placement="top">
                  Profile
                </UncontrolledTooltip>
              </>
            )}
            <NavItem id="Chats">
              <NavLink
                id="pills-chat-tab"
                className={classnames({ active: activeTab === "chat" })}
                onClick={() => {
                  toggleTab("chat");
                }}
              >
                <i className="ri-message-3-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="Chats" placement="top">
              Chats
            </UncontrolledTooltip>
            <NavItem id="Groups">
              <NavLink
                id="pills-groups-tab"
                className={classnames({ active: activeTab === "group" })}
                onClick={() => {
                  toggleTab("group");
                }}
              >
                <i className="ri-group-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="Groups" placement="top">
              Chat Rooms
            </UncontrolledTooltip>

            {isUserLoggedIn && (
              <>
                <NavItem id="Contacts">
                  <NavLink
                    id="pills-contacts-tab"
                    className={classnames({ active: activeTab === "contacts" })}
                    onClick={() => {
                      toggleTab("contacts");
                    }}
                  >
                    <i className="ri-contacts-line"></i>
                  </NavLink>
                </NavItem>
                <UncontrolledTooltip target="Contacts" placement="top">
                  Followers
                </UncontrolledTooltip>

                <NavItem className="d-none d-lg-block" id="Settings">
                  <NavLink
                    id="pills-setting-tab"
                    className={classnames({
                      active: activeTab === "settings",
                    })}
                    onClick={() => {
                      toggleTab("settings");
                    }}
                  >
                    <i className="ri-settings-2-line"></i>
                  </NavLink>
                </NavItem>
                <UncontrolledTooltip target="Settings" placement="top">
                  Settings
                </UncontrolledTooltip>
              </>
            )}

            {!isUserLoggedIn && (
              <li className="nav-item  d-flex justify-content-center align-items-center">
                <a
                  className=" d-flex flex-row flex-lg-column justify-content-center align-items-center gap-2"
                  href={isUserLoggedIn ? "/logout" : "/login"}
                >
                  <i
                    className={`ri-logout-circle${
                      !isUserLoggedIn ? "-r" : ""
                    }-line text-muted order-2 order-lg-1`}
                  ></i>
                  <p
                    className="text-white order-1 order-lg-2"
                    style={{ fontSize: ".75rem", marginBottom: "0" }}
                  >
                    {isUserLoggedIn ? "Logout" : "Login"}
                  </p>
                </a>
              </li>
            )}

            <Dropdown
              nav
              isOpen={dropdownOpen3}
              className="btn-group dropup profile-user-dropdown nav-item d-lg-none"
              toggle={toggle3}
            >
              <DropdownToggle nav>
                <i className="ri-global-line"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-translate-lang">
                <DropdownItem
                  onClick={() => changeLanguageAction("eng")}
                  active={lng === "English"}
                >
                  <img src={usFlag} alt="user" className="me-1" height="12" />{" "}
                  <span className="align-middle">English</span>
                </DropdownItem>

                <DropdownItem
                  onClick={() => changeLanguageAction("sp")}
                  active={lng === "Spanish"}
                >
                  <img src={spain} alt="user" className="me-1" height="12" />{" "}
                  <span className="align-middle">Spanish</span>
                </DropdownItem>

                <DropdownItem
                  onClick={() => changeLanguageAction("gr")}
                  active={lng === "German"}
                >
                  <img src={germany} alt="user" className="me-1" height="12" />{" "}
                  <span className="align-middle">German</span>
                </DropdownItem>

                <DropdownItem
                  onClick={() => changeLanguageAction("it")}
                  active={lng === "Italian"}
                >
                  <img src={italy} alt="user" className="me-1" height="12" />{" "}
                  <span className="align-middle">Italian</span>
                </DropdownItem>

                <DropdownItem
                  onClick={() => changeLanguageAction("rs")}
                  active={lng === "Russian"}
                >
                  <img src={russia} alt="user" className="me-1" height="12" />{" "}
                  <span className="align-middle">Russian</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <>
              <Dropdown
                nav
                isOpen={dropdownOpen}
                className="nav-item btn-group dropup profile-user-dropdown d-lg-none"
                toggle={toggle}
              >
                <DropdownToggle className="nav-link" tag="a">
                  <i className="ri-align-justify"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-translate-set">
                  <DropdownItem
                    id="light-dark"
                    onClick={() => onChangeLayoutMode(mode)}
                  >
                    {mode == "light" ? "Light Mode" : "Dark Mode"}
                    <i className="ri-sun-line theme-mode-icon float-end text-muted"></i>
                  </DropdownItem>

                  <DropdownItem divider />

                  <DropdownItem
                    onClick={() => {
                      toggleTab("settings");
                    }}
                  >
                    Setting
                    <i className="ri-settings-3-line float-end text-muted"></i>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/logout">
                    Log out
                    <i className="ri-logout-circle-r-line float-end text-muted"></i>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          </Nav>
        </div>
        {/* end side-menu nav */}

        <div className="flex-lg-column d-none d-lg-block">
          <Nav className="side-menu-nav justify-content-center">
            <div className="d-lg-block d-none">
              <Dropdown
                nav
                isOpen={dropdownOpen2}
                className="btn-group dropup profile-user-dropdown"
                toggle={toggle2}
              >
                <DropdownToggle nav>
                  <i className="ri-global-line"></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => changeLanguageAction("eng")}
                    active={lng === "English"}
                  >
                    <img src={usFlag} alt="user" className="me-1" height="12" />{" "}
                    <span className="align-middle">English</span>
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => changeLanguageAction("sp")}
                    active={lng === "Spanish"}
                  >
                    <img src={spain} alt="user" className="me-1" height="12" />{" "}
                    <span className="align-middle">Spanish</span>
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => changeLanguageAction("gr")}
                    active={lng === "German"}
                  >
                    <img
                      src={germany}
                      alt="user"
                      className="me-1"
                      height="12"
                    />{" "}
                    <span className="align-middle">German</span>
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => changeLanguageAction("it")}
                    active={lng === "Italian"}
                  >
                    <img src={italy} alt="user" className="me-1" height="12" />{" "}
                    <span className="align-middle">Italian</span>
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => changeLanguageAction("rs")}
                    active={lng === "Russian"}
                  >
                    <img src={russia} alt="user" className="me-1" height="12" />{" "}
                    <span className="align-middle">Russian</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <li className="nav-item">
                <NavLink
                  id="light-dark"
                  onClick={() => onChangeLayoutMode(mode)}
                >
                  <i className="ri-sun-line theme-mode-icon"></i>
                </NavLink>
                <UncontrolledTooltip target="light-dark" placement="right">
                  Dark / Light Mode
                </UncontrolledTooltip>
              </li>

              {isUserLoggedIn && (
                <li className="nav-item">
                  <a
                    className=" d-flex flex-row flex-lg-column justify-content-center align-items-center gap-2"
                    href="/logout"
                  >
                    <i
                                          style={{ fontSize: "1.5rem", marginBottom: "0" }}

                      className={`ri-logout-circle-line text-muted order-2 order-lg-1`}
                    ></i>
                    <p
                      className="text-white order-1 order-lg-1 mb-2"
                      style={{ fontSize: ".75rem", marginBottom: "0" }}
                    >
                      Logout
                    </p>
                  </a>
                </li>
              )}
            </div>
          </Nav>
        </div>
        {/* Side menu user */}
      </div>
    </React.Fragment>
  );
  }

}

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const { loading } = state.Auth;

  const { layoutMode } = state.Layout.layoutMode;
  return { user, layoutMode,loading };
};

export default withRouter(
  connect(mapStateToProps, {
    setActiveTab,
  })(LeftSidebarMenu)
);
