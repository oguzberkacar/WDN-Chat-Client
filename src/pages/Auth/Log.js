import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, withRouter } from "react-router-dom";
import { getUser } from "../../redux/actions";

//redux store

/**
 * Logouts the user
 * @param {*} props
 */
const Log = (props) => {
  const location = useLocation();
  let pathlegnt = location.pathname.length;
  const tokenFromPath = location.pathname.slice(11, pathlegnt);
  const token = Cookies.get("access_token");
  if (token == undefined && tokenFromPath.length != 320) {
    console.log("token is not undefined in cookies");
    props.history.push("/dashboard");
  } else if (token == undefined && tokenFromPath.length == 320) {
    console.log("1");
    Cookies.set("access_token", tokenFromPath, { expires: 1 });
    props.history.push("/dashboard");
  }
  return (
    <React.Fragment>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const { layoutMode } = state.Layout.layoutMode;
  return { user, layoutMode };
};

export default withRouter(connect(mapStateToProps, { getUser })(Log));
