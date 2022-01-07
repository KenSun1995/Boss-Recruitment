/**
 * There are lots of models which include request interfaces
 * (return value: Promise)
 */
import ajax from './ajax'
/**
 * register interface
 */
export const reqRegister = (user) => ajax('/api/register', user, 'POST');
/**
 * login interface
 */
export const reqLogin = ({ username, password }) => ajax('/api/login', { username, password }, 'POST');
/**
 * update user interface
 */
export const reqUpdateUser = (user) => ajax('/api/update', user, 'POST');
/**
 * get user info according to cookie
 */
export const reqUser = () => ajax('/api/user');
/**
 * get userlist
 */
export const reqUserList = (type) => ajax('/api/userlist', { type });
/**
 * get current user chat info list
 */
export const reqChatMsgList = () => ajax('/api/msglist');
/**
 * update read already
 */
export const reqReadMsg = (from) => ajax('/api/readmsg', { from }, 'POST');