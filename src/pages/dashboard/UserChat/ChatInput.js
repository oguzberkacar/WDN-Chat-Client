import React, { useState } from "react";
import {
  Button,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  Form,
} from "reactstrap";
import Picker from "emoji-picker-react";
import { connect } from "react-redux";

function ChatInput(props) {
  let isUserLoggedIn = props.user == null ? false : true;

  const [textMessage, settextMessage] = useState("");
  const [isOpen, setisOpen] = useState(false);


  const toggle = () => setisOpen(!isOpen);

  //function for text input value change
  const handleChange = (e) => {
    settextMessage(e.target.value);
  };



  //function for send data to onaddMessage function(in userChat/index.js component)
  const onaddMessage = (e, textMessage) => {
    e.preventDefault();
    //if text value is not emptry then call onaddMessage function
    if (textMessage !== "") {
      props.onaddMessage(textMessage);
      settextMessage("");
    }

  };

  return (
    <React.Fragment>
      <div className="p-3 p-lg-4 border-top mb-0  d-block">
        {isUserLoggedIn ? (
          <Form onSubmit={(e) => onaddMessage(e, textMessage)}>
            <Row noGutters>
              <Col>
                <div>
                  <Input
                    type="text"
                    value={textMessage}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-light border-light"
                    placeholder="Enter Message..."
                  />
                </div>
              </Col>
              <Col xs="auto">
                <div className="chat-input-links">
                  <ul className="list-inline mb-0 ms-0 gap-4">
                    <li className="list-inline-item">
                      <Button
                        type="submit"
                        color="primary"
                        className="font-size-16 btn-lg chat-send waves-effect waves-light wdncolor wdnborder"
                      >
                        <i className="ri-send-plane-2-fill"></i>
                      </Button>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Form>
        ) : (
          <div className="text-center d-flex justify-content-between align-items-center">
            <h5 className="text-muted mb-0 ">Please login to send message</h5>
            <div className="d-flex gap-2 justify-content-between align-items-center">
              <a
                href="/login"
                className="btn btn-primary wdncolor wdnborder  d-flex justify-content-center align-items-center"
              >
                <i className="mdi mdi-login me-1"></i> Login
              </a>
              <a
                href="/register"
                className="btn btn-primary wdncolor wdnborder  d-flex justify-content-center align-items-center"
              >
                <i className="ri-add-line me-1"></i> Register
              </a>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => {
  const { user } = state.Auth;
  return {
    user,
  };
};

export default connect(mapStatetoProps, {})(ChatInput);
