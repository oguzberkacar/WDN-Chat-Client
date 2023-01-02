import { useContext } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import {
  setNewMessage,
  setOnlineUsers,
  updateSignleMessage,
} from "../redux/actions";

import { setActiveChatId } from "../redux/actions";

import { ReactReduxContext } from "react-redux";

var socket = io("https://chat.spapp.click", {
  secure: true,
  query: 4,
});

const SocketConnetion = () => {
  var socket = io("https://chat.spapp.click", {
    secure: true,
    query: 4,
  });

  const { store } = useContext(ReactReduxContext);
  let user = store.getState().Auth.user;

  const dispatch = useDispatch();

  let conncetData = {
    user_chat_id: user.chatid,
    uid: null,
    showname: user.username,
    avatar: user.avatarUrl,
    city: user.city,
    country: user.country,
    age: user.age,
    user_id: user.id,
    role_id: user.role_id,
    gender_id: user.genderId,
  };
  socket.on("connect", function () {
    let socketID = socket.id;
    conncetData.uid = socketID;
    socket.emit("connected", conncetData);
  });
  socket.on("user_list", function (data) {
    dispatch(setOnlineUsers(data));
    console.log(data);
  });

  socket.on("new_message", function (data) {
    console.log(data);
    if (data.result.from_id == user.id) {
      let updateDataObj = {
        chat_id: data.result.chat_id,
        message: data.result.message,
        message_id: data.result.id,
      };
      dispatch(updateSignleMessage(updateDataObj));
    } else {
      let chatlist = store.getState().Chat.chatList;
      console.log(chatlist);
      let newMessageChatId = data.result.chat_id;
      let chatHas = false;
      chatlist.map((i, index) => {
        if (i.chat_id == newMessageChatId) {
          console.log(i.chat_id == newMessageChatId);
          console.log(
            "chatlist içindeki chat id ile yeni mesajın chat idsi eşleşti"
          );
          chatHas = true;
          let updateDataObj = {
            chat_id: data.result.chat_id,
            created_at: Date.now(),
            from_id: data.result.from_id,
            message: data.result.message,
            message_id: data.result.id,
            is_channel: "0",
            is_seen: "0",
            to_id: data.result.to_id,
            updated_at: Date.now(),
          };
          dispatch(setNewMessage(updateDataObj));
        }
      });
      if (!chatHas) {
      }
    }
  });

  socket.on("chat_room_new_message", function (x) {
    let data = x.result;

    if (data.away_user.user_id == user.id) {
      let chatlist = store.getState().Chat.chatList;
      let newMessageChatId = data.chat_room_chat_id;
      chatlist.map((i, index) => {
        if (i.chat_id == newMessageChatId) {
          let updateDataObj = {
            chat_id: data.chat_room_chat_id,
            created_at: Date.now(),
            away_user: data.away_user,
            id: data.it,
            message: data.message,
            updated_at: Date.now(),
            chatroom: true,
            chat_room_id: data.chat_room_id,
            is_sendToOthers: 1,
          };
          dispatch(updateSignleMessage(updateDataObj));
        }
      });
    } else {
      let messageObj = {
        chat_id: data.chat_room_chat_id,
        created_at: Date.now(),
        away_user: data.away_user,
        id: data.it,
        message: data.message,
        updated_at: Date.now(),
        chatroom: true,
        chat_room_id: data.chat_room_id,
      };
      let chatlist = store.getState().Chat.chatList;
      let copychatList = [...chatlist];
      let newMessageChatId = data.chat_room_chat_id;
      chatlist.map((i, index) => {
        if (i.chat_id == newMessageChatId) {
          dispatch(setNewMessage(messageObj));
        }
      });
    }
  });
};

const ChangeTheActiveUser = (id) => {
  const { store } = useContext(ReactReduxContext);
  store.dispatch(setActiveChatId(id));
};

const SendMessageToSocket = (data) => {
  let lastmessage = "";
  if (data.message == lastmessage) {
    console.log("aynı mesajı 2 kez gönderemye çalıştıız");
    return;
  } else {
    lastmessage = data.message;
    console.log(data);
    socket.emit("new_message_add", data);
  }
};

const SendChatRoomMessageToSocket = (data) => {
  console.log(data);
  let newData = {
    user_id: "21",
    chat_room_id: "1",
    message: "deneme",
  };
  socket.emit("chat_room_new_message_add", data);
};

export {
  SocketConnetion,
  socket,
  SendMessageToSocket,
  ChangeTheActiveUser,
  SendChatRoomMessageToSocket,
};
