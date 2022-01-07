/**
 * There are lots of reducer functions: 
 *      They will return a new state according to old state and specified action
 */
import { combineReducers } from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'

import { getRedirectTo } from '../utils'
const initUser = {
    username: '', // username
    type: '',     // type
    msg: '',      // error info
    redirectTo: '', // need auto redirect router path
}
/**
 * produce user
 */
function user1(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: // data is user
            const { type, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header) };
        case ERROR_MSG:    // data is msg
            return { ...state, msg: action.data };
        case RECEIVE_USER:    // data is user
            return action.data;
        case RESET_USER:    // data is msg
            return { ...initUser, msg: action.data }; // use initUser here to ensure return back to login page
        default:
            return state;
    }
}
/**
 * produce user list
 */
const initUserList = [];
function userList1(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST: // data is userList
            return action.data;
        default:
            return state;
    }
}

/**
 * produce chat status reducer
 */
const initChat = {
    users: {},     // all users, attr name: userId, attr value: {username, header}
    chatMsgs: [],  // current msg arrays
    unReadCount: 0 // totally unread count
}
function chat1(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs, userId } = action.data;
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userId ? 1 : 0), 0)
            }
        case RECEIVE_MSG: // data: chatMsg
            const { chatMsg } = action.data;
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userId ? 1 : 0)
            }
        case MSG_READ:
            const { from, to, count } = action.data;
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        return { ...msg, read: true }; // !!!
                    } else {
                        return msg;
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state;
    }
}

export default combineReducers({
    user1,
    userList1,
    chat1
})
/**
 * to export state's structure: {user1:{}, userList1:[], chat:{}}
 */
