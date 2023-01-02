import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  Button,
  UncontrolledDropdown,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

import SimpleBar from "simplebar-react";

//Import components
import CustomCollapse from "../../../components/CustomCollapse";

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

function Settings(props) {
  useEffect(() => {
    // console.log(props);
  }, [props.user]);

  let user = props.user !== null ? props.user : null;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  /* intilize t variable for multi language implementation */
  const { t } = useTranslation();

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
  };

  const toggleCollapse2 = () => {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
    setIsOpen3(false);
    setIsOpen4(false);
  };

  const toggleCollapse3 = () => {
    setIsOpen3(!isOpen3);
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen4(false);
  };

  const toggleCollapse4 = () => {
    setIsOpen4(!isOpen4);
    setIsOpen1(false);
    setIsOpen3(false);
    setIsOpen2(false);
  };

  const toggle = () => setDropdownOpen(!dropdownOpen);

  function resetAvatar() {
    user.avatar = "";
  }



  let layoutMode = localStorage.getItem("layoutMode");

  return (
    <React.Fragment>
      <div>
        <div className="px-4 pt-4">
          <h4 className="mb-0">{t("Settings")}</h4>
        </div>

        <div className="text-center border-bottom p-4">
          <div className="mb-4 profile-user">
            {user && user.avatar ? (
              <img
                src={user.avatar}
                style={{ objectFit: "cover" }}
                className="rounded-circle avatar-lg img-thumbnail"
                alt="Profile Picture"
                onError={() => {
                  resetAvatar();
                }}
              />
            ) : (
              <i
                style={{ fontSize: "4rem" }}
                className={`ri-image-line border  rounded-circle p-4 ${
                  layoutMode == "light"
                    ? "text-dark border-dark"
                    : "text-white border-white"
                }`}
              ></i>
            )}

            <Button
              type="button"
              color="light"
              className="avatar-xs p-0 rounded-circle profile-photo-edit"
            >
              <i className="ri-pencil-fill"></i>
            </Button>
          </div>

          <h5 className="font-size-16 mb-1 text-truncate">
            {user ? user.username : null}
          </h5>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="d-inline-block mb-1"
          >
            <DropdownToggle tag="a" className="text-muted pb-1 d-block">
              {t("Available")} <i className="mdi mdi-chevron-down"></i>
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem>{t("Available")}</DropdownItem>
              <DropdownItem>{t("Busy")}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* End profile user */}

        {/* Start User profile description */}
        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="p-4 user-profile-desc"
        >
          <div id="profile-setting-accordion" className="custom-accordion">
            <Card className="shadow-none border mb-2">
              <CustomCollapse
                title="Personal Info"
                isOpen={isOpen1}
                toggleCollapse={toggleCollapse1}
              >
                <div className="float-end">
                  <Button color="light" size="sm" type="button">
                    <i className="ri-edit-fill me-1 align-middle"></i>{" "}
                    {t("Edit")}
                  </Button>
                </div>

                <div>
                  <p className="text-muted mb-1">{t("Name")}</p>
                  <h5 className="font-size-14">
                    {user ? user.username : null}
                  </h5>
                </div>

                {user && user.ads ? (
                  <>
                    <div className="mt-4">
                      <p className="text-muted mb-1">{t("Country")}</p>
                      <h5 className="font-size-14">
                        {user ? user.country : null}
                      </h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">{t("City")}</p>
                      <h5 className="font-size-14">
                        {user ? user.city : null}
                      </h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">{t("Age")}</p>
                      <h5 className="font-size-14 mb-0">
                        {user ? user.age : null}
                      </h5>
                    </div>
                  </>
                ) : (
                  <h5 className="my-5">There is no ads in your account.</h5>
                )}
              </CustomCollapse>
            </Card>
            {/* end profile card */}

            <Card className="shadow-none border mb-2">
              <CustomCollapse
                title="Privacy"
                isOpen={isOpen2}
                toggleCollapse={toggleCollapse2}
              >
                <div className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Profile photo")}
                      </h5>
                    </div>
                    <UncontrolledDropdown className="ms-2">
                      <DropdownToggle
                        className="btn btn-light btn-sm w-sm"
                        tag="button"
                      >
                        {t("Everyone")} <i className="mdi mdi-chevron-down"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>{t("Everyone")}</DropdownItem>
                        <DropdownItem>{t("selected")}</DropdownItem>
                        <DropdownItem>{t("Nobody")}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Last seen")}
                      </h5>
                    </div>
                    <div className="ms-2">
                      <div className="form-check form-switch">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="privacy-lastseenSwitch"
                          defaultChecked
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="privacy-lastseenSwitch"
                        ></Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Status")}
                      </h5>
                    </div>
                    <UncontrolledDropdown className="ms-2">
                      <DropdownToggle
                        className="btn btn-light btn-sm w-sm"
                        tag="button"
                      >
                        {t("Everyone")} <i className="mdi mdi-chevron-down"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>{t("Everyone")}</DropdownItem>
                        <DropdownItem>{t("selected")}</DropdownItem>
                        <DropdownItem>{t("Nobody")}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>

                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Read receipts")}
                      </h5>
                    </div>
                    <div className="ms-2">
                      <div className="form-check form-switch">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="privacy-readreceiptSwitch"
                          defaultChecked
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="privacy-readreceiptSwitch"
                        ></Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Groups")}
                      </h5>
                    </div>
                    <UncontrolledDropdown className="ms-2">
                      <DropdownToggle
                        className="btn btn-light btn-sm w-sm"
                        tag="button"
                      >
                        {t("Everyone")} <i className="mdi mdi-chevron-down"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>{t("Everyone")}</DropdownItem>
                        <DropdownItem>{t("selected")}</DropdownItem>
                        <DropdownItem>{t("Nobody")}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </CustomCollapse>
            </Card>
            {/* end Privacy card */}

            <Card className="accordion-item border mb-2">
              <CustomCollapse
                title="Security"
                isOpen={isOpen3}
                toggleCollapse={toggleCollapse3}
              >
                <div>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Show security notification")}
                      </h5>
                    </div>
                    <div className="ms-2 me-0">
                      <div className="form-check form-switch">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="security-notificationswitch"
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="security-notificationswitch"
                        ></Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomCollapse>
            </Card>
            {/* end Security card */}

            <Card className="shadow-none border mb-2">
              <CustomCollapse
                title="Help"
                isOpen={isOpen4}
                toggleCollapse={toggleCollapse4}
              >
                <div>
                  <div className="py-3">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        {t("FAQs")}
                      </Link>
                    </h5>
                  </div>
                  <div className="py-3 border-top">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        {t("Contact")}
                      </Link>
                    </h5>
                  </div>
                  <div className="py-3 border-top">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        {t("Terms & Privacy policy")}
                      </Link>
                    </h5>
                  </div>
                </div>
              </CustomCollapse>
            </Card>
            {/* end Help card */}
          </div>
          {/* end profile-setting-accordion */}
        </SimpleBar>
        {/* End User profile description */}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const { layoutMode } = state.Layout.layoutMode;
  return { user, layoutMode };
};

export default connect(mapStateToProps)(Settings);
