import React, { useEffect, useRef, useState } from "react";

//i18n
import { useTranslation } from "react-i18next";

import { connect } from "react-redux";
import { getUser } from "../../../redux/actions";

function Profile(props) {
  const { t } = useTranslation();

  const [isloading, setIsloading] = useState(true);
  const [display, setDisplay] = useState();

  useEffect(() => {
    if (props.user !== null && props.user !== undefined) {
     
      setDisplay(props.user)
    }
  }, [props.user]);

  useEffect(() => {
    if (display !== undefined && display !==null) {
    
      if (Object.values(display).length > 9) {
        setIsloading(false);
      }
    }
  }, [display]);

  let layoutMode = localStorage.getItem("layoutMode");

  return (
    <React.Fragment>
      {isloading ? (
        <div className="d-flex justify-content-center align-items-center my-3 vh-100">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div>
        <div className="px-4 pt-4">
      
          <h4 className="mb-0">{t("My Profile")}</h4>
        </div>

        <div className="text-center p-4 border-bottom">
          <div className="mb-4">
            {display && display.avatar !== "" && display.avatar !== null && display.avatar !== undefined ? (
              <img
                src={display.avatar}
                style={{ objectFit: "cover" }}
                className="rounded-circle avatar-lg img-thumbnail"
                onError={() => {
                  setDisplay({ ...display, avatar: null });
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
          </div>

          <h5 className="font-size-16 mb-1 text-truncate">{display !== null ? (display.username): 'Username'}</h5>
          <p className="text-muted text-truncate mb-1">
            <i className="ri-record-circle-fill font-size-10 text-success me-1 d-inline-block"></i>{" "}
            {t("Active")}
          </p>
        </div>
        {/* End profile user  */}

        {/* Start user-profile-desc */}
        <div className="p-4 user-profile-desc">
          <div className="text-muted">
            <p className="mb-4">
              {/* Needs Translate */}
              {t(
                "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual."
              )}
            </p>
          </div>
          <div>
            {/* Needs Translate */}
            <h5 className="font-size-14">{t("Showname")}</h5>
            <p>{display !== null && display.username}</p>
          </div>

          {display && display.ads == true ? (
            <div>
              <div>
                {/* Needs Translate */}
                <h5 className="font-size-14">{t("Country")}</h5>
                <p>{display.country}</p>
              </div>
              <div>
                {/* Needs Translate */}
                <h5 className="font-size-14">{t("City")}</h5>
                <p>{display.city}</p>
              </div>
              <div>
                {/* Needs Translate */}
                <h5 className="font-size-14">{t("Age")}</h5>
                <p>{display.age}</p>
              </div>
            </div>
          ) : (
            <h2 className="text-center my-4">
              {/* Needs Translate */}
              {t("There is no ads in this profile")}
            </h2>
          )}

        </div>
      </div>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const { layoutMode } = state.Layout.layoutMode;
  return { user, layoutMode };
};

export default connect(mapStateToProps, getUser)(Profile);
