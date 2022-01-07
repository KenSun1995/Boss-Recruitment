/**
 * There are lots of models which include request interfaces
 * (return value: Promise)
 */
import ajax from './ajax'
/**
 * register interface
 */
export const reqRegister = (user) => ajax('/register', user, 'POST');
/**
 * login interface
 */
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'POST');
/**
 * update user interface
 */
export const reqUpdateUser = (user) => ajax('/update', user, 'POST');
/**
 * get user info according to cookie
 */
export const reqUser = () => ajax('/user');
/**
 * get userlist
 */
export const reqUserList = (type) => ajax('/userlist', { type });
/**
 * get current user chat info list
 */
export const reqChatMsgList = () => ajax('/msglist');
/**
 * update read already
 */
export const reqReadMsg = (from) => ajax('/readmsg', { from }, 'POST');