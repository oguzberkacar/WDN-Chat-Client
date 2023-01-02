import React from "react";

import { connect } from "react-redux";

import { SocketConnetion } from "../../helpers/socket";

function SocketContainer(props) {
  if (props.user && props.user.id) {
    SocketConnetion();
  }
  return <></>;
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;

  return {
    user,
  };
};

export default connect(mapStateToProps, {})(SocketContainer);
