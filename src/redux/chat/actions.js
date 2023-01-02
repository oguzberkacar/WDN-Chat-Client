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

export const chatUser = () => ({
  type: CHAT_USER,
});

export const setActiveChat = (chat) => ({
  type: ACTIVE_CHAT,
  payload: chat,
});

export const updateLastMessages = (chatList) => ({
  type: LAST_MESSAGES,
  payload: chatList,
});

export const setOnlineUsers = (users) => ({
  type: ONLINE_USERS,
  payload: users,
});

export const activeUser = (userId) => ({
  type: ACTIVE_USER,
  payload: userId,
});

export const setFullUser = (fullUser) => ({
  type: FULL_USER,
  payload: fullUser,
});

export const addLoggedinUser = (userData) => ({
  type: ADD_LOGGED_USER,
  payload: userData,
});

export const createGroup = (groupData) => ({
  type: CREATE_GROUP,
  payload: groupData,
});

export const setchatList = (chatList) => ({
  type: CHAT_LIST,
  payload: chatList,
});

export const addNewChat = (newchat) => ({
  type: ADD_CHAT_LIST,
  payload: newchat,
});
export const updateChatListMessage = (chat) => ({
  type: UPDATE_CHAT_LIST,
  payload: chat,
});

export const setActiveChatId = (id) => ({
  type: ACTIVE_CHAT_ID,
  payload: id,
});

export const deleteChat = (chat) => ({
  type: DELETE_CHAT,
  payload: chat,
});

export const changeLastMessage = (chat) => ({
  type: CHANGE_LAST_MESAGE,
  payload: chat,
});

export const updateSignleMessage = (message) => ({
  type: UPDATE_SINGLE_MESSAGE,
  payload: message,
});

export const setConnectionData = (data) => ({
  type: CONNECTION_DATA,
  payload: data,
});

export const setOldMessageLoading = () => ({
  type: OLD_MESSAGE_LOADİNG,
});

export const oldMessageSuccess = () => ({
  type: OLD_MESSAGE_LOADİNG_SUCCESS,
});

export const setOldMessageError = (message) => ({
  type: OLD_MESSAGE_LOADİNG_ERROR,
  payload: message
});

export const setNewMessage = (obj) => ({
  type: NEW_MESSAGE,
  payload: obj
})
