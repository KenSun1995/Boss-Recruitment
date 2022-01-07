/**
 * There are lots of action creator:
 *      synchronized action
 *      asynchronized action
 */
import io from 'socket.io-client'
import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList, reqChatMsgList, reqReadMsg } from '../api'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ } from './action-types'
/**
 * single example obj
 * 1. before creating obj: check obj is created or not, only create it if not
 * 2. after creating obj: save obj
 */
function initIO(dispatch, userId) {
    if (!io.socket) {
        // connect server, get socket obj
        io.socket = io('ws://localhost:4000', { transports: ['websocket'] })
        // bind 'receiveMessage' monitor, to receive msg from server
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('Browser received msg:', chatMsg);
            // only chatMsg is related to current user, to dispatch
            if (userId === chatMsg.from || userId === chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userId));
            }
        })
    }
}
/**
 * async get msg list data
 */
async function getMsgList(dispatch, userId) {
    initIO(dispatch, userId);
    const response = await reqChatMsgList();
    const result = response.data;
    if (result !== 0) {
        const { users, chatMsgs } = result.data;
        // dispatch action
        dispatch(receiveMsgList({ users, chatMsgs, userId }));
    }
}
/**
 * async send msg in chat
 */
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        console.log('send msg:', { from, to, content });
        io.socket.emit('sendMsg', { from, to, content })
    }
}
/**
 * auth success sync action
 */
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
/**
 * msg info sync action
 */
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
/**
 * receive  user sync action
 */
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
/**
 * reset user sync action
 */
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });
/**
 * received user list sync action
 */
const receivedUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList });
/**
 * received msg list sync action
 */
const receiveMsgList = ({ users, chatMsgs, userId }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userId } });
/**
 * received one msg sync action
 */
const receiveMsg = (chatMsg, userId) => ({ type: RECEIVE_MSG, data: { chatMsg, userId } });
/**
 * read msg read
 */
const msgRead = ({ count, from, to }) => ({ type: MSG_READ, data: { count, from, to } });


/**
 * register
 */
export const register = (user) => {
    const { username, password, password2, type } = user;
    // do validation before send request
    if (!username) {
        return errorMsg('you have to enter username');
    }
    if (password !== password2) {
        return errorMsg('two time passwords should be the same');
    }
    if (!password || !password2) {
        return errorMsg('passwords must be entered');
    }
    if (password.length < 6) {
        return errorMsg('the length of password should more than 6');
    }
    var reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!reg.test(password)) {
        return errorMsg('passwords miss at least a symbol, upper and lower case letters and a number');
    }

    // form data is valid
    return async dispatch => {
        // send register asyn request
        const response = await reqRegister({ username, password, type });
        const result = response.data;
        if (result.code === 0) { // success
            getMsgList(dispatch, result.data._id);
            // dispatch success action
            dispatch(authSuccess(result.data));
        } else { // fail
            // dispatch fail action
            dispatch(errorMsg(result.msg));
        }
    }
}

/**
 * login
 */
export const login = (user) => {
    const { username, password } = user;
    // do validation before send request
    if (!username) {
        return errorMsg('you have to enter username');
    }
    if (!password) {
        return errorMsg('password should be the entering');
    }
    return async dispatch => {
        // send login asyn request
        const response = await reqLogin(user);
        const result = response.data;
        if (result.code === 0) { // success
            getMsgList(dispatch, result.data._id);
            // dispatch success action
            dispatch(authSuccess(result.data));
        } else { // fail
            // dispatch fail action
            dispatch(errorMsg(result.msg));
        }
    }
}

/**
 * update
 */
export const update = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data;
        if (result.code === 0) { // success
            dispatch(receiveUser(result.data));
        } else { // fail
            dispatch(resetUser(result.msg));
        }
    }
}

/**
 * get userInfo according to cookie
 */
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id);
            dispatch(receiveUser(result.data));
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}

/**
 * get userList async action
 */
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type);
        const result = response.data;
        if (result.code === 0) {
            dispatch(receivedUserList(result.data));
        }
    }
}

/**
 * read un read msg
 */
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from);
        const result = response.data;
        if (result.code === 0) {
            const count = result.data;
            dispatch(msgRead({ count, from, to }));
        }
    }
}