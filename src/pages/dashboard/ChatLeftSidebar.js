import React from "react";
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";

//Import Components
import Profile from "./Tabs/Profile";
import Chats from "./Tabs/Chats";
import Groups from "./Tabs/Groups";
import Contacts from "./Tabs/Contacts";
import Settings from "./Tabs/Settings";

function ChatLeftSidebar(props) {
  let isUserLoggedIn = props.user == null ? false : true; 
  const activeTab = props.activeTab;

  return (
    <React.Fragment>
      <div className="chat-leftsidebar me-lg-1">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="profile" id="pills-user">
            {/* profile content  */}
            <Profile userInfo={props.user} />
          </TabPane>

          {/* Start chats tab-pane  */}
          <TabPane tabId="chat" id="pills-chat">
            {/* chats content */}
            <Chats listAPI={props.listAPI} recentChatList={props.recentChatList} />
          </TabPane>
          {/* End chats tab-pane */}

          {/* Start groups tab-pane */}
          <TabPane tabId="group" id="pills-groups">
            {/* Groups content */}
            <Groups recentChatList={props.recentChatList}/>
          </TabPane>
          {/* End groups tab-pane */}

          {/* Start contacts tab-pane */}
          <TabPane tabId="contacts" id="pills-contacts">
            {/* Contact content */}
            <Contacts recentChatList={props.recentChatList}/>
          </TabPane>
          {/* End contacts tab-pane */}

          {/* Start settings tab-pane */}
          <TabPane tabId="settings" id="pills-setting">
            {/* Settings content */}
            <Settings />
          </TabPane>

          {/* End settings tab-pane */}
        </TabContent>
        {/* end tab content */}
      </div>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => {
  const { user } = state.Auth;
  return {
    ...state.Layout,
    user,
  };
};

// const mapStatetoProps = (state) => {
//     const { layout } = state.Layout;
//     const { user } = state.Auth;

//     return {
//       layout,
//       user,
//     };
//   };

export default connect(mapStatetoProps, null)(ChatLeftSidebar);
