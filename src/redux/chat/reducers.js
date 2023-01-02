import {
  CHAT_USER,
  ACTIVE_USER,
  FULL_USER,
  ADD_LOGGED_USER,
  CREATE_GROUP,
  ONLINE_USERS,
  LAST_MESSAGES,
  ACTIVE_CHAT,
  CHAT_LIST,
  ADD_CHAT_LIST,
  UPDATE_CHAT_LIST,
  ACTIVE_CHAT_ID,
  DELETE_CHAT,
  CHANGE_LAST_MESAGE,
  UPDATE_SINGLE_MESSAGE,
  CONNECTION_DATA,
  OLD_MESSAGE_LOADİNG,
  OLD_MESSAGE_LOADİNG_SUCCESS,
  OLD_MESSAGE_LOADİNG_ERROR,
  NEW_MESSAGE,
} from "./constants";

//Import Images
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import img6 from "../../assets/images/small/img-6.jpg";
import img4 from "../../assets/images/small/img-4.jpg";
import img7 from "../../assets/images/small/img-7.jpg";
import { NavItem } from "reactstrap";

const INIT_STATE = {
  active_user: 0,
  users: [],

  chatList: [],
  groups: [
    {
      gourpId: 1,
      name: "#General",
      profilePicture: "Null",
      isGroup: true,
      unRead: 0,
      desc: "General Group",
      members: [
        { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        {
          userId: 2,
          name: "Ossie Wilson",
          profilePicture: avatar8,
          role: "admin",
        },
        {
          userId: 3,
          name: "Jonathan Miller",
          profilePicture: "Null",
          role: null,
        },
        { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        {
          userId: 6,
          name: "Steve Walker",
          profilePicture: avatar6,
          role: null,
        },
      ],
    },
    {
      gourpId: 2,
      name: "#Reporting",
      profilePicture: "Null",
      isGroup: true,
      unRead: 23,
      desc: "reporing Group here...",
      members: [
        { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        {
          userId: 2,
          name: "Ossie Wilson",
          profilePicture: avatar8,
          role: "admin",
        },
        {
          userId: 3,
          name: "Jonathan Miller",
          profilePicture: "Null",
          role: null,
        },
        { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        {
          userId: 6,
          name: "Steve Walker",
          profilePicture: avatar6,
          role: null,
        },
      ],
    },
    {
      gourpId: 3,
      name: "#Designer",
      profilePicture: "Null",
      isGroup: true,
      unRead: 0,
      isNew: true,
      desc: "designers Group",
      members: [
        { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        {
          userId: 2,
          name: "Ossie Wilson",
          profilePicture: avatar8,
          role: "admin",
        },
        {
          userId: 3,
          name: "Jonathan Miller",
          profilePicture: "Null",
          role: null,
        },
        { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        {
          userId: 6,
          name: "Steve Walker",
          profilePicture: avatar6,
          role: null,
        },
      ],
    },
    {
      gourpId: 4,
      name: "#Developers",
      profilePicture: "Null",
      isGroup: true,
      unRead: 0,
      desc: "developers Group",
      members: [
        { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        {
          userId: 2,
          name: "Ossie Wilson",
          profilePicture: avatar8,
          role: "admin",
        },
        {
          userId: 3,
          name: "Jonathan Miller",
          profilePicture: "Null",
          role: null,
        },
        { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        {
          userId: 6,
          name: "Steve Walker",
          profilePicture: avatar6,
          role: null,
        },
      ],
    },
    {
      gourpId: 5,
      name: "#Project-aplha",
      profilePicture: "Null",
      isGroup: true,
      unRead: 0,
      isNew: true,
      desc: "project related Group",
      members: [
        { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        {
          userId: 2,
          name: "Ossie Wilson",
          profilePicture: avatar8,
          role: "admin",
        },
        {
          userId: 3,
          name: "Jonathan Miller",
          profilePicture: "Null",
          role: null,
        },
        { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        {
          userId: 6,
          name: "Steve Walker",
          profilePicture: avatar6,
          role: null,
        },
      ],
    },
  ],
  contacts: [
    { id: 1, name: "Albert Rodarte" },
    { id: 2, name: "Allison Etter" },
    { id: 3, name: "Craig Smiley" },
    { id: 4, name: "Daniel Clay" },
    { id: 5, name: "Doris Brown" },
    { id: 6, name: "Iris Wells" },
    { id: 7, name: "Juan Flakes" },
    { id: 8, name: "John Hall" },
    { id: 9, name: "Joy Southern" },
    { id: 10, name: "Mary Farmer" },
    { id: 11, name: "Mark Messer" },
    { id: 12, name: "Michael Hinton" },
    { id: 13, name: "Ossie Wilson" },
    { id: 14, name: "Phillis Griffin" },
    { id: 15, name: "Paul Haynes" },
    { id: 16, name: "Rocky Jackson" },
    { id: 17, name: "Sara Muller" },
    { id: 18, name: "Simon Velez" },
    { id: 19, name: "Steve Walker" },
    { id: 20, name: "Hanah Mile" },
    { id: 38, name: "3001" },
  ],
  online_user_list: [],
  lasmessages: [],
  activeChat: null,
  activeChatId: null,
  connectionData: null,
  oldMessageLoading: false,
  oldMessageError: null,
};

const Chat = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHAT_USER:
      return { ...state };

    case ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload,
      };

    case ACTIVE_USER:
      return {
        ...state,
        active_user: action.payload,
      };

    case FULL_USER:
      return {
        ...state,
        users: action.payload,
      };

    case ADD_LOGGED_USER:
      const newUser = action.payload;
      // check is user alredy in list
      const isUserExist = state.users.find(
        (user) => user.chat_id === newUser.chat_id
      );
      if (isUserExist) {
        return { ...state };
      } else {
        return {
          ...state,
          users: [...state.users, newUser],
        };
      }
    case ONLINE_USERS:
      return {
        ...state,
        online_user_list: action.payload,
      };

    case CREATE_GROUP:
      const newGroup = action.payload;
      return {
        ...state,
        groups: [...state.groups, newGroup],
      };
    case LAST_MESSAGES:
      return {
        ...state,
        lasmessages: action.payload,
      };
    case CHAT_LIST:
      return {
        ...state,
        chatList: action.payload,
      };
    case ADD_CHAT_LIST:
      const newChat = action.payload;
      return {
        ...state,
        chatList: [...state.chatList, newChat],
      };

    case UPDATE_CHAT_LIST:
      const updateChat = action.payload;
      let copyCopy = state.chatList;
      let chatListcopy = [...copyCopy];
      chatListcopy.map((chat, index) => {
        if (updateChat.chat_id == chat.chat_id) {
          if (chat.messages == undefined && chat.chatroom == undefined) {
            chat.messages = [];
            chat.messages.push(updateChat.message);
            // } else if (
            //   chat.messages.current_page !== undefined &&
            //   chat.messages.current_page == updateChat.messages.current_page
            // ) {
            //   console.log("3");

            //   return { ...state };
          } else if (chat.messages == undefined && chat.chatroom) {
            let newMessage = [updateChat.message];

            let copy = chatListcopy[index].data;

            chatListcopy[index].data = copy.concat(newMessage);
            // newMessage.concat(chatListcopy[index].data)
            // console.log(newMessage);
            // chat.data = newMessage
            // console.log(chat.data);
          } else {
            chatListcopy[index].messages.data.push(updateChat.message);
          }
        }
        console.log(chatListcopy);
      });
      return { ...state, chatList: chatListcopy };

    case ACTIVE_CHAT_ID:
      return {
        ...state,
        activeChatId: action.payload,
      };
    case DELETE_CHAT:
      const deleteChat = action.payload;
      let chatListcopy2 = [...state.chatList];
      chatListcopy2.map((chat) => {
        if (deleteChat == chat.chat_id) {
          chatListcopy2.splice(chatListcopy2.indexOf(chat), 1);
        }
      });
      return { ...state, chatList: chatListcopy2 };
    case CHANGE_LAST_MESAGE:
      const changeLastMessage = action.payload;
      let chatListcopy3 = [...state.chatList];
      chatListcopy3.map((chat) => {
        if (changeLastMessage.chat_id == chat.chat_id) {
          chat.last_message = changeLastMessage.message;
        }
      });
      return { ...state, chatList: chatListcopy3 };

    case UPDATE_SINGLE_MESSAGE:
      const updateSingleMessage = action.payload;
      let chatListcopy4 = [...state.chatList];
      let chat_id = updateSingleMessage.chat_id;
      let message = updateSingleMessage.message;
      let id = updateSingleMessage.message_id;

      chatListcopy4.map((chat) => {
        if (
          chat_id == chat.chat_id &&
          updateSingleMessage.chatroom == undefined
        ) {
          chat.last_message.id = id;
          chat.last_message.message = message;
          chat.last_message.is_sendToOthers = 1;
          chat.messages.data.map((i, index) => {
            if (i.id == "temp" && i.message == message) {
              chat.messages.data[index].is_sendToOthers = 1;
              chat.messages.data[index].id = id;
            }
          });
        } else if (chat_id == chat.chat_id && updateSingleMessage.chatroom) {
          chat.data.map((i, index) => {
            if (i.id == "temp" && i.message == message) {
              chat.data[index].is_sendToOthers = 1;
              chat.data[index].id = id;
            }
          });
        }
      });
      let newUpdatedList = [...chatListcopy4];
      return { ...state, chatList: newUpdatedList };
    case CONNECTION_DATA:
      return {
        ...state,
        connectionData: action.payload,
      };
    case OLD_MESSAGE_LOADİNG:
      return {
        ...state,
        oldMessageLoading: true,
      };
    case OLD_MESSAGE_LOADİNG_SUCCESS:
      return {
        ...state,
        oldMessageLoading: false,
      };
    case OLD_MESSAGE_LOADİNG_ERROR:
      return {
        ...state,
        oldMessageLoading: false,
        oldMessageError: action.payload,
      };

    case NEW_MESSAGE:
      const newMessage = action.payload;
      console.log(newMessage);
      let chatListcopy5 = [...state.chatList];
      console.log(state.chatList);
      chatListcopy5.map((chat, index) => {
        if (
          newMessage.chat_id == chat.chat_id &&
          newMessage.chatroom == undefined
        ) {
          console.log(chatListcopy5[index].messages.data);
          chatListcopy5[index].messages.data.push(newMessage);
          chatListcopy5[index].last_message = newMessage;
        } else if (newMessage.chat_id == chat.chat_id && newMessage.chatroom) {
          let newMessageArray = [newMessage];

          let copy = chatListcopy5[index].data;

          chatListcopy5[index].data = copy.concat(newMessageArray);
        }
      });
      console.log(chatListcopy5);
      return { ...state, chatList: chatListcopy5 };

    default:
      return { ...state };
  }
};

export default Chat;
